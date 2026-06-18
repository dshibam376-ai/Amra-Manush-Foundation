import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-12 w-12", showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-full h-full select-none rounded-full bg-white dark:bg-[#1A2332] shadow-md border border-slate-200 dark:border-slate-800 flex items-center justify-center p-0.5 group shrink-0">
        <img
          src="/logo_official.jpg"
          alt="Amra Manush Foundation Logo"
          className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle decorative golden border glow */}
        <div className="absolute inset-0 rounded-full border border-blue-600/20 dark:border-cyan-400/30 group-hover:border-blue-600/20 dark:border-cyan-400/30 transition-colors pointer-events-none" />
      </div>
      
      {showText && (
        <div className="whitespace-nowrap text-left">
          <span className="font-display font-black text-lg md:text-xl text-[#0F172A] dark:text-white tracking-wider flex items-center leading-none">
            AMRA MANUSH <span className="text-orange-600 dark:text-orange-400 text-[9px] font-mono border border-blue-600/20 dark:border-cyan-400/30 px-1.5 py-0.5 ml-2 bg-blue-600/5 dark:bg-cyan-400/10 uppercase tracking-widest rounded-sm">FOUNDATION</span>
          </span>
          <p className="text-[9px] text-[#C5A059] font-mono tracking-widest uppercase mt-1 leading-none">
            A responsibility to change lives
          </p>
        </div>
      )}
    </div>
  );
}
