import React from 'react';
import { Terminal, Github, Twitter, Disc } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-black border-t border-clawd-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white text-black p-1 rounded-md">
                <Terminal size={16} strokeWidth={3} />
              </div>
              <span className="text-lg font-bold text-white uppercase tracking-tighter text-[15px]">Clawd Capital</span>
            </div>
            <p className="text-clawd-muted text-xs text-center md:text-left max-w-[240px] leading-relaxed opacity-60">
              Open source trading infrastructure for the next generation of quants.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[13px] font-medium tracking-wide">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-200">Terminal</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-200">Docs</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-200">GitHub</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-200">Discord</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors duration-200">License</a>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-zinc-600 hover:text-white transition-all transform hover:scale-110 duration-200">
              <Github size={18} />
            </a>
            <a href="#" className="text-zinc-600 hover:text-white transition-all transform hover:scale-110 duration-200">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-zinc-600 hover:text-white transition-all transform hover:scale-110 duration-200">
              <Disc size={18} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[11px] uppercase tracking-widest font-medium opacity-50">
            &copy; {new Date().getFullYear()} Clawd Capital. Built by quants for quants.
          </p>
          <div className="flex items-center space-x-2 text-zinc-700">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-40">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
