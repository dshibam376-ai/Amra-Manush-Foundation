import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px (typically past the hero section)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top-button"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          title={t('general.scroll_to_top')}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-[#1A2332]/95 border border-blue-600/20 dark:border-cyan-400/30 text-orange-600 dark:text-orange-400 hover:text-blue-600 dark:text-cyan-400 hover:bg-[#F0F7FF] dark:bg-[#111827] dark:hover:bg-[#1A2332] hover:border-blue-600/20 dark:border-cyan-400/30 focus:outline-none shadow-lg shadow-blue-500/10 cursor-pointer group active:scale-95 transition-all"
        >
          {/* Subtle glowing ring background */}
          <div className="absolute inset-0 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 group-hover:bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 animate-ping group-hover:block hidden duration-1000" />
          
          <ChevronUp className="h-6 w-6 transform group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
