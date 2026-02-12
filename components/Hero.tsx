import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-[0.15]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-clawd-border bg-clawd-card/50 backdrop-blur-sm text-xs text-clawd-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-clawd-success mr-2 animate-pulse"></span>
            v2.4.0 Now Available for ClawdBot
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            The Operating System for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Modern Algorithmic Trading
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-clawd-muted mb-10">
            Open-source. Institutional grade. Built to plug directly into ClawdBot.
            Deploy advanced strategies in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="#" className="flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-black bg-white hover:bg-gray-200 transition-colors md:py-4 md:text-lg md:px-10 uppercase tracking-wide">
              buy $CCAI
              <ArrowRight className="ml-2 -mr-1" size={20} />
            </a>
            <a href="#footer" className="flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-clawd-card border border-clawd-border hover:bg-zinc-800 transition-colors md:py-4 md:text-lg md:px-10 uppercase tracking-wide">
              install now
            </a>
          </div>
        </motion.div>

        {/* Dashboard Screenshot Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-xl bg-[#050505] border border-clawd-border p-2 shadow-2xl shadow-blue-900/20">
            {/* 
              NOTE: Please ensure 'dashboard_main.png' is placed in your public folder.
              This corresponds to the main dashboard screenshot provided.
            */}
            <img
              src="/dashboard.png"
              alt="Clawd Capital Dashboard Interface"
              className="rounded-lg w-full h-auto border border-zinc-900"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-20 pointer-events-none"></div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;