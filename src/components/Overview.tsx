import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CalendarRange, Landmark, MapPin, Eye, Award, CheckCircle } from 'lucide-react';
import { GEOGRAPHIC_FOCUS } from '../data';
import { useLanguage } from '../lib/LanguageContext';

export default function Overview() {
  const { t, language } = useLanguage();

  const regionText = language === 'bn' ? "পশ্চিমবঙ্গ এবং পূর্ব ভারত অঞ্চলের উপর দৃষ্টি" : GEOGRAPHIC_FOCUS.region;
  const descText = language === 'bn' ? "হুগলি ও হিন্দমোটরস্থ প্রধান কার্যালয় থেকে সম্পূর্ণ কাঠামোগত জবাবদিহিতা বজায় রেখে, আমরা উপশহর ও শহরতলি জুড়ে স্থানীয় নেটওয়ার্ক এবং সরাসরি খাদ্য বিতরণ হাবসমূহ পরিচালনা করছি।" : GEOGRAPHIC_FOCUS.description;
  const districtsText = language === 'bn' 
    ? ["হুগলি", "শ্রীরামপুর", "হিন্দমোটর", "কলকাতা বস্তি অঞ্চল", "সুন্দরবন সংলগ্ন সীমান্তবর্তী অঞ্চল"] 
    : GEOGRAPHIC_FOCUS.districts;

  return (
    <section id="overview" className="py-24 relative overflow-hidden">
      {/* Background visual cues */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-orange-600 dark:bg-orange-500/5 blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] px-3 py-1 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30">
            {language === 'bn' ? 'কার্যনির্বাহী সংক্ষিপ্ত বিবরণী' : 'EXECUTIVE OVERVIEW'}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {t('overview.title')}
          </h2>
          <p className="text-sm text-[#64748B] dark:text-slate-400 mt-4 max-w-xl mx-auto font-sans leading-relaxed">
            {t('overview.subtitle')}
          </p>
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story Box - 7 Column */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-panel p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-mono text-sm uppercase tracking-wider mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyan-500" />
                {language === 'bn' ? 'তৃণমূল স্তরের সহানুভূতি ও সেবা' : 'Rooted in Grassroots Compassion'}
              </div>
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#1E293B] dark:text-white leading-snug mb-6">
                {language === 'bn' 
                  ? '"এটি কেবল একটি আর্থিক ট্রাস্ট নয়, এটি জীবন পরিবর্তনের এক পরম দায়িত্ব।"' 
                  : '"Not just a Trust, a responsibility to change lives."'
                }
              </h3>
              <div className="space-y-4 text-[#334155] dark:text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                <p>
                  {language === 'bn'
                    ? <><strong>আমরা মানুষ ফাউন্ডেশন</strong> হলো একটি নিবন্ধিত সামাজিক কল্যাণকর প্রতিষ্ঠান, যা ক্ষুধামুক্তি, পদ্ধতিগত সামাজিক বৈষম্য পূরণ এবং টেকসই ও অডিটযোগ্য মানবিক প্রচেষ্টার মাধ্যমে সামগ্রিক সমাজ উন্নয়ন সাধনে প্রতিশ্রুতিবদ্ধ।</>
                    : <><strong>Amra Manush Foundation</strong> is a registered social impact organization committed to addressing hunger, systemic social inequality, and comprehensive community welfare through scalable, audited humanitarian efforts.</>
                  }
                </p>
                <p>
                  {language === 'bn'
                    ? 'আমরা অতি প্রান্তীয় এলাকায় গিয়ে অত্যন্ত অসহায় জনগোষ্ঠী, বিশেষ করে অনগ্রসর ও সুবিধাবঞ্চিত শিশু, পরিত্যক্ত প্রবীণ মানুষ, শারীরিক ও দৃষ্টি প্রতিবন্ধী এবং চরম আর্থিক সংকটে ভুগছে এমন পরিবারগুলিকে সহায়তা দিতে সরাসরি কাজ করি।'
                    : 'We operate at the core grassroots levels to support highly vulnerable populations, prioritizing underprivileged kids, neglected elders, persons with physical or visual challenges, and families trapped in severe socio-economic distress.'
                  }
                </p>
                <p>
                  {language === 'bn'
                    ? 'আমাদের কাঠামোগত কর্মসূচীগুলি কেবল সাময়িক সান্ত্বনা বা স্বল্পমেয়াদী ত্রাণ বিতরণের জন্য সীমাবদ্ধ নয়; বরং স্থানীয় জনগণকে সশক্ত করা, শিশু পুষ্টি নিশ্চিত করা, মানবাধিকার রক্ষা এবং সত্যিকারের টেকসই সমাজ গঠনে উৎসাহিত করা।'
                    : 'Our structural programs are engineered not merely to provide momentary comfort or short-term handouts, but to empower local stakeholders, champion child nutrition, support human rights, and generate clear, measurable community transformation.'
                  }
                </p>
              </div>
            </div>

            {/* Geographical Highlight tag */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="p-3 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 flex-shrink-0">
                <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left w-full">
                <h4 className="font-bold text-[#1E293B] dark:text-slate-100 text-sm tracking-wide sm:text-base">
                  {regionText}
                </h4>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 leading-normal">
                  {descText}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {districtsText.map((district, i) => (
                    <span key={i} className="text-[10px] font-medium font-mono px-2 py-0.5 rounded bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#334155] dark:text-slate-300">
                      • {district}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Profile & Timeline Credentials Box - 5 Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Incorporation details */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between flex-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-28 w-28 bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] rounded-bl-full pointer-events-none -z-10" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono tracking-widest text-[#1E3A8A] font-bold uppercase">
                    {language === 'bn' ? 'অফিসিয়াল সরকারী লাইসেন্স' : 'OFFICIAL STATE REGISTRATION'}
                  </span>
                  <Landmark className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                
                <h4 className="font-display font-semibold text-lg text-[#1E293B] dark:text-white mb-4">
                  Amra Manush Foundation
                </h4>

                <div className="space-y-3.5">
                  <div className="flex items-start justify-between text-xs border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'এমএসএমই উদয়ম নম্বর' : 'UDYAM Reg No'}</span>
                    <span className="font-mono font-bold text-[#0F172A] dark:text-white tracking-wide">UDYAM-WB-07-0130195</span>
                  </div>
                  <div className="flex items-start justify-between text-xs border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'নিবন্ধনের তারিখ' : 'Registration Date'}</span>
                    <span className="font-sans font-semibold text-orange-600 dark:text-orange-400">{language === 'bn' ? '১২ জুন ২০২৬' : '12 June 2026'}</span>
                  </div>
                  <div className="flex items-start justify-between text-xs border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'এন্টারপ্রাইজ শ্রেণীভুক্তকরণ' : 'Enterprise Classification'}</span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">{language === 'bn' ? 'ক্ষুদ্র সামাজিক প্রতিষ্ঠান' : 'Micro Enterprise'}</span>
                  </div>
                  <div className="flex items-start justify-between text-xs border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'কার্যক্রমের প্রকার' : 'Involvement Category'}</span>
                    <span className="text-[#0F172A] dark:text-white text-right">{language === 'bn' ? 'সামাজিক ও মানবিক সেবা' : 'Services & Humanitarian Action'}</span>
                  </div>
                  <div className="flex items-start justify-between text-xs">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'সামাজিক শ্রেণী' : 'Social Category'}</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-bold">{language === 'bn' ? 'তফসিলী জাতি (SC)' : 'Scheduled Caste (SC)'}</span>
                  </div>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-[#64748B] dark:text-slate-400 font-mono">
                <span>{language === 'bn' ? 'সেক্টর: জনসেবা কর্মকাণ্ড' : 'Enterprise Type: Services'}</span>
                <span className="flex items-center gap-1 text-[#138808] font-semibold uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#138808] animate-pulse" /> {language === 'bn' ? 'সক্রিয় নিবন্ধিত' : 'Active Standard'}
                </span>
              </div>
            </div>

            {/* Timelines and Core Foundations */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative group text-left">
              <h4 className="font-display font-semibold text-sm tracking-widest uppercase mb-4 text-[#334155] dark:text-slate-300">
                {language === 'bn' ? 'ভবিষ্যৎ কর্মপরিকল্পনা' : 'Strategic Horizons'}
              </h4>
              <div className="relative border-l border-slate-200 dark:border-slate-800/80 pl-4 py-2 space-y-6">
                
                {/* Milestone 1 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-cyan-500 ring-4 ring-white dark:ring-[#1E293B]" />
                  <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-semibold block uppercase">{language === 'bn' ? '১২ জুন ২০২৬' : '12 June 2026'}</span>
                  <h5 className="font-bold text-xs sm:text-sm text-[#1E293B] dark:text-white mt-0.5">{language === 'bn' ? 'প্রাতিষ্ঠানিক আত্মপ্রকাশ' : 'Foundational Incorporation'}</h5>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 leading-normal">
                    {language === 'bn'
                      ? 'হুগলি এবং আশেপাশের জেলাগুলিতে দৈনিক ক্ষুধা নিবারণ কার্যক্রম বৃদ্ধি করার জন্য ভারত সরকারের উদয়ম রেজিস্ট্রেশনের অধীনে আইনিভাবে নিবন্ধিত।'
                      : 'Legally established under UDYAM registry to scale daily hunger campaigns in Hooghly and neighboring tracts.'
                    }
                  </p>
                </div>
                
                {/* Milestone 2 */}
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#138808] ring-4 ring-white dark:ring-[#1E293B]" />
                  <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-semibold block uppercase">{language === 'bn' ? 'চতুর্থ ত্রৈমাসিক, ২০২৬ লক্ষ্যমাত্রা' : 'Quarter 4, 2026 Goals'}</span>
                  <h5 className="font-bold text-xs sm:text-sm text-[#1E293B] dark:text-white mt-0.5">{language === 'bn' ? 'আহার বিতরণ কেন্দ্রের সম্প্রসারণ' : 'Modular Meals Expansion'}</h5>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 leading-normal">
                    {language === 'bn'
                      ? 'খাবারের গুনমান ও তাপমাত্রা বজায় রাখার জন্য কাস্টমাইজড হট-কন্টেইনার সংযুক্ত করে প্রান্তীয় এলাকায় খাদ্য সরবরাহ আরও ৩০% বৃদ্ধি করা।'
                      : 'Fitted with advanced temperature containers, scaling Ekbelar Aahar deliveries by 30% inside marginalized suburbs.'
                    }
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
