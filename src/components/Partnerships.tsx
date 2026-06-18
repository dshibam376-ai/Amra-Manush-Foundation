import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Apple, Milestone, Building, Mail, Sparkles, Check, Send, CheckCircle2 } from 'lucide-react';
import { PARTNERSHIP_OPPORTUNITIES } from '../data';
import { useLanguage } from '../lib/LanguageContext';

export default function Partnerships() {
  const { language } = useLanguage();
  const [partnerType, setPartnerType] = useState('csr');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹2,00,000 - ₹5,00,000');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitReference, setSubmitReference] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />;
      case 'GraduationCap':
        return <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400" />;
      case 'Apple':
        return <Apple className="h-6 w-6 text-blue-500" />;
      case 'Milestone':
        return <Milestone className="h-6 w-6 text-teal-400" />;
      default:
        return <Building className="h-6 w-6 text-[#64748B] dark:text-slate-400" />;
    }
  };

  const toBnNo = (numStr: string) => {
    if (language !== 'bn') return numStr;
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    };
    return numStr.split('').map(char => map[char] || char).join('');
  };

  const getOpportunityTranslations = (id: string) => {
    if (language !== 'bn') return null;
    switch (id) {
      case 'csr':
        return {
          title: 'কাস্টমাইজড সিএসআর (CSR) প্রজেক্ট',
          description: 'আপনার কোম্পানির সামাজিক দায়বদ্ধতা (CSR) তহবিল আমাদের নির্ভরযোগ্য সমাজসেবামূলক অভিযানের সাথে যুক্ত করুন। আমরা জিও-ট্যাগযুক্ত প্রগ্রেস রিপোর্ট এবং স্বচ্ছ ৮০জি করমুক্ত সার্টিফিকেট প্রদান করি।',
          benefits: [
            'নির্দিষ্ট স্থান ও কর্মসূচি নির্বাচন',
            'লাইভ প্রগ্রেস ড্যাশবোর্ড অ্যাক্সেস',
            'ত্রৈমাসিক সামাজিক প্রভাব এবং স্থায়িত্ব মূল্যায়ন',
            'জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রার (SDGs) সাথে সরাসরি সামঞ্জস্য'
          ]
        };
      case 'employee-volunteer':
        return {
          title: 'কর্পোরেট স্বেচ্ছাসেবী রিট্রিট',
          description: 'আমাদের কেন্দ্রীয় রান্নাঘর, আহার বণ্টন শিবির বা সুবিধাবঞ্চিত শিশুদের মেধা শ্রেণীতে অংশ নিয়ে আপনার দলের সামাজিক সহমর্মিতা ও টিম বন্ডিং বৃদ্ধি করুন।',
          benefits: [
            'নিরাপদ ও সুশৃঙ্খল স্বেচ্ছাসেবী প্রোটোকল',
            'উচ্চ-মানের ফটো ও মিডিয়া রিক্যাপ কিট সরবরাহ',
            'সরাসরি সামাজিক খাবার বণ্টনে সশরীরে অংশগ্রহণ',
            'লিডারশিপ ডেভেলপমেন্ট এবং সামাজিক স্বেচ্ছাসেবী রিকগনিশন সার্টিফিকশন'
          ]
        };
      case 'meal-sponsor':
        return {
          title: 'স্থায়ী আহার পৃষ্ঠপোষকতা (Sponsorship)',
          description: 'আপনার কোম্পানির যেকোনো বিশেষ দিন বা প্রতিষ্ঠাবার্ষিকী উপলক্ষে সম্পূর্ণ কিচেন অপারেশনের দায়িত্ব নিন এবং ক্ষুধার্ত মানুষের আহার সুনিশ্চিত করুন।',
          benefits: [
            'আহার বণ্টনের দিন সরাসরি লাইভ ফটো ও আপডেট অ্যাক্সেস',
            'বিতরণ কেন্দ্র এবং ব্যানারে কোম্পানির ব্র্যান্ড বা শুভ কামনার সশ্রদ্ধ উল্লেখ',
            'সরাসরি অনন্য অন-ফিল্ড নিরীক্ষা আমন্ত্রণের সুবিধা',
            'পুষ্টিকর আহার খাদ্য উপাদানের বিস্তারিত কোয়ালিটি রিপোর্ট'
          ]
        };
      case 'community-dev':
        return {
          title: 'কৌশলগত সামাজিক কোলাবোরেশন',
          description: 'আমাদের সাথে অংশীদার হয়ে স্থায়ী সৌরবিদ্যুৎ চালিত সুপেয় পানির নলকূপ স্থাপন করুন অথবা স্বাস্থ্যসম্মত বায়ো-টয়লেট ও চিকিৎসা ক্যাম্প করুন।',
          benefits: [
            'স্থানীয় প্রশাসনের প্রয়োজনীয় যৌথ আইনি অনুমোদন সমন্বয়',
            'বিতরণ স্থানে স্থায়ী ব্র্যান্ড ফলক বা নেমপ্লেট বসানো',
            'দীর্ঘস্থায়ী ১০ বছরের রক্ষণাবেক্ষণ চুক্তি',
            'স্বচ্ছ থার্ড-পার্টি প্রকৌশলী এবং ব্যালেন্স শিট অডিট'
          ]
        };
      default:
        return null;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email) {
      alert(language === 'bn' ? "সিএসআর আবেদন জমা দিতে প্রয়োজনীয় ক্ষেত্রসমূহ পূরণ করুন।" : "Please fill in the required fields to submit your CSR proposal.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate professional pipeline processing
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `CSR-REF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmitReference(code);
      
      setCompanyName('');
      setContactName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="partnerships" className="py-24 border-t border-b border-slate-200 dark:border-slate-800/80 relative text-left">
      <div className="absolute top-24 left-10 w-96 h-96 bg-blue-600/5 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] px-3.5 py-1.5 rounded-full bg-blue-600/5 dark:bg-[#1E293B] border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            {language === 'bn' ? 'কর্পোরেট সামাজিক দায়বদ্ধতা' : 'CORPORATE SOCIAL RESPONSIBILITY'}
          </span>
          <h2 className="font-display font-bold text-3.5xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {language === 'bn' ? 'মহৎ উদ্দেশ্যে অংশীদারিত্ব – সিএসআর (CSR) কোলাবোরেশন' : 'Partner With Purpose – CSR Alliances'}
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-sans text-sm sm:text-base mt-3 leading-relaxed">
            {language === 'bn'
              ? 'আমরা দেশের শীর্ষস্থানীয় কর্পোরেট টিম এবং ট্রাস্টগুলির সাথে অংশীদার হয়ে হুগলি এবং হাওড়ার অনগ্রসর এলাকায় নিরীক্ষিত সামাজিক কাজগুলো সমাধান করি। আপনার সিএসআর লক্ষ্যসমূহ স্পর্শ করুন।'
              : 'We work with industry-leading corporate teams and family trusts to scale audited micro-projects in severe distress segments. Achieve measurable compliance goals.'
            }
          </p>
          <div className="h-1.5 w-16 bg-[#138808] mx-auto mt-6 rounded-full" />
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20">
          
          {/* Partnership Options List - 7 columns */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-xl text-[#1E293B] dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" /> 
              {language === 'bn' ? 'কৌশলগত সিএসআর (CSR) মাধ্যমসমূহ' : 'Strategic CSR Channels'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARTNERSHIP_OPPORTUNITIES.map((opp) => {
                const trans = getOpportunityTranslations(opp.id);
                const title = trans ? trans.title : opp.title;
                const description = trans ? trans.description : opp.description;
                const benefits = trans ? trans.benefits : opp.benefits;

                return (
                  <motion.div 
                    key={opp.id}
                    onClick={() => setPartnerType(opp.id)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className={`p-6 rounded-2xl glass-panel border hover:border-slate-700/80 transition-all duration-200 cursor-pointer text-left relative flex flex-col justify-between ${
                      partnerType === opp.id 
                        ? 'border-[#1E3A8A] bg-blue-50/10 dark:bg-slate-800' 
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-xl">
                          {getIcon(opp.icon)}
                        </div>
                        {partnerType === opp.id && (
                          <span className="text-[10px] font-mono font-bold bg-[#138808] text-white px-2 py-0.5 rounded uppercase">
                            {language === 'bn' ? 'নির্বাচিত' : 'Selected'}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display font-bold text-sm sm:text-base text-[#1E293B] dark:text-white mb-2">{title}</h4>
                      <p className="text-xs text-[#334155] dark:text-slate-300 leading-normal mb-4 font-sans">{description}</p>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-800/80 pt-3 mt-4 space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-widest block mb-2">
                        {language === 'bn' ? 'প্রধান সুবিধা ও ম্যাট্রিক্স সমূহ:' : 'Key Asset Deliverables:'}
                      </span>
                      {benefits.map((b, bi) => (
                        <div key={bi} className="flex items-start gap-1.5 text-xs text-[#334155] dark:text-slate-300">
                          <Check className="h-3.5 w-3.5 text-[#138808] mt-0.5 flex-shrink-0" />
                          <span className="leading-tight text-[#0F172A] dark:text-slate-200">{b}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CSR Contact Application Form - 5 columns */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-orange-600 uppercase tracking-widest font-extrabold mb-3">
                <Building className="h-4.5 w-4.5" /> {language === 'bn' ? 'সিএসআর আবেদন কেন্দ্র' : 'CSR Application Hub'}
              </div>
              
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E293B] dark:text-white mb-2">
                {language === 'bn' ? 'কর্পোরেট মেলবন্ধন শুরু করুন' : 'Initialize Corporate Alliance'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-sans leading-normal mb-6">
                {language === 'bn'
                  ? 'নিচের বিবরণীটি পূরণ করে আমাদের অডিট বা ফাইন্যান্স টিমের কাছ থেকে প্রত্যক্ষ করমুক্ত সিএসআর অংশীদারিত্বের রোডম্যাপ সংগ্রহ করুন।'
                  : 'Fill in the credentials below to request a detailed, tax-compliant CSR partnership roadmap from our audit board.'
                }
              </p>

              <AnimatePresence mode="wait">
                {!submitReference ? (
                  <motion.form key="csr-form" onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'কোম্পানি বা প্রতিষ্ঠানের নাম *' : 'Company Name *'}</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tata Steel"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] text-xs sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'সিএসআর কর্মকর্তার নাম *' : 'CSR Officer Name *'}</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Arindom Bose"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'ইমেইল এড্রেস *' : 'Email Address *'}</label>
                        <input
                          type="email"
                          required
                          placeholder="corporate@co.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'বার্ষিক সিএসআর বাজেট বা বরাদ্দ (রুপি)' : 'Planned Allocation Budget (Annual)'}</label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-slate-200 outline-none text-xs"
                      >
                        <option>₹৫0,000 - ₹২,00,000</option>
                        <option>₹২,00,000 - ₹৫,00,000</option>
                        <option>₹৫,00,000 - ₹১৫,00,000</option>
                        <option>₹১৫,00,000+ (Strategic Sponsoring)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'বিশেষ লক্ষ্যভুক্ত কর্মসূচী / প্রয়োজনীয়তা (ঐচ্ছিক)' : 'Special Directives / Target Programs (Optional)'}</label>
                      <textarea
                        rows={3}
                        placeholder={language === 'bn' ? 'নির্দিষ্ট স্থান, বিশেষ সুবিধাভোগী জনগোষ্ঠী বা নিরীক্ষার যেকোনো বিশেষ প্রয়োজন উল্লেখ করুন...' : 'Mention key locations, target demographics, or special audit requirements...'}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#1E3A8A] text-white font-bold rounded-lg shadow hover:bg-blue-800 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Building className="h-4 w-4 animate-bounce" /> {language === 'bn' ? 'তথ্য সুরক্ষিত করা হচ্ছে...' : 'Securing pipeline...'}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> {language === 'bn' ? 'প্রস্তাব জমা দিন' : 'Submit Proposal'}
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="csr-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-5 bg-orange-600 dark:bg-orange-500/10 border border-emerald-500/20 rounded-xl space-y-4 text-center text-xs"
                  >
                    <div className="mx-auto h-12 w-12 rounded-full bg-[#138808]/10 flex items-center justify-center border border-emerald-500/30">
                      <CheckCircle2 className="h-6 w-6 text-[#138808]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] dark:text-white text-sm">
                        {language === 'bn' ? 'আবেদনটি সফলভাবে জমা নেওয়া হয়েছে' : 'Proposal Successfully Cataloged'}
                      </h4>
                      <p className="text-[#334155] dark:text-slate-300 font-sans mt-1">
                        {language === 'bn'
                          ? 'আমাদের বিশেষ সিএসআর অডিট বিভাগ আপনার কাজের রূপরেখাটি নথিভুক্ত করেছে।'
                          : 'Our specialized fundraising compliance desk has locked in your application details.'
                        }
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-lg font-mono">
                      <span className="text-[10px] text-[#64748B] dark:text-slate-400 uppercase block tracking-wider">CSR LOCK_CODE</span>
                      <strong className="text-blue-600 dark:text-cyan-400 text-sm tracking-widest block mt-0.5">{submitReference}</strong>
                    </div>

                    <p className="text-[10px] text-[#64748B] dark:text-slate-400">
                      {language === 'bn'
                        ? 'আমাদের পরিচালন প্রতিনিধি অত্যন্ত দ্রুত আগামী ১২ কর্মঘণ্টার মধ্যে আপনার সাথে সরাসরি যোগাযোগ করবেন।'
                        : 'Our board representatives will reach out to schedule an interactive audit call within "12 working hours".'
                      }
                    </p>

                    <button
                      onClick={() => setSubmitReference(null)}
                      className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:text-blue-600 underline cursor-pointer"
                    >
                      {language === 'bn' ? 'পুনরায় আরেকটি প্রস্তাব পাঠান' : 'File another corporate request'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Note signature */}
            <div className="border-t border-slate-200 dark:border-slate-800/60 pt-4 mt-6 text-[10.5px] text-[#64748B] dark:text-slate-400 font-mono text-center">
              Registrar CSR Ref: Registered SC Services. Amra Manush.
            </div>
          </div>

          {/* End grid */}
        </div>

      </div>
    </section>
  );
}
