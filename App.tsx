import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InterfaceGallery from './components/LiveChart';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-clawd-bg text-white selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <InterfaceGallery />
        <section id="integration" className="py-20 bg-zinc-900 border-t border-b border-clawd-border">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Seamless Integration with ClawdBot</h2>
            <p className="text-clawd-muted mb-12">
              Clawd Capital isn't just a dashboard; it's the brain. Connect your instances to enable advanced trading skills and autonomous decision-making.
            </p>

            <div className="space-y-6 text-left">
              <div className="p-8 bg-black rounded-2xl border border-zinc-800 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
                  </div>
                  <h3 className="text-xl font-semibold">Install Advanced Skills</h3>
                </div>

                <p className="text-clawd-muted mb-6 leading-relaxed">
                  Paste the following URL into your ClawdBot configuration interface to instantly sync premium trading strategies, market analysis modules, and risk management parameters.
                </p>

                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-700/50 rounded-xl font-mono text-emerald-400 overflow-hidden">
                    <span className="truncate flex-1">https://clawd.capital/skills.md</span>
                    <button
                      onClick={() => navigator.clipboard.writeText('https://clawd.capital/skills.md')}
                      className="shrink-0 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all text-clawd-muted hover:text-white flex items-center gap-2 text-xs font-sans border border-zinc-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1-0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                      Copy Link
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
                  <a
                    href="/skills.md"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-all font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    View System Docs
                  </a>

                  <div className="flex items-center gap-4 py-3 px-6 bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex-1 w-full sm:w-auto">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-emerald-400/80">
                      Join <span className="text-emerald-400 font-bold">1,200+</span> traders using Clawd Capital skills
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;