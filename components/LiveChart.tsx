import React from 'react';

const InterfaceGallery: React.FC = () => {
  return (
    <section id="performance" className="py-24 bg-[#050505] border-t border-b border-clawd-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase">System Observability</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Complete Market Vision
          </p>
          <p className="mt-4 text-xl text-clawd-muted max-w-2xl mx-auto">
            From granular execution traces to global sentiment heatmaps, visualize every dimension of your alpha in real-time.
          </p>
        </div>

        <div className="space-y-32">
          {/* Feature 1: Trace View */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div className="order-2 xl:order-1 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-xl border border-clawd-border bg-clawd-card p-2 shadow-2xl">
                <img src="/traces.png" alt="Reasoning Chain Trace Viewer" className="rounded-lg w-full shadow-lg" />
              </div>
            </div>
            <div className="order-1 xl:order-2">
              <h3 className="text-2xl font-bold text-white mb-4">Reasoning Chain & Trace View</h3>
              <p className="text-clawd-muted text-lg mb-6">
                Debug your strategies with surgical precision. The Trace Viewer exposes the internal state of every agent, showing you exactly why a trade was taken—or why it wasn't.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>Live pattern recognition logs</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>Step-by-step logic execution path</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>Latency stamping for every hop</li>
              </ul>
            </div>
          </div>

          {/* Feature 2: Intelligence Node */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <h3 className="text-2xl font-bold text-white mb-4">Global Intelligence Node</h3>
              <p className="text-clawd-muted text-lg mb-6">
                Ingest real-time news and social signals. Our NLP pipeline scores sentiment across crypto, stocks, and geopolitics to give your strategies a macro edge before the charts move.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>Real-time entity extraction</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>Sentiment polarity scoring</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>Multi-source aggregation</li>
              </ul>
            </div>
            <div className="order-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-xl border border-clawd-border bg-clawd-card p-2 shadow-2xl">
                <img src="/news.png" alt="Global Intelligence Node News Feed" className="rounded-lg w-full shadow-lg" />
              </div>
            </div>
          </div>

          {/* Feature 3: Heatmap */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
            <div className="order-2 xl:order-1 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative rounded-xl border border-clawd-border bg-clawd-card p-2 shadow-2xl">
                <img src="/heatmap.png" alt="Market Heatmap" className="rounded-lg w-full shadow-lg" />
              </div>
            </div>
            <div className="order-1 xl:order-2">
              <h3 className="text-2xl font-bold text-white mb-4">Real-Time Sector Heatmaps</h3>
              <p className="text-clawd-muted text-lg mb-6">
                Spot outliers instantly. Our enhanced heatmap visualization clusters assets by sector and performance, allowing you to identify rotation and momentum at a glance.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>Customizable timeframes (1H, 4H, 24H)</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>Volume-weighted sizing</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>Cross-asset correlation view</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterfaceGallery;