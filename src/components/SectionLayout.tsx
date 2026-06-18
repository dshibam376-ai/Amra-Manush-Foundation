import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, ChevronLeft, Globe, RefreshCcw, MoreVertical, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import WhatsAppButton from './WhatsAppButton';
import { useLanguage } from '../lib/LanguageContext';

interface SectionLayoutProps {
  children: React.ReactNode;
  title: string;
  subdomain: string;
}

export default function SectionLayout({ children, title, subdomain }: SectionLayoutProps) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1528] flex flex-col font-sans">
      {/* Simulation Browser Bar for "Subdomain" feel */}
      <div className="bg-[#050B16] border-b border-white/5 py-2 px-4 sticky top-0 z-[70]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-3">
             <button 
                onClick={() => {
                  window.close();
                  navigate('/');
                }}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-400"
                title="Go Back"
             >
               <ChevronLeft className="h-4 w-4" />
             </button>
             <div className="hidden sm:flex items-center gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
               <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
             </div>
           </div>

           <div className="flex-1 max-w-xl mx-4">
             <div className="bg-[#0F172A] border border-white/10 rounded-md px-4 py-1.5 flex items-center gap-2 group">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[10px] text-emerald-500 font-bold font-mono tracking-tighter uppercase mr-2">Secure</span>
                <div className="h-3 w-[1px] bg-slate-700 mx-1" />
                <div className="flex-1 truncate">
                  <span className="text-slate-500 font-mono text-[10px]">https://</span>
                  <span className="text-blue-400 font-mono text-[11px] font-bold">
                    {subdomain}.amramanush.org/
                  </span>
                </div>
                <RefreshCcw className="h-3 w-3 text-slate-500 cursor-pointer hidden sm:block" />
             </div>
           </div>

           <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-slate-400">
             <span className="hidden lg:block text-emerald-500/80 tracking-widest">● LIVE_PORTAL_ACTIVE</span>
           </div>
        </div>
      </div>

      {/* Main Site Header integrated into standalone page */}
      <div className="sticky top-[45px] z-[60]">
        <Header 
          onNavigate={(id) => navigate(id === 'hero' ? '/' : `/${id}`)} 
          activeSection={subdomain} 
          language={language} 
          setLanguage={setLanguage} 
        />
      </div>

      <div className="flex-grow pt-8">
        {/* We reuse the branding at the top of the standalone page */}
        <div className="bg-white dark:bg-[#0B1528] border-b border-slate-200 dark:border-slate-800 py-8 px-6 text-center">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#0F172A] dark:text-white tracking-tighter uppercase mb-2">
              {title}
            </h1>
            <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase">
              Amra Manush Foundation Professional Data Portal
            </p>
        </div>

        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      <Footer onNavigate={(id) => navigate(`/${id}`)} />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}
