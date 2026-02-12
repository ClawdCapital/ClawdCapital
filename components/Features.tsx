import React from 'react';
import { Zap, Puzzle, Lock, BarChart2, Globe, Server } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: 'Plug & Play Architecture',
    description: 'Designed specifically for ClawdBot. Drop in your strategies and let the core engine handle execution, risk management, and exchange connectivity.',
    icon: Puzzle,
  },
  {
    title: 'Ultra-Low Latency',
    description: 'Built with Rust and TypeScript bindings to ensure execution speeds competitive with HFT firms. Every microsecond counts.',
    icon: Zap,
  },
  {
    title: 'Bank-Grade Security',
    description: 'Self-custodial design. Your API keys and funds never leave your local environment or your private cloud instance.',
    icon: Lock,
  },
  {
    title: 'Advanced Analytics',
    description: 'Real-time PnL tracking, Sharpe ratio calculation, and drawdown monitoring built directly into the dashboard.',
    icon: BarChart2,
  },
  {
    title: 'Multi-Exchange Support',
    description: 'Connect to Binance, Coinbase, Kraken, and decentralized exchanges (DEXs) simultaneously through a unified API.',
    icon: Globe,
  },
  {
    title: 'Self-Hosted Control',
    description: 'No SaaS fees. No black boxes. You own the code. You own the infrastructure. Docker-ready for instant deployment.',
    icon: Server,
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-clawd-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-blue-400 tracking-wide uppercase">System Capabilities</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Engineered for Alpha
          </p>
          <p className="mt-4 max-w-2xl text-xl text-clawd-muted mx-auto">
            Clawd Capital provides the robust foundation you need to build, test, and run sophisticated trading strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative p-8 bg-clawd-card border border-clawd-border rounded-2xl hover:border-gray-600 transition-colors duration-300 group"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              
              <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-base text-clawd-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
