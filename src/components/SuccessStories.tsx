import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, ArrowRight, Quote, ShieldCheck, Heart, User, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { SUCCESS_STORIES } from '../data';
import { useLanguage } from '../lib/LanguageContext';

export default function SuccessStories() {
  const { t, language } = useLanguage();
  const [activeStoryId, setActiveStoryId] = useState(SUCCESS_STORIES[0].id);

  const getStoryTranslations = (storyId: string) => {
    if (language !== 'bn') return null;
    switch (storyId) {
      case 'story-1':
        return {
          title: 'শৈশবের অধিকার রক্ষা: ইটভাটা থেকে প্রাথমিক স্কুলে প্রবেশ',
          category: 'শিশু কল্যাণ ও সুরক্ষা',
          challenge: '৯ বছরের রাহুল শ্রীরামপুর অঞ্চলে তার মায়ের দৈনিক সামান্য আয়ের সহযোগিতার জন্য প্রতিদিন ৮ ঘণ্টা করে ইটভাটার খামারে ভারী ইট বহনের কাজ করত। সে শিক্ষা ব্যবস্থার সম্পূর্ণ বাহিরে এবং তীব্র পুষ্টিহীনতায় ভুগছিল।',
          intervention: 'আমরা মানুষ ফাউন্ডেশন "একবেলার আহার অভিযান" এর মধ্য দিয়ে রাহুলের পরিবারকে সম্পূর্ণ খাদ্য নিরাপত্তা প্রদান করে। পাশাপাশি আমরা রাহুলের স্কুলে ভর্তির ফি, পোশাক ও বইপত্রের সমস্ত খরচ স্পন্সর করি ও তাকে নিয়মিত মানসিক পুনর্বাসন প্রদান করি।',
          outcome: 'রাহুল এখন চতুর্থ শ্রেণীতে পড়াশোনা করছে, নিয়মিত পুষ্টিকর খাবার পাচ্ছে এবং জ্যামিতিতে তার অসাধারণ প্রতিভা বিকাশ লাভ করছে। স্কুলে তার উপস্থিতির হার এখন ৯৪%।',
          metrics: [
            { label: 'পুষ্টির সুষম মান', value: '১০০% স্থিতিশীল' },
            { label: 'সাপ্তাহিক ক্লাসের সময়', value: '৩৫ ঘণ্টা' }
          ],
          quote: "আমরা মানুষ ফাউন্ডেশন আমাদের খাবারের সম্পূর্ণ দায়িত্ব নেওয়ার পর থেকেই আমার চুলা খালি থাকার দুশ্চিন্তা চিরতরে শেষ হয়েছে। এখন আমার ছেলে মাথায় ইট বহনের পরিবর্তে হাতে বই তুলে নিয়েছে।",
          author: "লতিকা বাউরি (রাহুলের মা)"
        };
      case 'story-2':
        return {
          title: 'প্রবীণ ব্যক্তির মর্যাদা পুনরুদ্ধার: রেললাইন থেকে নিরাপদ আশ্রয়',
          category: 'বার্ধক্যকালীন সেবা',
          challenge: '৭৪ বছর বয়সী প্রবীণ প্রভাষ বাবু তার দৃষ্টিশক্তি হারিয়ে হিন্দমোটর রেললাইন সংলগ্ন এলাকায় পরিবার কর্তৃক পরিত্যক্ত ও অনাহারে দিন কাটাচ্ছিলেন। দিনের পর দিন নোংরা পানি এবং ট্র‍্যাকের ধারের আবর্জনা খেয়ে তিনি বেঁচে থাকার চেষ্টা করছিলেন।',
          intervention: 'আমাদের একবেলার আহার স্বেচ্ছাসেবক টিম প্রভাষ বাবুকে দৈনিক পুষ্টিকর রান্না করা গরম খাবার বিতরণ কর্মসূচীর সাথে যুক্ত করে। পাশাপাশি একজন অভিজ্ঞ চক্ষু চিকিৎসকের মাধ্যমে সম্পূর্ণ বিনামূল্যে তার চোখের ছানি অপারেশন ও পুনর্বাসনের ব্যবস্থা করা হয়।',
          outcome: 'প্রভাষ বাবু এখন তার অবক্ষয়িত দৃষ্টিশক্তি পুনরায় আংশিক ফিরে পেয়েছেন, একটি নিরাপদ সমাজ আশ্রয়ে বাস করছেন এবং সম্পূর্ণ বিনামূল্যে দৈনিক পুষ্টিকর খাবার এবং প্রয়োজনীয় লাইফ-সেভিং ওষুধ পাচ্ছেন।',
          metrics: [
            { label: 'দৈনিক আহার নিশ্চিতকরণ', value: '১০০% নিশ্চিত' },
            { label: 'ছানি অপারেশনের ব্যয়', value: 'বিনামূল্যে স্পন্সর্ড' }
          ],
          quote: "যখন সবাই আমাকে রাস্তা ও রেললাইনের ধারে ফেলে চলে গিয়েছিল, এই সন্তানরা আমাকে পরম আদরে বুকে টেনে নিয়েছে। আহার ও চোখের আলো দুটোই ফিরে পেয়ে মনে হচ্ছে আমি জীবনে পুনরায় সম্মান ফিরে পেয়েছি।",
          author: "প্রভাষ ঘোষ (শ্রীরামপুরের সুবিধাভোগী প্রবীণ)"
        };
      default:
        return null;
    }
  };

  const activeStory = SUCCESS_STORIES.find(s => s.id === activeStoryId) || SUCCESS_STORIES[0];
  const trans = getStoryTranslations(activeStory.id);
  const title = trans ? trans.title : activeStory.title;
  const category = trans ? trans.category : activeStory.category;
  const challenge = trans ? trans.challenge : activeStory.challenge;
  const intervention = trans ? trans.intervention : activeStory.intervention;
  const outcome = trans ? trans.outcome : activeStory.outcome;
  const metrics = trans ? trans.metrics : activeStory.metrics;
  const quote = trans ? trans.quote : activeStory.quote;
  const author = trans ? trans.author : activeStory.author;

  return (
    <section id="stories" className="py-24 relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] px-3 py-1 rounded-full bg-blue-600/5 dark:bg-[#1E293B] border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            {language === 'bn' ? 'মানব-কেন্দ্রিক প্রকৃত কল্যাণ ও প্রভাব' : 'HUMAN-CENTERED IMPACT'}
          </span>
          <h2 className="font-display font-bold text-3.5xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {t('stories.title')}
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-sans text-sm sm:text-base mt-3 leading-relaxed">
            {t('stories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Quick Tab Selector list - 4 columns */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            <h3 className="text-xs font-mono font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-widest px-1">
              {language === 'bn' ? 'বাস্তব ঘটনা বিবরণী তালিকা:' : 'Select Case Manifest:'}
            </h3>

            {SUCCESS_STORIES.map((story) => {
              const isActive = story.id === activeStoryId;
              const sTrans = getStoryTranslations(story.id);
              const sTitle = sTrans ? sTrans.title : story.title;
              const sCategory = sTrans ? sTrans.category : story.category;
              const sChallenge = sTrans ? sTrans.challenge : story.challenge;

              return (
                <button
                  key={story.id}
                  onClick={() => setActiveStoryId(story.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer relative overflow-hidden flex flex-col gap-1 hover:brightness-110 ${
                    isActive 
                      ? 'bg-white dark:bg-[#1A2332] border-blue-600/30 ring-1 ring-blue-400/10 shadow-lg' 
                      : 'bg-white dark:bg-[#1A2332]/50 border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono tracking-wider text-orange-600 dark:text-orange-400 uppercase block mb-1">
                    {sCategory}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#1E293B] dark:text-white tracking-wide truncate">
                    {sTitle}
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 line-clamp-1 mt-1 font-sans">
                    {sChallenge}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Expanded case study data display panel - 8 columns */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 p-4 text-[10px] font-mono tracking-widest text-[#1E3A8A] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> {language === 'bn' ? 'যাচাইকৃত ঘটনার তথ্যবিবরণী' : 'VERIFIED CASE LOG'}
            </div>

            <div className="mb-6 rounded-xl overflow-hidden h-48 w-full border border-slate-200 dark:border-slate-800">
              <img 
                src={activeStory.image} 
                alt={title} 
                className="w-full h-full object-cover" 
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div>
              {/* Category, Title & Metrics Row */}
              <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800/80">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-2">
                  {category} {language === 'bn' ? 'সফলতার প্রতিবেদন' : 'Success Report'}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E293B] dark:text-white tracking-tight">
                  {title}
                </h3>

                {/* Metrics boxes inside the case study */}
                <div className="flex gap-4 mt-4 flex-wrap">
                  {metrics.map((metric, mi) => (
                    <div key={mi} className="px-4 py-2 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 font-sans">
                      <span className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase block tracking-wider">{metric.label}</span>
                      <strong className="text-sm text-[#1E3A8A] font-mono uppercase font-extrabold">{metric.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge vs Intervention vs Outcome Breakdown */}
              <div className="space-y-6 font-sans text-xs sm:text-sm pt-2">
                <div className="relative border-l-2 border-red-500/50 pl-4 py-0.5">
                  <h4 className="text-[10.5px] font-mono font-bold text-red-500 uppercase mb-1.5 tracking-wider">
                    {language === 'bn' ? 'সামাজিক-অর্থনৈতিক চ্যালেঞ্জ' : 'Socio-Economic Challenge'}
                  </h4>
                  <p className="text-[#334155] dark:text-slate-300 leading-relaxed font-sans">
                    {challenge}
                  </p>
                </div>

                <div className="relative border-l-2 border-blue-600/30 pl-4 py-0.5">
                  <h4 className="text-[10.5px] font-mono font-bold text-blue-600 uppercase mb-1.5 tracking-wider">
                    {language === 'bn' ? 'আমাদের গৃহীত পদক্ষেপ ও সমাধান' : 'Core Administered Intervention'}
                  </h4>
                  <p className="text-[#334155] dark:text-slate-300 leading-relaxed font-sans">
                    {intervention}
                  </p>
                </div>

                <div className="relative border-l-2 border-emerald-500/60 pl-4 py-0.5">
                  <h4 className="text-[10.5px] font-mono font-bold text-orange-600 dark:text-orange-400 uppercase mb-1.5 tracking-wider">
                    {language === 'bn' ? 'পরিমাপযোগ্য বাস্তব ফলাফল' : 'Measurable Human Outcome'}
                  </h4>
                  <p className="text-[#334155] dark:text-slate-300 leading-relaxed font-sans">
                    {outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote group */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#1A2332]/30 p-5 rounded-xl border border-slate-200 dark:border-slate-800/40 relative">
              <Quote className="absolute right-4 top-4 h-16 w-16 text-[#1E293B]/10 pointer-events-none select-none" />
              <p className="italic text-xs sm:text-sm text-[#0F172A] dark:text-slate-200 leading-relaxed font-sans">
                "{quote}"
              </p>
              <div className="mt-3.5 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-[#138808]" />
                </div>
                <span className="text-xs font-bold text-[#1E3A8A] tracking-wide block uppercase font-mono">
                  {author}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
