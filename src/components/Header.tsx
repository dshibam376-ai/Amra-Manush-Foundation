import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, Shield, Award, Users, Search, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import NoticeBanner from './NoticeBanner';
import { useLanguage } from '../lib/LanguageContext';
import ThemeToggle from './ThemeToggle';
import { useNavigate, useLocation } from 'react-router-dom';

// @ts-ignore
import msmeLogo from '../assets/images/msme_official_logo_transparent_1781664473944.jpg';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  isStandalone?: boolean;
}

export default function Header({ onNavigate, activeSection, language, setLanguage, isStandalone }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(100); // percentage
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'flagship', label: t('nav.flagship') },
    { id: 'dashboard-pillars', label: t('nav.dashboard_pillars') },
    { id: 'partnerships', label: t('nav.partnerships') },
    { id: 'gallery', label: t('nav.stories_media') },
  ];

  const handleNavClick = (id: string) => {
    const path = id === 'hero' ? '/' : `/${id}`;
    navigate(path);
    if (path === location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div className={`fixed ${isStandalone ? 'top-[64px]' : 'top-0'} left-0 w-full z-50 flex flex-col`}>
      {/* Utility / Accessibility Bar (Govt Style) */}
      <div className="bg-[#050B16] border-b border-white/5 py-1 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono tracking-wider uppercase">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-2 border-r border-white/10 pr-4">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              <span className="text-[9px] font-black text-slate-200 tracking-wider">GOVERNMENT VERIFIED</span>
            </div>
            
            <div className="flex items-center gap-2 border-r border-white/10 pr-4">
              <img 
                src={msmeLogo} 
                alt="MSME logo" 
                className="h-5 w-auto object-contain brightness-110" 
              />
              <span className="text-[9px] font-bold text-slate-300 tracking-tight">Regd. Micro Enterprise</span>
            </div>

            <a href="#main-content" className="hover:text-white transition-colors focus:bg-amber-400 focus:text-black focus:px-2 py-0.5 outline-none rounded">
              {language === 'en' ? 'Skip to main content' : 'প্রধান কন্টেন্টে যান'}
            </a>
            <button className="hover:text-white transition-colors hidden md:block">
              {language === 'en' ? 'Screen Reader Access' : 'স্ক্রিন রিডার অ্যাক্সেস'}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Font Resize controls */}
            <div className="flex items-center border-x border-white/10 px-4 gap-2.5">
              <button 
                onClick={() => setFontSize(Math.max(80, fontSize - 10))}
                className="text-slate-400 hover:text-white transition-colors"
                title="Decrease Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize(100)}
                className="text-slate-200 hover:text-white transition-colors"
                title="Reset Font Size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize(Math.min(120, fontSize + 10))}
                className="text-slate-400 hover:text-white transition-colors"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
              >
                {language === 'en' ? 'বাংলা' : 'ENGLISH'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tri-color band */}
      <div className="w-full h-1 bg-indian-flag" />
      <NoticeBanner />
      <nav
        className={`w-full transition-all duration-300 relative ${
          scrolled 
            ? 'bg-[#0B1528]/95 backdrop-blur-md border-b border-[#1E293B]/60 shadow-lg py-3' 
            : 'bg-[#0B1528] border-b border-[#1E293B]/30 py-4 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Group */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('hero')}
            >
              <Logo className="h-10 w-10 shrink-0" />
              <div className="whitespace-nowrap">
                <span className="font-display font-medium text-lg md:text-xl text-white tracking-tight flex items-center gap-1.5 leading-none">
                  AMRA MANUSH <span className="text-orange-500 text-[9px] hidden sm:inline-block border border-orange-500/30 px-1.5 py-0.5 rounded-sm bg-orange-500/10 font-mono uppercase tracking-widest">FOUNDATION</span>
                  <span className="text-orange-500 text-[9px] hidden sm:inline-block border border-green-500/30 px-1.5 py-0.5 rounded-sm bg-green-500/10 font-mono uppercase tracking-widest font-bold">GOVT CERTIFIED (MSME)</span>
                </span>
                <p className="text-[9px] text-amber-400/80 font-mono tracking-widest uppercase hidden md:block mt-1 leading-none">
                  A responsibility to change lives
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[linear-gradient(135deg,#0F766E_0%,#14B8A6_50%,#F59E0B_100%)] text-white border-0/10 shadow-md'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Theme Switcher */}
              <div className="flex items-center pl-4 ml-4 border-l border-white/10 gap-3">
                <ThemeToggle />
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-slate-200 hover:text-white rounded-md hover:bg-white/10 transition-all"
              >
                <Search className="h-5 w-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-[#0B1528] border border-white/10 rounded-lg shadow-xl p-2 z-50">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pillars, gallery..."
                    className="w-full px-3 py-2 bg-[#0B1528] border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-amber-400/40 transition-colors"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('volunteer')}
                className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 border border-slate-500/50 rounded-md transition-all cursor-pointer"
              >
                {t('hero.action_volunteer')}
              </button>
              <button
                onClick={() => handleNavClick('donate')}
                className="relative group overflow-hidden px-5 py-2 rounded-md text-sm font-semibold bg-[linear-gradient(135deg,#0F766E_0%,#14B8A6_50%,#F59E0B_100%)] text-white shadow-md group-hover:shadow-lg hover:brightness-105 active:scale-98 transition-all cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Heart className="h-4 w-4 fill-white animate-pulse" />
                  {t('hero.action_donate')}
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Subtle accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-indian-flag opacity-40" />
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-40 lg:hidden bg-[#0A1424] border border-white/10 p-4 shadow-xl"
          >
            <div className="space-y-1.5 pb-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-[linear-gradient(135deg,#0F766E_0%,#14B8A6_50%,#F59E0B_100%)] text-white'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
                <div className="flex items-center justify-center">
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => handleNavClick('volunteer')}
                  className="w-full py-2.5 text-center text-sm font-medium text-slate-200 bg-white/10 border border-white/10 rounded-md hover:bg-white/20 transition-all font-sans"
                >
                  {t('hero.action_volunteer')}
                </button>
                <button
                  onClick={() => handleNavClick('donate')}
                  className="w-full py-2.5 text-center text-sm font-semibold bg-[linear-gradient(135deg,#0F766E_0%,#14B8A6_50%,#F59E0B_100%)] text-white rounded-md shadow hover:brightness-105 transition-all flex items-center justify-center gap-1.5 font-sans"
                >
                  <Heart className="h-4 w-4 fill-white" />
                  {t('hero.action_donate')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
