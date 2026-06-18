import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, X, ArrowRight, Heart, Phone, Mail, MapPin, Award, Eye, ExternalLink } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const noticeBannerEn = '/notice_banner_en_final.jpg';
const noticeBannerBn = '/notice_banner_bn_final.jpg';

export default function NoticeBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<'phone' | 'email' | null>(null);
  const { language, t } = useLanguage();
  const [selectedPoster, setSelectedPoster] = useState<'bn' | 'en'>(language === 'bn' ? 'bn' : 'en');

  useEffect(() => {
    setSelectedPoster(language === 'bn' ? 'bn' : 'en');
  }, [language]);

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Visual Notice Banner Ribbon */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative bg-[#F0F7FF] dark:bg-[#111827] border-b border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-slate-100 z-50 overflow-hidden"
      >
        {/* Trucolor fine border divider on the bottom */}
        <div className="absolute top-0 left-0 right-0 h-[2px] w-full flex">
          <div className="w-1/3 bg-[#FF9933]/80"></div>
          <div className="w-1/3 bg-[#FFFFFF]/80"></div>
          <div className="w-1/3 bg-[#138808]/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs font-sans">
          {/* Badge & Info */}
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="flex-shrink-0 flex items-center justify-center p-1 rounded-md bg-blue-600 dark:bg-cyan-900/50 text-white dark:text-cyan-400 border-[1px] border-blue-600/20 dark:border-cyan-450/20 animate-pulse">
              <Megaphone className="h-3.5 w-3.5" />
            </span>

            {/* Interactive Miniature Thumbnail of the Flyer */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="relative flex-shrink-0 group cursor-pointer hidden md:block"
              title={t('banner.view_poster')}
            >
              <img
                src={language === 'bn' ? noticeBannerBn : noticeBannerEn}
                alt="Flyer Photo Thumbnail"
                className="h-8 w-12 object-cover rounded border border-blue-600/20 dark:border-cyan-400/30 group-hover:border-blue-600/30 group-hover:scale-105 transition-all duration-300 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-500/5 dark:bg-[#0B1220]/10 group-hover:bg-transparent rounded transition-colors" />
            </div>

            <div className="text-left font-medium leading-relaxed tracking-wide truncate">
              <span className="text-blue-600 dark:text-cyan-400 font-mono font-bold uppercase tracking-widest mr-1.5 border border-blue-200 dark:border-cyan-400/30 px-1.5 py-0.5 rounded-sm text-[9px] bg-blue-100 dark:bg-cyan-400/10">
                {t('banner.badge')}
              </span>
              <span className="text-[#0F172A] dark:text-slate-250">
                {t('banner.title')}
              </span>
              <span className="hidden md:inline text-slate-500 dark:text-slate-400 ml-1.5">• {t('banner.sub')}</span>
            </div>
          </div>

          {/* Action and Dismiss */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-slate-800 dark:text-cyan-400 hover:dark:bg-slate-705 px-3 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              {t('banner.view_poster')} <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-md hover:bg-slate-200/60 dark:hover:bg-[#1E293B] transition-all cursor-pointer"
              title={t('banner.dismiss')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Official Charter High-Fidelity Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-white dark:bg-[#1A2332]/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-y-auto shadow-2xl flex flex-col lg:flex-row text-[#0F172A] dark:text-slate-100"
            >
              {/* Close Button on top right */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white dark:bg-[#1A2332]/70 hover:bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white p-2 rounded-full shadow-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Column: Full-scale Official Poster Visual */}
              <div className="w-full lg:w-3/5 bg-white dark:bg-[#1A2332] border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between relative">
                <div>
                  {/* Tabs Selector at the Top */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#d4af37] px-2.5 py-1 rounded-md bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase whitespace-nowrap">
                      {t('banner.modal_badge')}
                    </span>
                    
                    <div className="flex gap-1.5 bg-white dark:bg-[#1A2332] p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setSelectedPoster('bn')}
                        className={`px-3 py-1 text-[10px] font-bold font-sans rounded-md cursor-pointer transition-all ${
                          selectedPoster === 'bn'
                            ? 'bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0 text-white shadow-md'
                            : 'text-[#334155] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                        }`}
                      >
                        বাংলা পোস্টার
                      </button>
                      <button
                        onClick={() => setSelectedPoster('en')}
                        className={`px-3 py-1 text-[10px] font-bold font-sans rounded-md cursor-pointer transition-all ${
                          selectedPoster === 'en'
                            ? 'bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0 text-white shadow-md'
                            : 'text-[#334155] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                        }`}
                      >
                        English Flyer
                      </button>
                    </div>
                  </div>

                  {/* Fully visible and responsive picture frame */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A2332] group shadow-lg">
                    <img
                      src={selectedPoster === 'bn' ? noticeBannerBn : noticeBannerEn}
                      alt="Amra Manush Foundation Official Charter Poster"
                      className="w-full h-auto object-contain max-h-[58vh] md:max-h-[64vh] mx-auto rounded-xl select-none transition-transform duration-500 group-hover:scale-[1.01]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Nice subtle hover vignette and zoom label */}
                    <div className="absolute inset-0 bg-white dark:bg-[#1A2332]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-white dark:bg-[#1A2332]/80 border border-slate-700/50 text-[#0F172A] dark:text-white rounded-full px-4 py-2 text-xs font-medium flex items-center gap-1.5 shadow-xl animate-bounce">
                        <Eye className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" /> Hover to Inspect
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Note under image */}
                <div className="mt-4 bg-white dark:bg-[#1A2332]/50 border border-slate-200 dark:border-slate-800/60 rounded-lg p-3 text-left animate-fade-in">
                  <div className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-0.5 text-orange-600 dark:text-orange-400 text-xs">🔔</span>
                    <p className="text-[#334155] dark:text-slate-300 text-[11px] leading-relaxed">
                      {selectedPoster === 'bn' 
                        ? 'এটি আমরা মানুষ ফাউন্ডেশন-এর অফিসিয়াল প্রচার পোস্টার। আমাদের মূল উদ্দেশ্যসমূহ ও যোগাযোগের বিবরণ উপরে প্রদর্শিত হয়েছে।'
                        : 'This is the official flyers and registry representation of Amra Manush Foundation. Use the tabs above to toggle between languages.'
                      }
                    </p>
                  </div>
                  <div className="mt-2 text-left">
                    <a
                      href={selectedPoster === 'bn' ? noticeBannerBn : noticeBannerEn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-600 dark:text-cyan-400 inline-flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" /> View original full-size photo
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Poster Details rendered with precision */}
              <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
                {/* Official Flyer Headings */}
                <div className="text-left">
                  <div className="flex items-center gap-1.5 mb-1 text-orange-600 dark:text-orange-400 font-mono font-bold tracking-widest text-[10px] uppercase">
                    <Award className="h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" /> {t('banner.govt_certified')}
                  </div>
                  
                  <div className="flex flex-col mb-4">
                    <div className="flex items-baseline gap-2">
                      <h2 className="font-display font-black text-3xl sm:text-4xl text-[#fff] tracking-tight leading-none uppercase">
                        AMRA MANUSH
                      </h2>
                    </div>
                    <span className="font-display leading-none text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1 uppercase tracking-wider">
                      FOUNDATION
                    </span>
                    <p className="text-[14px] text-[#C5A059] font-medium tracking-wide mt-1 italic">
                      {t('banner.sub_gold')}
                    </p>
                  </div>

                  {/* Red Decorative Banner Ribbon */}
                  <div className="bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-center py-2 px-4 rounded-md text-white text-xs font-bold tracking-wider uppercase mb-6 shadow-md border-y border-red-500/20 font-sans">
                    {t('banner.red_ribbon')}
                  </div>

                  {/* Five Strategic Goals/Domains of the Charter */}
                  <h4 className="text-xs font-mono font-bold text-slate-400 tracking-widest uppercase mb-3.5">
                    {t('banner.domains_title')}
                  </h4>
 
                  <div className="space-y-3.5 mb-8">
                    {/* Domain 1 */}
                    <div className="flex items-start gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <div className="h-6 w-6 mt-0.5 rounded-full bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 flex items-center justify-center text-white text-xs font-bold font-mono">
                        1
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider group-hover:text-blue-400 dark:text-cyan-400 transition-colors">
                          {t('banner.domain1_title')}
                        </h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {t('banner.domain1_desc')}
                        </p>
                      </div>
                    </div>
 
                    {/* Domain 2 */}
                    <div className="flex items-start gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <div className="h-6 w-6 mt-0.5 rounded-full bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 flex items-center justify-center text-white text-xs font-bold font-mono">
                        2
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider group-hover:text-blue-400 dark:text-cyan-400 transition-colors">
                          {t('banner.domain2_title')}
                        </h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {t('banner.domain2_desc')}
                        </p>
                      </div>
                    </div>
 
                    {/* Domain 3 */}
                    <div className="flex items-start gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <div className="h-6 w-6 mt-0.5 rounded-full bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 flex items-center justify-center text-white text-xs font-bold font-mono">
                        3
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider group-hover:text-blue-400 dark:text-cyan-400 transition-colors">
                          {t('banner.domain3_title')}
                        </h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {t('banner.domain3_desc')}
                        </p>
                      </div>
                    </div>
 
                    {/* Domain 4 */}
                    <div className="flex items-start gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <div className="h-6 w-6 mt-0.5 rounded-full bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 flex items-center justify-center text-white text-xs font-bold font-mono">
                        4
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider group-hover:text-blue-400 dark:text-cyan-400 transition-colors">
                          {t('banner.domain4_title')}
                        </h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {t('banner.domain4_desc')}
                        </p>
                      </div>
                    </div>
 
                    {/* Domain 5 */}
                    <div className="flex items-start gap-3 group transition-transform duration-200 hover:translate-x-1">
                      <div className="h-6 w-6 mt-0.5 rounded-full bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 flex items-center justify-center text-white text-xs font-bold font-mono">
                        5
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider group-hover:text-blue-400 dark:text-cyan-400 transition-colors">
                          {t('banner.domain5_title')}
                        </h5>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {t('banner.domain5_desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer and Contacts Row */}
                <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-1.5 mb-3 text-orange-400 text-[11px] font-medium italic">
                    <Heart className="h-3 w-3 fill-amber-500 text-orange-400" />
                    {t('banner.join_us')}
                  </div>

                  {/* Responsive Contacts Panel */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                    <button
                      onClick={() => handleCopy('+916289536580', 'phone')}
                      className="flex items-center justify-between px-3 py-2 bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:border-slate-700 rounded-lg text-[#334155] dark:text-slate-300 hover:text-[#0F172A] dark:text-white transition-all cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
                        +91 62895 36580
                      </span>
                      <span className="text-[9px] text-[#C5A059] uppercase">
                        {copiedText === 'phone' ? t('general.copied') : t('general.copy')}
                      </span>
                    </button>

                    <button
                      onClick={() => handleCopy('amramanushofficial@gmail.com', 'email')}
                      className="flex items-center justify-between px-3 py-2 bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:border-slate-700 rounded-lg text-[#334155] dark:text-slate-300 hover:text-[#0F172A] dark:text-white transition-all cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
                        amramanushofficial@gmail.com
                      </span>
                      <span className="text-[9px] text-[#C5A059] uppercase flex-shrink-0">
                        {copiedText === 'email' ? t('general.copied') : t('general.copy')}
                      </span>
                    </button>
                  </div>

                  <div className="mt-4 text-center text-[9px] text-[#64748B] dark:text-slate-400 font-mono tracking-wider flex items-center justify-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-red-500" /> {t('banner.serving')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
