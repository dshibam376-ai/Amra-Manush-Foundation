import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Utensils, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Bookmark,
  Target
} from 'lucide-react';
import { STRATEGIC_PILLARS } from '../data';
import { useLanguage } from '../lib/LanguageContext';

export default function Pillars() {
  const { t, language } = useLanguage();
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);

  // Helper mapping icon string names directly to Lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="h-6 w-6 text-orange-600 dark:text-orange-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="h-6 w-6 text-[#10b981]" />;
      case 'Users':
        return <Users className="h-6 w-6 text-blue-500" />;
      case 'Sparkles':
        return <Sparkles className="h-6 w-6 text-orange-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-6 w-6 text-pink-500" />;
      case 'Activity':
        return <Activity className="h-6 w-6 text-teal-500" />;
      default:
        return <HelpCircle className="h-6 w-6 text-[#64748B] dark:text-slate-400" />;
    }
  };

  const toBnNo = (numStr: string) => {
    if (language !== 'bn') return numStr;
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      ',': ',', '+': '+', '%': '%'
    };
    return numStr.split('').map(char => map[char] || char).join('');
  };

  const getPillarTranslations = (pillarId: string) => {
    if (language !== 'bn') return null;
    switch (pillarId) {
      case 'food':
        return {
          title: t('pillars.food_title'),
          beneficiaryFocus: 'গৃহহীন ব্যক্তি, বস্তির অভাবী শিশু, নিরাশ্রয় পরিত্যক্ত প্রবীণ নাগরিক।',
          objectives: [
            'অসহায় এবং সুবিধাবঞ্চিত ক্ষুধার্ত মানুষদের জন্য স্থায়ী খাবারের ব্যবস্থা করা।',
            'নিয়মিত রান্না করা গরম এবং পুষ্টিকর সুষম খাবার পরিবেশন সুনিশ্চিত করা।',
            'চরম জরুরি দুর্যোগ পরিস্থিতিতে নির্ভরযোগ্য খাদ্য সরবরাহ ব্যবস্থা গড়ে তোলা।'
          ],
          impactGoals: [
            '২০২৮ সালের মধ্যে বার্ষিক ৫০,০০০ পুষ্টিকর আহার বিতরণ করা।',
            'দুইটি উত্তর-হুগলি কিচেন হাব গড়ে তোলা।'
          ]
        };
      case 'children':
        return {
          title: t('pillars.child_title'),
          beneficiaryFocus: 'বস্তির শিশু, পুনর্বাসনপ্রাপ্ত শিশুশ্রমিক এবং প্রান্তিক ইটভাটা শ্রমিক পরিবারসমূহ।',
          objectives: [
            'নিয়মিত স্বাস্থ্য ও পুষ্টি পর্যবেক্ষণের মাধ্যমে শৈশবকালীন অপুষ্টি রোধ করা।',
            'বিনামূল্যে প্রাথমিক শিক্ষা এবং প্রয়োজনীয় বই-খাতা, জুতো ও ব্যাগ স্পন্সর করা।',
            'শিশুদের জন্য নিরাপদ অঞ্চল ও মানসিকভাবে সহায়ক যত্ন কেন্দ্র গড়ে তোলা।'
          ],
          impactGoals: [
            '১৫০ জন সুবিধাবঞ্চিত শিশুকে আনুষ্ঠানিক শিক্ষা ব্যবস্থার সাথে সংযুক্ত করা।',
            'প্রতি মাসে ২৫০ জন গ্রামীণ দরিদ্র মাকে পুষ্টি সহায়তা প্রদান করা।'
          ]
        };
      case 'community':
        return {
          title: t('pillars.comm_title'),
          beneficiaryFocus: 'অল্পশিক্ষিত বেকার যুবক, প্রান্তিক ও অনগ্রসর শ্রেণীর নাগরিকগণ।',
          objectives: [
            'বিশুদ্ধ পানীয় জল পরিকাঠামো এবং মৌলিক স্বাস্থ্য ক্যাম্প ও শৌচাগার স্থাপন করা।',
            'স্থানীয় বেকার ও অভাবী যুবকদের জন্য ডিজিটাল দক্ষতা ও বৃত্তিমূলক প্রশিক্ষণ দেওয়া।',
            'सरकारी সামাজিক পেনশন ও কল্যাণ প্রকল্প সম্পর্কে সচেতনতা ছড়ানো।'
          ],
          impactGoals: [
            '১০০ জন যুবক-যুবতীকে হস্তশিল্প ও বিভিন্ন কর্মমুখী কাজে প্রশিক্ষিত করা।',
            '২টি পিছিয়ে পড়া প্রত্যন্ত অঞ্চলে পাইপলাইনের মাধ্যমে বিশুদ্ধ পানীয় জল পৌঁছে দেওয়া।'
          ]
        };
      case 'disability':
        return {
          title: t('pillars.dis_title'),
          beneficiaryFocus: 'শারীরিক ও দৃষ্টি প্রতিবন্ধী যুবক এবং মেরুদণ্ডের সমস্যায় ভুগছেন এমন দরিদ্র রোগী।',
          objectives: [
            'কৃত্রিম অঙ্গ, থেরাপিউটিক ট্রাইসাইকেল এবং কাস্টমাইজড হুইলচেয়ার প্রদান করা।',
            'বিশেষ ক্ষমতাসম্পন্ন শিশুদের জন্য মানসিক ও সৃজনশীল ক্লাসরুম গড়ে তোলা।',
            'প্রতিবন্ধী ব্যক্তিদের স্বনির্ভর ও উৎপাদনশীল কাজের জন্য কর্মমুখী ক্যাম্প খোলা।'
          ],
          impactGoals: [
            '৫০ জন অপেক্ষমান প্রতিবন্ধী ব্যক্তিকে অতিপ্রয়োজনীয় চলাফেরার সরঞ্জাম দেওয়া।',
            'বিনামূল্যে পুনর্বাসনমূলক থেরাপি এবং চিকিৎসা সহায়তা প্রদান করা।'
          ]
        };
      case 'elderly':
        return {
          title: t('pillars.eld_title'),
          beneficiaryFocus: 'অভাবী, পরিবারহীন পরিত্যক্ত প্রবীণ নাগরিক যারা একা জীবনযাপন করছেন।',
          objectives: [
            'বিনামূল্যে ফিজিওথেরাপি ও আধুনিক ডায়াগনস্টিক স্বাস্থ্য শিবির পরিচালনা করা।',
            'দীর্ঘস্থায়ী রোগে আক্রান্তদের প্রতি মাসে বিনামূল্যে লাইফ-সেভিং ওষুধ সরবরাহ করা।',
            'প্রবীণদের একাকীত্ব দূর করতে মানসিক কাউন্সেলিং ও ভালোবাসার সমাজ গড়ে তোলা।'
          ],
          impactGoals: [
            '৮০ জন অসহায় প্রবীণকে নিরবচ্ছিন্ন জীবনদায়ী প্রয়োজনীয় ওষুধ সরবরাহ করা।',
            'বার্ধক্যজনিত চিকিৎসা সহায়তার জন্য একটি আধুনিক ডে-কেয়ার আশ্রয় কেন্দ্র নির্মাণ।'
          ]
        };
      case 'volunteering':
        return {
          title: t('pillars.vol_title'),
          beneficiaryFocus: 'কলেজ শিক্ষক ও শিক্ষার্থী, কর্পোরেট পেশাজীবী, প্রত্যন্ত অঞ্চলের সাহসী যুব নেত্রীবৃন্দ।',
          objectives: [
            'দুর্যোগ ব্যবস্থাপনা ও উদ্ধারকাজে স্থানীয় যুব স্বেচ্ছাসেবকদের আধুনিক প্রশিক্ষণ দেওয়া।',
            'শহর ও গ্রাম এলাকায় পরিচ্ছন্নতা অভিযান এবং সেন্ট্রাল কিচেন পরিচালনায় সচল রাখা।',
            'সামাজিক নেতৃত্ব বিকাশের জন্য সার্টিফিকেট-যুক্ত প্রশিক্ষণ কর্মশালা রাখা।'
          ],
          impactGoals: [
            '১৫০ জন সক্রিয় যুব স্বেচ্ছাসেবকদের একটি শক্তিশালী রিজার্ভ ফোর্স গঠন করা।',
            '৫টি শীর্ষস্থানীয় বিশ্ববিদ্যালয়কে আমাদের সামাজিক কর্মকাণ্ডের সাথে সংযুক্ত করা।'
          ]
        };
      default:
        return null;
    }
  };

  return (
    <section id="pillars" className="py-24 border-t border-b border-slate-200 dark:border-slate-800/80 relative">
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3.5xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] px-3 py-1 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            {language === 'bn' ? 'আমাদের কৌশলগত মূল স্তম্ভসমূহ' : 'STRATEGIC PILLARS'}
          </span>
          <h2 className="font-display font-bold text-3.5xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {t('pillars.title')}
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-sans text-sm sm:text-base mt-3 leading-relaxed">
            {t('pillars.subtitle')}
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRATEGIC_PILLARS.map((pillar) => {
            const isExpanded = selectedPillarId === pillar.id;
            const trans = getPillarTranslations(pillar.id);
            const title = trans ? trans.title : pillar.title;
            const beneficiaryFocus = trans ? trans.beneficiaryFocus : pillar.beneficiaryFocus;
            const objectives = trans ? trans.objectives : pillar.objectives;
            const impactGoals = trans ? trans.impactGoals : pillar.impactGoals;

            return (
              <motion.div 
                key={pillar.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className={`glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 shadow-xl flex flex-col justify-between relative overflow-hidden group ${
                  isExpanded ? 'border-[#1E3A8A]/30 ring-1 ring-blue-500/20' : ''
                }`}
              >
                {/* Decorative background number */}
                <div className="absolute -bottom-6 -right-2 text-[100px] font-display font-extrabold text-[#1E293B]/10 select-none pointer-events-none group-hover:text-[#1E293B]/20 transition-all">
                  {pillar.tag[0]}
                </div>

                <div>
                  {/* Pillar top row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-blue-600/5 dark:bg-cyan-400/10 px-2 py-0.5 rounded border border-blue-600/20 dark:border-cyan-400/30">
                      {pillar.tag}
                    </span>
                    <div className="p-2 ml-4 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 flex-shrink-0">
                      {getIcon(pillar.icon)}
                    </div>
                  </div>

                  {/* Title & Beneficiary info */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E293B] dark:text-white group-hover:text-blue-600 dark:text-cyan-400 transition-colors">
                    {title}
                  </h3>
                  
                  <div className="mt-2 text-2xs font-mono text-[#64748B] dark:text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Bookmark className="h-3 w-3 text-orange-600 dark:text-orange-400" /> {language === 'bn' ? 'মূল লক্ষ্য:' : 'Focus:'} {beneficiaryFocus}
                  </div>

                  {/* Program Objectives */}
                  <div className="mt-5 space-y-2 text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed font-sans text-left">
                    <h4 className="text-[11px] font-mono font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider mb-2.5">{language === 'bn' ? 'প্রধান লক্ষ্যসমূহ:' : 'Core Objectives:'}</h4>
                    {objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#138808] mt-1.5 flex-shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable detailed goal sets for investor visibility */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3"
                      >
                        <h4 className="text-[11px] font-mono font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Target className="h-3 w-3 text-orange-600 dark:text-orange-400" /> {language === 'bn' ? 'পরিমাপযোগ্য মাইলফলক' : 'Measurable Milestones'}
                        </h4>
                        <div className="space-y-1.5 text-xs text-blue-600 dark:text-cyan-400/90 leading-relaxed font-sans text-left">
                          {impactGoals.map((g, gi) => (
                            <p key={gi} className="flex items-start gap-1">
                              <span>✓</span> <span className="text-[#334155] dark:text-slate-300">{toBnNo(g)}</span>
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom button trigger */}
                <button
                  onClick={() => setSelectedPillarId(isExpanded ? null : pillar.id)}
                  className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 w-full text-left text-xs font-mono font-semibold text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white flex items-center justify-between group/btn cursor-pointer"
                >
                  <span>{isExpanded ? (language === 'bn' ? 'রোডম্যাপ বন্ধ করুন' : 'Hide Milestone Roadmap') : (language === 'bn' ? 'অগ্রগতি লক্ষ্যমাত্রা জানুন' : 'Review Targeted Deliverables')}</span>
                  <ChevronRight className={`h-4 w-4 text-orange-600 dark:text-orange-400 transform transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'
                  }`} />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
