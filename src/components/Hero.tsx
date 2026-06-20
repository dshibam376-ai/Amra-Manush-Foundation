import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ShieldCheck, Sparkles, Landmark, Utensils, HeartPulse, Users, TrendingUp } from 'lucide-react';
import { IMPACT_COUNTERS } from '../data';
import Logo from './Logo';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../lib/LanguageContext';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
import heroBackground from '../assets/images/hero_kids_background_1781600458576.jpg';
// @ts-ignore
import msmeLogo from '../assets/images/msme_official_logo_transparent_1781664473944.jpg';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '20%']);
  const navigate = useNavigate();

  const handleHeroNav = (id: string) => {
    const path = id === 'hero' ? '/' : `/${id}`;
    navigate(path);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-44 pb-20">
      {/* Background Graphic and Image with subtle gradient overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroBackground}
          alt="Amra Manush Smiling Children Campaign"
          style={{ y: backgroundY }}
          className="w-full h-full object-cover object-top opacity-[0.85] dark:opacity-[0.60] transition-opacity duration-500 scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Transparent gradient overlay to make text highly legible and focus background children */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent dark:from-[#07111F]/80 dark:via-[#07111F]/40 dark:to-[#07111F]" />

        {/* Saffron-orange top orb */}
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#FF9933]/35 dark:bg-[#FF9933]/25 blur-[120px] -z-10 pointer-events-none animate-float-slow" />
        {/* India-green bottom orb */}
        <div className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#138808]/35 dark:bg-[#138808]/25 blur-[120px] -z-10 pointer-events-none animate-float-slower" />
        {/* Ashoka Chakra Blue center orb */}
        <div className="absolute top-[35%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#0056D2]/30 dark:bg-[#0056D2]/20 blur-[100px] -z-10 pointer-events-none animate-float" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Centered Brand Emblem Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-6"
        >
          <div className="p-3 bg-white dark:bg-[#1A2332] border-2 border-blue-600/20 dark:border-cyan-400/30 rounded-full shadow-lg dark:shadow-[0_0_20px_rgba(34,211,238,0.15)] glow-effect">
            <Logo className="h-24 w-24 sm:h-28 sm:w-28" />
          </div>
        </motion.div>

        {/* Trust Badge Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-5 py-2.5 rounded-full bg-white dark:bg-[#1A2332] border border-blue-600/20 dark:border-cyan-400/30 text-xs text-blue-800 dark:text-cyan-400 font-sans mb-8 max-w-3xl mx-auto shadow-md cursor-pointer"
          onClick={() => handleHeroNav('transparency')}
          title="View Official Government MSME Certificate"
        >
          {/* National Identity Visuals */}
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#1E3A8A] dark:text-cyan-400" />
            <div className="flex flex-col items-start leading-none pr-3 border-r border-blue-800/20 dark:border-cyan-400/20">
              <span className="text-[7px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Bharat Sarkar</span>
              <span className="text-[8px] font-black text-slate-800 dark:text-white uppercase tracking-tighter">GOVT VERIFIED TRUST</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pr-3 border-r border-blue-800/20 dark:border-cyan-400/20">
            <img 
              src={msmeLogo} 
              alt="Official MSME Logo" 
              className="h-7 w-auto object-contain dark:brightness-125" 
            />
            <span className="text-[9px] font-bold text-[#1E3A8A] dark:text-cyan-400 uppercase tracking-tight">Micro Enterprise</span>
          </div>

          <span className="flex items-center gap-2 text-blue-800 dark:text-cyan-400 font-bold font-mono tracking-wider text-[10px] sm:text-[11px] uppercase">
            <Landmark className="h-4 w-4" /> {t('hero.badge')}
          </span>
          <span className="h-3.5 w-[1px] bg-blue-800/30 dark:bg-cyan-400/30 hidden sm:block" />
          <span className="flex items-center gap-1.5 text-[#334155] dark:text-slate-300 font-mono text-[10px] sm:text-[11px]">
            REG ID: <span className="font-semibold font-sans">UDYAM-WB-07-0130195</span>
          </span>
          <span className="h-3.5 w-[1px] bg-blue-800/30 dark:bg-cyan-400/30 hidden sm:block" />
          <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium whitespace-nowrap">
            <ShieldCheck className="h-4 w-4" /> {t('hero.gov_title')}
          </span>
        </motion.div>

        {/* Epic Headings */}
        <div className="max-w-4xl mx-auto mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-yellow-400 dark:text-yellow-300 tracking-tight leading-tight sm:leading-none"
          >
            {t('hero.title_part1')} <span className="text-[#FF9933]">{t('hero.title_part2')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl !text-[#FFFF00] font-sans font-bold leading-relaxed text-balance"
          >
            {t('hero.description')}
          </motion.p>
        </div>

        {/* Big CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => handleHeroNav('donate')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white font-bold text-base shadow-xl hover:shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
          >
            {t('hero.action_donate')} <ChevronRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => handleHeroNav('partnerships')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FFFFFF] dark:bg-[#1A2332] text-[#0056D2] dark:text-[#3B82F6] font-bold text-base border-2 border-[#E2E8F0] dark:border-[#334155] hover:bg-white dark:hover:bg-[#1e293b] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
          >
            {t('nav.partnerships')} <Sparkles className="h-4.5 w-4.5" />
          </button>
        </motion.div>

        {/* Floating Impact Statistic Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {IMPACT_COUNTERS.map((stat) => (
            <div 
              key={stat.id} 
              className="glass-panel text-left p-4 sm:p-6 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#64748B] dark:text-slate-400 uppercase">
                    {stat.id === 'meals' && 'EKBELAR AAHAR'}
                    {stat.id === 'children' && 'CHILD INTEGRITY'}
                    {stat.id === 'volunteers' && 'HUMAN NETWORK'}
                    {stat.id === 'programs' && 'SURFACE INITIATIVE'}
                  </span>
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-[#0f172a] border border-blue-100 dark:border-blue-900/50">
                    {stat.id === 'meals' && <Utensils className="h-4 w-4 text-orange-600 dark:text-cyan-400" />}
                    {stat.id === 'children' && <HeartPulse className="h-4 w-4 text-orange-600 dark:text-cyan-400" />}
                    {stat.id === 'volunteers' && <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                    {stat.id === 'programs' && <TrendingUp className="h-4 w-4 text-blue-600 dark:text-orange-400" />}
                  </div>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3.5xl text-[#1E293B] dark:text-white">
                  <AnimatedCounter value={stat.value} />
                  <span className="text-orange-600 dark:text-cyan-400">{stat.suffix}</span>
                </h3>
                <p className="font-semibold text-xs sm:text-sm text-[#334155] dark:text-slate-300 mt-1">{stat.label}</p>
              </div>
              <p className="text-[11px] sm:text-xs text-[#64748B] dark:text-slate-400 mt-2 font-sans border-t border-slate-200 dark:border-slate-800 pt-2 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Bottom Wave Angle */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-white dark:bg-[#1A2332]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
    </section>
  );
}
