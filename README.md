<p align="center">
  <h1 align="center">Clawd Capital</h1>
  <p align="center"><strong>Autonomous AI Trading System for Hyperliquid Perpetuals</strong></p>
  <p align="center">
    <a href="#architecture">Architecture</a> •
    <a href="#agents">Agents</a> •
    <a href="#setup">Setup</a> •
    <a href="#configuration">Configuration</a> •
    <a href="#running">Running</a>
  </p>
</p>

---

Clawd Capital is an autonomous trading system built on **LangGraph** that operates multiple AI agents in parallel — each responsible for a different trading domain. The system trades **Hyperliquid perpetuals**, monitors **prediction markets** (Polymarket), scans **pump.fun token launches**, manages a **multi-chain safekeeping fund**, and runs a **24/7 news intelligence pipeline** — all coordinated through a shared message bus.

## Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         Clawd Capital                                │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   Trading    │  │    News     │  │ Prediction  │  │ Safekeeping│ │
│  │   Agent      │  │   Agent     │  │  Markets    │  │    Fund    │ │
│  │  (perps)     │  │  (24/7)     │  │  Agent      │  │  Agent     │ │
│  └──────┬───────┘  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘ │
│         │                 │                │               │        │
│  ┌──────┴─────────────────┴────────────────┴───────────────┴──────┐ │
│  │                    Shared Infrastructure                       │ │
│  │  Redis Message Bus · Circuit Breakers · Rate Limiters          │ │
│  │  Unified Cache · Reconciliation · Snapshot Service             │ │
│  └──────┬─────────────────┬────────────────┬───────────────┬──────┘ │
│         │                 │                │               │        │
│  ┌──────┴──────┐  ┌───────┴──────┐  ┌─────┴─────┐  ┌─────┴──────┐ │
│  │ Hyperliquid │  │  OpenRouter  │  │   Z.AI    │  │  SQLite    │ │
│  │    API      │  │   (LLMs)    │  │  (GLM)    │  │  Database  │ │
│  └─────────────┘  └──────────────┘  └───────────┘  └────────────┘ │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────────┐  │
│  │  Pumpfun    │  │  Telegram   │  │      Express Dashboard     │  │
│  │  Agent      │  │  Bot        │  │      (port 3001)           │  │
│  └─────────────┘  └─────────────┘  └────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

Every agent is a **LangGraph orchestrator** — a stateful graph of nodes that executes sequentially with circuit breaker protection. If a node fails, the orchestrator provides fallback results instead of crashing the entire cycle.

---

## Agents

### 1. Trading Agent (Perps)

The core perpetuals trading engine. Runs on a 60-second cycle, dynamically loading the **top 50 symbols by volume** + extreme funding rate pairs from Hyperliquid.

```
┌─────────────┐     ┌───────────────────┐     ┌──────────────┐
│ Market Data │────▶│ Strategy Ideation │────▶│  Backtester  │
└─────────────┘     └───────────────────┘     └──────┬───────┘
                                                      │
┌─────────────┐     ┌───────────────────┐     ┌──────▼───────┐
│   Learner   │◀────│     Executor      │◀────│Strategy Sel. │
└──────┬──────┘     └───────────────────┘     └──────┬───────┘
       │                     ▲                       │
       │            ┌────────┴──────┐         ┌──────▼───────┐
       └───────────▶│ Pattern Recall│         │  Risk Gate   │
                    └───────────────┘         └──────────────┘
```

| Node | Purpose |
|---|---|
| **Market Data** | Fetches OHLCV candles, order book, funding rates via Hyperliquid SDK |
| **Strategy Ideation** | AI generates trading strategies based on market regime (trending/ranging/volatile) |
| **Backtester** | Simulates strategies against recent candle data |
| **Strategy Selector** | Picks the highest Sharpe ratio strategy |
| **Risk Gate** | Enforces position limits, max leverage (configurable up to 180x), daily loss caps |
| **Executor** | Submits orders via the Hyperliquid client (supports paper trading mode) |
| **Learner** | Records trade outcomes to trace store for strategy improvement |
| **Pattern Recall** | Retrieves similar historical patterns for conviction bias |

**Key files:** `src/langgraph/` (graph + nodes), `src/execution-engine/` (Hyperliquid client, position recovery)

---

### 2. News Agent

A 24/7 autonomous news pipeline that scrapes, deduplicates, clusters, and classifies financial news into trading-relevant categories.

```
Topic Gen. ──▶ Search ──▶ Scrape ──▶ Quality Filter ──▶ Categorize
                                           │
                                    Redundancy Filter
                                           │
                               Story Clustering ──▶ Market Link ──▶ Store
```

| Node | Purpose |
|---|---|
| **Topic Generation** | AI generates search queries per trading category (crypto, macro, geopolitical) |
| **Search** | Queries SearXNG or web APIs for news URLs |
| **Scrape** | Extracts article content from URLs |
| **Quality Filter** | AI scores article relevance (0-1), rejects low quality |
| **Categorize** | Tags articles with market categories |
| **Redundancy Filter** | Semantic deduplication using TF-IDF similarity |
| **Story Clustering** | Groups related articles into narrative clusters using entity extraction |
| **Market Link** | Connects stories to specific trading instruments |
| **Store** | Persists to SQLite with full metadata |

**Enhanced features:** Anomaly detection, heat prediction, entity extraction with semantic similarity scoring, human-readable title generation.

**Key files:** `src/news-agent/` (graph, 11 nodes), `src/shared/` (clustering, embeddings, title formatting)

---

### 3. Prediction Markets Agent

Trades **Polymarket** prediction markets using AI-generated theories, backtesting, and automated risk management.

```
Market Data ──▶ News Context ──▶ Theorizer ──▶ Backtester
                                                    │
                               Learner ◀── Executor ◀── Idea Selector ◀── Risk Gate
```

| Node | Purpose |
|---|---|
| **Market Data** | Fetches active Polymarket markets via the CLOB API |
| **News Context** | Cross-references markets with recent news from the News Agent |
| **Theorizer** | AI generates directional theories (YES/NO) for each market |
| **Backtester** | Tests theories against historical resolution data |
| **Idea Selector** | Ranks and selects the highest-conviction idea |
| **Risk Gate** | Position sizing, portfolio concentration limits, emergency stop |
| **Executor** | Places trades via Polymarket client (paper or live) |
| **Learner** | Records outcomes for strategy improvement |

**Background tasks:** Stop-loss monitoring (30s), position reconciliation (5min), alerting service.

**Key files:** `src/prediction-markets/` (graph, 9 nodes, execution engine, risk manager, alerting)

---

### 4. Safekeeping Fund Agent

A **multi-chain DeFi yield optimizer** that manages a portfolio across Ethereum, Arbitrum, and Solana. Autonomous rebalancing with AI-driven analysis.

```
Wallet Scan ──▶ APR Calculator ──▶ AI Analysis ──▶ Rebalance Planner
                                                          │
                                       Learning ◀── Execute ◀── Safety Gate
```

| Node | Purpose |
|---|---|
| **Wallet Scan** | Reads balances across all configured chains |
| **APR Calculator** | Fetches current yields from DeFi protocols |
| **AI Analysis** | LLM evaluates optimal allocation given risk/yield tradeoffs |
| **Rebalance Planner** | Generates swap/bridge/stake transactions |
| **Safety Gate** | Validates slippage, gas costs, minimum thresholds before execution |
| **Execute** | Submits transactions via chain-specific DEX clients |
| **Learning** | Records rebalancing outcomes for optimization |

**Supported DEXs:** Uniswap V3, PancakeSwap V3, Meteora (Solana)

**Key files:** `src/safekeeping-fund/` (graph, 8 nodes, DEX clients, wallet manager)

---

### 5. Pumpfun Agent

Monitors **pump.fun** on Solana for new token launches. Scores them on website quality, social presence, contract security, and AI sentiment — then auto-trades qualifying tokens.

```
Subscribe ──▶ Fetch Metadata ──▶ Scrape ──▶ Analyze ──▶ Security
                                                            │
                                           Store ◀── Score ◀─┘
```

**Key files:** `src/pumpfun-agent/` (graph, 9 nodes, social analyzer, web scraper)

---

### 6. Conversational Agent + Telegram Bot

A natural language interface to the entire system. Supports portfolio queries, trade execution, market analysis, and system status via **Telegram** or direct chat.

**Features:**
- Guardrails for trade validation
- Persistent memory across conversations
- Tool use: market data, position management, risk queries

**Key files:** `src/agent/` (conversational agent, memory, guardrails, tools, telegram bot)

---

## Infrastructure Layer

The system includes battle-tested infrastructure for reliability:

| Component | File | Purpose |
|---|---|---|
| **Circuit Breaker** | `shared/circuit-breaker.ts` | Stops cascading failures across services |
| **Token Bucket** | `infrastructure/token-bucket.ts` | Rate limiting for API calls |
| **Unified Cache** | `infrastructure/unified-cache.ts` | Cross-agent caching layer |
| **Reconciliation** | `infrastructure/reconciliation-service.ts` | Position state verification |
| **Snapshot Service** | `infrastructure/snapshot-service.ts` | System state snapshots for recovery |
| **Overfill Protection** | `infrastructure/overfill-protection.ts` | Prevents duplicate order execution |
| **Message Bus** | `shared/message-bus.ts` | Redis pub/sub for inter-agent communication |
| **Position Recovery** | `execution-engine/position-recovery.ts` | Automatic position recovery on crash |

---

## Setup

### Prerequisites

- **Node.js** ≥ 18
- **Redis** (for message bus and caching)
- A **Hyperliquid** account with API credentials
- At least one AI provider: **OpenRouter** or **Z.AI (GLM)**

### Installation

```bash
# Clone
git clone https://github.com/ClaWdCapital/clawd-capital.git && cd clawd-capital

# Install dependencies
npm install

# Build TypeScript
npm run build

# Or do both:
npm run setup
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

```env
# ===== REQUIRED =====
HYPERLIQUID_PRIVATE_KEY=your_private_key_here
HYPERLIQUID_MAIN_ADDRESS=your_wallet_address_here

# ===== AI PROVIDERS (at least one) =====
OPENROUTER_API_KEY=your_openrouter_api_key_here
ZAI_API_KEY=your_zai_api_key_here

# ===== OPTIONAL =====
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
REDIS_URL=redis://localhost:6379
NODE_ENV=development
LOG_LEVEL=info
DASHBOARD_PORT=3001
```

---

## Configuration

The system loads configuration from two sources (env vars take priority):

1. **`.env`** — secrets and environment-specific settings
2. **`config/config.json`** — application defaults

### `config/config.json` Reference

```jsonc
{
  "app": {
    "name": "Clawd Capital",
    "version": "2.0.0",
    "environment": "production",    // "development" | "production"
    "logLevel": "info"              // "debug" | "info" | "warn" | "error"
  },
  "hyperliquid": {
    "testnet": true,                // START WITH TRUE — switch to false for mainnet
    "baseUrl": "https://api.hyperliquid.xyz"
  },
  "risk": {
    "maxPositionSize": 10.0,        // max position size (% of portfolio)
    "maxDailyLoss": 0.3,            // max daily loss before halt (30%)
    "maxLeverage": 180,             // max leverage allowed
    "emergencyStop": false          // set true to halt all trading immediately
  },
  "trading": {
    "symbols": ["BTC", "ETH", "SOL"],           // default symbols (overridden dynamically)
    "timeframes": ["1s", "1m", "5m", "15m", "1h"],
    "strategies": ["market_making", "trend_following", "mean_reversion", "arbitrage", "prediction"]
  },
  "database": {
    "type": "sqlite",
    "connection": "./data/trading.db"
  },
  "glm": {
    "enabled": true,
    "model": "glm-4.7"             // Z.AI model version
  }
}
```

### Additional Environment Variables

These are read directly by `src/shared/config.ts` and can be set in `.env`:

| Variable | Default | Description |
|---|---|---|
| `HYPERLIQUID_TESTNET` | `false` | Use Hyperliquid testnet |
| `HYPERLIQUID_BASE_URL` | `https://api.hyperliquid.xyz` | Hyperliquid API endpoint |
| `SEARCH_API_URL` | `http://localhost:8000/api/v1` | SearXNG search instance |
| `ZAI_MODEL` | `glm-4.6` | Z.AI model to use |
| `OPENROUTER_LABELING_MODEL` | `openai/gpt-oss-20b` | Model for news labeling |
| `OPENROUTER_EMBEDDING_MODEL` | `qwen/qwen3-embedding-8b` | Model for embeddings |
| `MAX_POSITION_SIZE` | `0.1` | Max position as fraction of portfolio |
| `MAX_DAILY_LOSS` | `0.05` | Daily loss limit as fraction |
| `MAX_LEVERAGE` | `40` | Maximum leverage |
| `EMERGENCY_STOP` | `false` | Halt all trading |
| `TRADING_SYMBOLS` | `BTC,ETH,SOL,...` | Comma-separated trading symbols |
| `TRADING_TIMEFRAMES` | `1s,1m,5m,15m,1h` | Comma-separated timeframes |
| `SOLANA_RPC_URL` | `https://api.mainnet-beta.solana.com` | Solana RPC for pumpfun/safekeeping |
| `PUMPFUN_MIN_SCORE_THRESHOLD` | `0.5` | Minimum score to trade a pumpfun token |
| `NEWS_CYCLE_INTERVAL_MS` | `60000` | News agent cycle interval |
| `DATABASE_URL` | `./data/trading.db` | SQLite database path |

---

## Running

### Start Trading Agent (main)

```bash
npm start
```

This starts the **trading agent**, **dashboard**, **market ingester**, **circuit breakers**, and **position recovery** — all from a single process. The agent automatically:

1. Loads the top 50 symbols by volume from Hyperliquid
2. Finds symbols with extreme funding rates
3. Runs 60-second trading cycles across all symbols
4. Monitors system health hourly
5. Runs daily trace analysis at 2 AM

### Start Individual Agents

```bash
# News Agent (24/7 news pipeline)
npm run start:news-agent

# Prediction Markets Agent (Polymarket)
npm run start:predictions

# Pumpfun Agent (Solana token launches)
npm run start:pumpfun

# Dashboard only
npm run start:dashboard
```

### Development Mode

```bash
npm run dev    # Auto-restart on file changes
```

---

## Project Structure

```
clawd-capital/
├── src/
│   ├── main.ts                    # Entry point — trading agent
│   ├── news-agent.ts              # Entry point — news agent
│   ├── prediction-agent.ts        # Entry point — prediction markets
│   ├── langgraph/                 # Trading agent LangGraph orchestrator
│   │   ├── graph.ts               #   Orchestrator with circuit breakers
│   │   ├── state.ts               #   Agent state definition
│   │   └── nodes/                 #   9 pipeline nodes
│   ├── news-agent/                # News intelligence pipeline
│   │   ├── graph.ts               #   News orchestrator
│   │   └── nodes/                 #   11 pipeline nodes
│   ├── prediction-markets/        # Polymarket trading agent
│   │   ├── graph.ts               #   Prediction orchestrator
│   │   ├── nodes/                 #   9 pipeline nodes
│   │   ├── execution-engine.ts    #   Trade execution
│   │   ├── risk-manager.ts        #   Portfolio risk management
│   │   └── alerting-service.ts    #   Trade alerts
│   ├── safekeeping-fund/          # Multi-chain DeFi yield optimizer
│   │   ├── graph.ts               #   Rebalancing orchestrator
│   │   ├── nodes/                 #   8 pipeline nodes
│   │   └── dex/                   #   Uniswap V3, PancakeSwap, Meteora
│   ├── pumpfun-agent/             # Pump.fun token scanner
│   │   ├── graph.ts               #   Pumpfun orchestrator
│   │   ├── nodes/                 #   9 pipeline nodes
│   │   └── services/              #   Social analyzer, web scraper
│   ├── agent/                     # Conversational AI + Telegram
│   │   ├── conversational-agent.ts
│   │   ├── telegram-bot.ts
│   │   ├── memory.ts
│   │   └── guardrails.ts
│   ├── execution-engine/          # Hyperliquid order execution
│   │   ├── hyperliquid-client.ts  #   SDK wrapper
│   │   ├── paper-portfolio.ts     #   Paper trading mode
│   │   └── position-recovery.ts   #   Crash recovery
│   ├── infrastructure/            # Reliability layer
│   │   ├── token-bucket.ts        #   Rate limiting
│   │   ├── unified-cache.ts       #   Cross-agent cache
│   │   ├── reconciliation-service.ts
│   │   ├── snapshot-service.ts
│   │   └── overfill-protection.ts
│   ├── shared/                    # Shared services
│   │   ├── config.ts              #   Configuration loader
│   │   ├── openrouter-service.ts  #   OpenRouter AI client
│   │   ├── glm-service.ts         #   Z.AI/GLM client
│   │   ├── message-bus.ts         #   Redis pub/sub
│   │   ├── circuit-breaker.ts     #   Circuit breaker pattern
│   │   ├── dynamic-symbols.ts     #   Live symbol discovery
│   │   ├── redis-cache.ts         #   Redis caching
│   │   └── logger.ts              #   Winston logger
│   ├── strategy-engine/           # Strategy backtesting + analysis
│   ├── risk-manager/              # Global risk management
│   ├── market-ingester/           # Real-time market data feed
│   ├── ta-module/                 # Technical analysis (RSI, MACD, etc.)
│   └── dashboard/                 # Express dashboard server
├── dashboard/public/              # Dashboard frontend (HTML/JS)
├── config/
│   ├── config.json                # Application config (gitignored)
│   └── hyperliquid.keys           # Key file (gitignored)
├── .env.example                   # Environment variable template
├── package.json
└── tsconfig.json
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Orchestration** | LangGraph (LangChain) |
| **AI / LLMs** | OpenRouter (GPT, Qwen, etc.), Z.AI GLM-4 |
| **Perps Trading** | Hyperliquid SDK (`@nktkas/hyperliquid`) |
| **Prediction Markets** | Polymarket CLOB API |
| **DeFi** | Uniswap V3, PancakeSwap V3, Meteora |
| **Blockchain** | Solana Web3.js, Viem (EVM) |
| **Database** | SQLite (better-sqlite3) |
| **Message Bus** | Redis (ioredis) |
| **Job Queue** | BullMQ |
| **Technical Analysis** | technicalindicators |
| **Dashboard** | Express + Socket.IO |
| **Notifications** | Telegram Bot API |
| **Logging** | Winston |

---

## License

MIT — Clawd Capital
