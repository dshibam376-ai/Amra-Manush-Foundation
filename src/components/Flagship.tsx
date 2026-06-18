import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Heart, ShieldCheck, ChevronRight, Apple, Check, Users, Sparkles, AlertCircle, Eye, Download, ChevronLeft, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { FLAGSHIP_STORIES } from '../data';

interface FlagshipProps {
  onDonateClick: () => void;
}

export default function Flagship({ onDonateClick }: FlagshipProps) {
  const [mealCount, setMealCount] = useState<number>(50);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [selectedFlyerIdx, setSelectedFlyerIdx] = useState<number | null>(null);
  const { t } = useLanguage();

  // Meal support monetary config
  const mealCost = 40; // ₹40 per nutritious hot meal
  const totalCost = mealCount * mealCost;

  // Official Notice Flyers and Announcements representing the campaign
  const campaignFlyers = [
    {
      id: "flyer-1",
      title: "English Campaign Flyer (Official)",
      subtitle: "Ekbelar Aahar Prospectus",
      description: "Standard compliance flyer outlining the fundamental goals, government MSME enrollment details, and formal aid opportunities in English.",
      src: "/notice_banner_en_final.jpg"
    },
    {
      id: "flyer-2",
      title: "Bengali Campaign Flyer (Official)",
      subtitle: "Ekbelar Aahar Abhiyan Flyer",
      description: "The official West Bengal community notice board poster outlining local sub-kitchen centers, target nutrition indicators, and contacts.",
      src: "/notice_banner_bn_final.jpg"
    },
    {
      id: "flyer-3",
      title: "Grassroots Announcement (Bangla)",
      subtitle: "Neighborhood Outreach Bulletin",
      description: "Local campaign extended banner detailing sub-kitchen center shifts, nutritional schedules, and rural coordinator maps.",
      src: "/notice_banner_bn_1781521020066.jpg"
    },
    {
      id: "flyer-4",
      title: "Ekbelar Aahar Standard Notice",
      subtitle: "Core Campaign Banner",
      description: "Primary distribution-center notice board banner displayed permanently in our kitchens across Sreerampore and Hindmotor.",
      src: "/notice_banner_1781514504810.jpg"
    }
  ];

  // Before & After comparisons requested
  const comparisons = [
    {
      id: 'cmp-1',
      title: "Hindmotor Station Underpass Community",
      before: "Families and children subsisted on irregular single-item dry scraps from trains. Stunted growth, iron-deficiency, and high pediatric disease rates.",
      after: "Sustained hot healthy lunches distributed daily at 1:00 PM. Full nutrition containing rice, lentils, seasonal greens, and high-protein eggs.",
      metric: "Stunting risk dropped 82% among 120 regular children.",
      image: "/notice_banner_bn_final.jpg"
    },
    {
      id: 'cmp-2',
      title: "Abandoned Elders at Hooghly Ghats",
      before: "Senior citizens, left with no social recourse or cash, begged daily for random starch water, facing gastric infections and severe muscular decay.",
      after: "Inclusion of 45 senior citizens in our daily nutrient tracking program, getting dedicated diet packages containing soft fibers and vital elements.",
      metric: "Weight improvement and regular energy levels restored.",
      image: "/notice_banner_en_final.jpg"
    }
  ];

  const [activeCompareId, setActiveCompareId] = useState(comparisons[0].id);
  const currentCompare = comparisons.find(c => c.id === activeCompareId) || comparisons[0];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealCount(parseInt(e.target.value));
  };

  return (
    <section id="flagship" className="py-24 relative overflow-hidden">
      {/* Visual backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 blur-3.5xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-orange-600 dark:bg-orange-500/5 blur-3.5xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flagship Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] px-3.5 py-1.5 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            FLAGSHIP INITIATIVE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {t('flagship.title')}
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-display font-medium text-sm sm:text-base mt-2 text-[#d4af37]">
            {t('flagship.subtitle')}
          </p>
          <div className="h-1.5 w-16 bg-[#d4af37] mx-auto mt-6 rounded-full" />
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Information & Core Philosophy */}
          <div>
            <div className="p-3 bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 rounded-2xl w-fit mb-6">
              <Utensils className="h-7 w-7 text-orange-600 dark:text-orange-400" />
            </div>
            
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#1E293B] dark:text-white tracking-tight leading-snug mb-6">
              Nourishing Bodies, Sowing Hope, Safeguarding Human Dignity
            </h3>
            
            <div className="space-y-4 text-[#334155] dark:text-slate-300 font-sans leading-relaxed text-sm sm:text-base mb-8">
              <p>
                <strong>Ekbelar Aahar Abhiyan</strong> is our cornerstone humanitarian pledge targeting the absolute eradication of pediatric stunting and acute food crisis among marginalized communities in West Bengal.
              </p>
              <p>
                A meal is not just basic fuel—it is the direct catalyst for developmental growth. When a child has food security, they can focus on classroom reading. When a disabled adult has a hot lunch guaranteed, they can direct energy towards learning a craft. 
              </p>
              <p>
                The program strictly coordinates local, certified chefs to prepare balanced dishes of absolute hygiene. We monitor nutrient weight index metrics, distribute to registered recipients, and run zero-waste smart kitchens.
              </p>
            </div>

            {/* Recipients Highlight Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-orange-600 dark:bg-orange-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] dark:text-slate-100 text-xs sm:text-sm">Underprivileged Children</h4>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400">Nutrient security against growth stunting</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-orange-600 dark:bg-orange-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] dark:text-slate-100 text-xs sm:text-sm">Elderly Individuals</h4>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400">Dignity, nourishment, vital medicines</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-orange-600 dark:bg-orange-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] dark:text-slate-100 text-xs sm:text-sm">Disabled Citizens</h4>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400">Mobility kits paired with physical wellness</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-orange-600 dark:bg-orange-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] dark:text-slate-100 text-xs sm:text-sm">Destitute Slums</h4>
                  <p className="text-[11px] text-[#64748B] dark:text-slate-400">Unrestricted daily meal backup loops</p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Calculator Box & Meal Sourcing Breakdown */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-3 text-[10px] uppercase font-mono tracking-widest text-[#d4af37] flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> IMPACT ESTIMATOR
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-lg text-[#1E293B] dark:text-white mb-2">Nutritional Calculator</h3>
              <p className="text-xs text-[#334155] dark:text-slate-300 font-sans leading-relaxed mb-6">
                Determine the profound difference your family or corporate sponsorship can generate immediately. Move the slider to customize support range.
              </p>

              {/* Slider Controls */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#64748B] dark:text-slate-400">Target Meal Count</span>
                  <span className="text-blue-600 dark:text-cyan-400 font-bold text-sm bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 px-2 py-0.5 rounded border border-blue-600/20 dark:border-cyan-400/30">
                    {mealCount} Meals
                  </span>
                </div>

                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={mealCount}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-white dark:bg-[#1A2332] rounded-lg appearance-none cursor-pointer accent-amber-500 border border-slate-200 dark:border-slate-800"
                />

                <div className="flex justify-between text-[10px] text-[#64748B] dark:text-slate-400 font-mono">
                  <span>5 Meals</span>
                  <span>100 Meals</span>
                  <span>250 Meals</span>
                  <span>500 Meals</span>
                </div>
              </div>

              {/* Impact output breakdown */}
              <div className="p-4 bg-white dark:bg-[#1A2332] rounded-xl border border-slate-200 dark:border-slate-800 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#334155] dark:text-slate-300">Monetary Commitment</span>
                  <span className="text-sm font-bold font-mono text-orange-600 dark:text-orange-400">₹{totalCost.toLocaleString('en-IN')} INR</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400">
                  <span>Cost Per Nutritious Meal</span>
                  <span>₹40 INR</span>
                </div>
                <div className="h-[1px] bg-slate-100 dark:bg-[#1E293B]" />
                <div className="text-[10.5px] text-[#334155] dark:text-slate-300 leading-relaxed font-sans">
                  <strong className="text-blue-600 dark:text-cyan-400">Community Value:</strong> Sponsoring <strong className="text-[#0F172A] dark:text-white">{mealCount} meals</strong> provides highly sanitary, high-protein hot lunches consisting of eggs, fresh seasonal lentils, rice, hygiene checks, and direct field delivery tracking for <strong className="text-[#0F172A] dark:text-white">{Math.ceil(mealCount/5)} extreme-poverty families</strong> for a whole week in Hindmotor slums.
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <button
              onClick={() => {
                onDonateClick();
              }}
              className="w-full py-3.5 rounded-lg bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white font-bold hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            >
              Sponsor {mealCount} Meals Today
            </button>
          </div>

        </div>

        {/* Flagship Story Highlight */}
        <div className="mt-16 bg-white dark:bg-[#1A2332]/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="text-orange-600 dark:text-orange-400 font-mono text-xs uppercase tracking-widest mb-2 font-bold">Featured Initiative Story</h4>
            <h3 className="text-[#1E293B] dark:text-white text-2xl font-bold font-display mb-4">{FLAGSHIP_STORIES[0].title}</h3>
            <p className="text-[#64748B] dark:text-slate-400 text-sm leading-relaxed mb-4">{FLAGSHIP_STORIES[0].challenge}</p>
            <p className="text-[#0F172A] dark:text-slate-200 text-sm italic">"{FLAGSHIP_STORIES[0].intervention}"</p>
          </div>
          <div className="h-64 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <img src={FLAGSHIP_STORIES[0].image} alt={FLAGSHIP_STORIES[0].title} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Before / After Case study Carousel (Governance Requirement) */}
        <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 tracking-wider">MEASURABLE VERIFIED TRANSFORMATIONS</span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E293B] dark:text-white mt-1">Before & After Camp Narratives</h3>
            </div>
            
            {/* Quick selectors */}
            <div className="flex gap-2 mt-4 md:mt-0 p-1 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-lg">
              {comparisons.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCompareId(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeCompareId === c.id 
                      ? 'bg-slate-100 dark:bg-[#1E293B] text-blue-600 dark:text-cyan-400 border border-slate-700' 
                      : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white'
                  }`}
                >
                  {c.title.split(' ')[0]} Hub
                </button>
              ))}
            </div>
          </div>

          {/* Active comparison card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-[#1A2332] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 relative">
            
            {/* Image display */}
            <div className="md:col-span-5 h-64 md:h-72 rounded-xl overflow-hidden relative">
              <img
                src={currentCompare.image}
                alt={currentCompare.title}
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 backdrop-blur-md">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase">Impact Metric Verified</span>
              </div>
            </div>

            {/* Case content */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="font-display font-bold text-lg sm:text-xl text-[#1E293B] dark:text-white">{currentCompare.title}</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                  <h5 className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-extrabold mb-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Initial Challenge
                  </h5>
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-normal font-sans">
                    {currentCompare.before}
                  </p>
                </div>

                <div className="p-4 bg-orange-600 dark:bg-orange-500/5 rounded-xl border border-emerald-500/10">
                  <h5 className="text-[10px] font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest font-extrabold mb-1 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Managed Intervention
                  </h5>
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-normal font-sans">
                    {currentCompare.after}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-r from-blue-600 dark:from-cyan-500/5 to-transparent border border-blue-600/20 dark:border-cyan-400/30 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0/10 border border-blue-600/20 dark:border-cyan-400/30 rounded-lg flex-shrink-0">
                  <Apple className="h-5 w-5 text-[#fbbf24]" />
                </div>
                <div>
                  <h5 className="text-[10.5px] font-mono text-[#fbbf24] uppercase tracking-wider font-bold">Key Transformation Metric</h5>
                  <p className="text-xs text-[#0F172A] dark:text-white font-semibold">{currentCompare.metric}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Campaign Publicity Flyers and Banners Exhibition */}
        <div id="campaign-posters" className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-orange-600 dark:text-orange-400 px-3.5 py-1.5 rounded-full bg-orange-600/5 dark:bg-orange-500/10 border border-orange-600/20 dark:border-orange-500/30 uppercase">
              Campaign Bulletins & Notices
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E293B] dark:text-white mt-4">
              Ekbelar Aahar Official Flyers
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-sans leading-relaxed mt-2 text-balance">
              Access the official flyers and local sub-kitchen circulars detailing verified credentials, registration procedures, and contacts. Click any banner to open the high-resolution reader.
            </p>
          </div>

          {/* Flyers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaignFlyers.map((flyer, index) => (
              <motion.div
                key={flyer.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between bg-white dark:bg-[#1A2332] rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-md hover:shadow-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedFlyerIdx(index)}
              >
                {/* Thumbnail Display with Overlay */}
                <div className="relative h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <img
                    src={flyer.src}
                    alt={flyer.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Tricolor Topline Banner on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1/3 bg-[#FF9933]" />
                    <div className="w-1/3 bg-white" />
                    <div className="w-1/3 bg-[#138808]" />
                  </div>
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="p-3 bg-white/90 dark:bg-[#1E293B]/90 rounded-full scale-50 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                      <Eye className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                    </span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#d4af37] font-semibold block uppercase">
                      {flyer.subtitle}
                    </span>
                    <h4 className="font-display font-bold text-sm text-[#1E293B] dark:text-white mt-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-cyan-450">
                      {flyer.title}
                    </h4>
                    <p className="text-2xs text-[#64748B] dark:text-slate-400 mt-2 leading-relaxed font-sans">
                      {flyer.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-blue-600 dark:text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                      Read Flyer <ChevronRight className="h-3 w-3" />
                    </span>
                    <a
                      href={flyer.src}
                      download={`AM_Campaign_${flyer.id}.jpg`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-[#64748B] dark:text-slate-400 hover:text-orange-500 hover:text-amber-400 transition-colors"
                      title="Download Full Resolution"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Immersive Lightbox Modal Container for Flyers */}
        <AnimatePresence>
          {selectedFlyerIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
              onClick={() => setSelectedFlyerIdx(null)}
            >
              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative bg-slate-900 dark:bg-slate-950 border border-slate-800 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left Side: Zoomable High Res Image Render */}
                <div className="md:w-3/5 bg-black flex items-center justify-center relative p-2 min-h-[300px]">
                  <img
                    src={campaignFlyers[selectedFlyerIdx].src}
                    alt={campaignFlyers[selectedFlyerIdx].title}
                    className="max-w-full max-h-[50vh] md:max-h-[75vh] object-contain rounded-lg shadow-inner"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Interactive left/right slide arrows inside lightbox */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFlyerIdx((prev) => (prev === 0 ? campaignFlyers.length - 1 : prev! - 1));
                      }}
                      className="p-2 sm:p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950/95 text-white block pointer-events-auto border border-slate-800 shadow-md transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFlyerIdx((prev) => (prev === campaignFlyers.length - 1 ? 0 : prev! + 1));
                      }}
                      className="p-2 sm:p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-950/95 text-white block pointer-events-auto border border-slate-800 shadow-md transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Descriptive meta controls */}
                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-left border-t md:border-t-0 md:border-l border-slate-800/80 text-slate-100 bg-slate-900">
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-[10px] font-mono tracking-widest text-[#fbbf24] font-bold uppercase py-1 px-2.5 rounded bg-amber-500/10 border border-amber-500/30 font-semibold">
                        {campaignFlyers[selectedFlyerIdx].subtitle}
                      </span>
                      <button
                        onClick={() => setSelectedFlyerIdx(null)}
                        className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Close Reader"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                      {campaignFlyers[selectedFlyerIdx].title}
                    </h3>
                    
                    <div className="h-[2px] w-12 bg-orange-500 my-4 rounded-full" />

                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                      {campaignFlyers[selectedFlyerIdx].description}
                    </p>

                    {/* Government and compliance indicator */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#fbbf24] font-bold">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#fbbf24]" /> VERIFIED COMPLIANCE
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                        Presented under Ministry of Micro, Small & Medium Enterprises alignment cert UDYAM-WB-07-0130195. All details verified legally valid.
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex flex-col gap-3 mt-6">
                    <a
                      href={campaignFlyers[selectedFlyerIdx].src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-800 text-center text-xs font-semibold hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center gap-1 border border-slate-700"
                    >
                      <Eye className="h-4 w-4" /> View Original
                    </a>
                    <a
                      href={campaignFlyers[selectedFlyerIdx].src}
                      download={`AM_Campaign_${campaignFlyers[selectedFlyerIdx].id}.jpg`}
                      className="w-full py-2.5 px-4 rounded-lg bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white text-center text-xs font-bold hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1 border-0"
                    >
                      <Download className="h-4 w-4" /> Download PDF/JPG
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
