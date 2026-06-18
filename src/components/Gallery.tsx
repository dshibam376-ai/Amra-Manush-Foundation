import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Eye, Grid, Maximize2, ShieldCheck, Heart } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'food' | 'children' | 'volunteer' | 'community' | 'events'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'food', label: 'Food Distribution' },
    { id: 'children', label: 'Child Welfare' },
    { id: 'volunteer', label: 'Volunteer Shifts' },
    { id: 'community', label: 'Community Outreaches' },
    { id: 'events', label: 'Events & Summits' },
  ];

  // Filtering list
  const filteredGallery = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (id: string) => {
    const idx = GALLERY_ITEMS.findIndex(item => item.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIdx) => (prevIdx === 0 ? GALLERY_ITEMS.length - 1 : prevIdx! - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIdx) => (prevIdx === GALLERY_ITEMS.length - 1 ? 0 : prevIdx! + 1));
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 border-t border-b border-slate-200 dark:border-slate-800 relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-orange-600 dark:bg-orange-500/5 blur-3.5xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] px-3.5 py-1 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase">
              VISUAL RECORD MODULE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
              Evidence of Grassroots Impact
            </h2>
            <p className="text-[#64748B] dark:text-slate-400 font-sans mt-2.5 text-sm leading-relaxed">
              Every image represents verified delivery. Browse real moments capturing hot food drives, youth welfare classrooms, senior checkups, and volunteer mobilizations.
            </p>
          </div>

          {/* Categories Pill selectors */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0 p-1 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indian-flag text-white border-0 font-bold shadow-md'
                    : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A2332] flex flex-col justify-end"
                onClick={() => openLightbox(item.id)}
              >
                {/* Image tag with strict no-referrer */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                
                {/* Elegant overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:via-slate-950/60 transition-all duration-300" />
                
                {/* Visual Indicators on hover */}
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-white dark:bg-[#1A2332]/80 border border-slate-200 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4 text-[#fbbf24] animate-pulse" />
                </div>

                {/* Cover Texts */}
                <div className="relative p-5 z-10 text-left">
                  <span className="text-[9px] font-mono tracking-widest text-[#fbbf24] font-bold uppercase mb-1 block">
                    {item.category === 'food' && 'Ekbelar Aahar'}
                    {item.category === 'children' && 'Child Welfare'}
                    {item.category === 'volunteer' && 'Volunteerism'}
                    {item.category === 'community' && 'Empowerment'}
                    {item.category === 'events' && 'Summit Log'}
                  </span>
                  
                  <h4 className="font-display font-medium text-[#0F172A] dark:text-slate-100 text-sm leading-tight tracking-wide group-hover:text-[#1E293B] dark:text-white group-hover:underline">
                    {item.title}
                  </h4>
                  
                  <p className="text-2xs text-[#64748B] dark:text-slate-400 mt-1.5 leading-normal opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-300 overflow-hidden font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Professional Lightbox viewing experience overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-[#1A2332]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Close trigger button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-3 rounded-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left selector */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 p-3 rounded-full bg-white dark:bg-[#1A2332]/60 border border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white hover:bg-[#F0F7FF] dark:bg-[#111827] dark:hover:bg-[#1A2332]/80 transition-colors hidden sm:block cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right selector */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 p-3 rounded-full bg-white dark:bg-[#1A2332]/60 border border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white hover:bg-[#F0F7FF] dark:bg-[#111827] dark:hover:bg-[#1A2332]/80 transition-colors hidden sm:block cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main Lightbox Body Frame */}
            <div 
              className="max-w-4xl w-full flex flex-col rounded-2xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A2332] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video max-h-[70vh] bg-white dark:bg-[#1A2332] flex items-center justify-center overflow-hidden">
                <img
                  src={currentLightboxItem.src}
                  alt={currentLightboxItem.title}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Information Footnote */}
              <div className="p-5 sm:p-6 bg-white dark:bg-[#1A2332] border-t border-slate-200 dark:border-slate-800 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#fbbf24] font-bold uppercase">
                    Verification Category: {currentLightboxItem.category}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded border border-orange-200/40">
                    <ShieldCheck className="h-3 w-3" /> Timestamp Secured
                  </div>
                </div>

                <h3 className="font-display font-medium text-lg text-[#1E293B] dark:text-white">
                  {currentLightboxItem.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 font-sans leading-relaxed mt-2.5">
                  {currentLightboxItem.description}
                </p>

                {/* Slide index info */}
                <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-2xs text-[#64748B] dark:text-slate-400 font-mono">
                  <span>Amra Manush Media Registry</span>
                  <span>{lightboxIndex + 1} / {GALLERY_ITEMS.length} Files</span>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
