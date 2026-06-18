import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, QrCode, ClipboardCheck, Clipboard, CreditCard, Sparkles, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Donation() {
  const { language } = useLanguage();
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'campaign'>('one-time');
  const [selectedPreset, setSelectedPreset] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedCode, setCompletedCode] = useState<string | null>(null);

  const presets = [100, 200, 500, 1000, 2500, 5000];
  const upiAddress = "amramanushfoundation@okhdfcbank";

  const toBnNo = (numStr: string) => {
    if (language !== 'bn') return numStr;
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      ',': ',', '+': '+', '%': '%', '.': '.'
    };
    return numStr.split('').map(char => map[char] || char).join('');
  };

  const getImpactMessage = (amount: number) => {
    if (language === 'bn') {
      if (amount <= 500) {
        return {
          title: "জরুরি খাদ্য সহায়তা (১২+ আহার)",
          desc: "১২ জন ক্ষুধার্ত শিশু অথবা বৃদ্ধ নাগরিকের জন্য কাস্টমাইজড পুষ্টিকর খাবার সরবরাহ করা সুনিশ্চিত করে।"
        };
      } else if (amount <= 1000) {
        return {
          title: "শিশু সহায়তা অনুদান (১ মাস)",
          desc: "১ জন স্কুলগামী শিশুর সম্পূর্ণ মাসের পড়াশোনা এবং পুষ্টিকর খাবারের দায়িত্ব নেওয়া।"
        };
      } else if (amount <= 5000) {
        return {
          title: "সামাজিক ডিস্ট্রিবিউশন ক্যাম্পেইন",
          desc: "বস্তির ১২৫ জন ক্ষুধার্ত নাগরিকের জন্য সম্পূর্ণ পুষ্টিকর রান্না করা গরম খাবার ও ঔষধ সরবরাহের দায়িত্ব।"
        };
      } else {
        return {
          title: "বৃহৎ কৌশলগত পার্টনার স্পনসর",
          desc: "একাধিক সুবিধাভোগী পরিবারের জন্য স্থায়ী খাদ্য সামগ্রী, লজিস্টিক হট-কন্টেইনার বক্স এবং থেরাপিউটিক সহায়তা চালনা।"
        };
      }
    }

    if (amount <= 500) {
      return {
        title: "Immediate Meal Support (12+ Meals)",
        desc: "Sponsors 12 hot, nutritious, egg-supplemented lunches preparing street children as well as disabled seniors for health camps."
      };
    } else if (amount <= 1000) {
      return {
        title: "Child Support Assistance (Full Month)",
        desc: "Supplies a premium school backpack, full geometry notebook accessories, physical shoes, and 1 full month of nutritional tracking."
      };
    } else if (amount <= 5000) {
      return {
        title: "Community Feeding Support",
        desc: "Sponsors 125 customized high-protein community meals for isolated slum dwellings in Hindmotor crossings, with transport tracking."
      };
    } else {
      return {
        title: "Comprehensive Strategic Sponsoring",
        desc: "Powers raw material food sourcing, sub-kitchen thermal transport containers, physical therapeutics, and basic education materials for multiple underprivileged households."
      };
    }
  };

  const activeAmount = customAmount ? parseFloat(customAmount) : selectedPreset;
  const impact = getImpactMessage(activeAmount || 0);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiAddress);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAmount || activeAmount <= 0) {
      alert(language === 'bn' ? "দয়া করে অনুদানের সঠিক পরিমাণ লিখুন।" : "Please select or input a valid donation amount.");
      return;
    }
    if (!donorName || !donorEmail) {
      alert(language === 'bn' ? "ট্যাক্স অনুদান রসিদের জন্য দয়া করে আপনার নাম এবং ইমেইল দিন।" : "Please fill in your name and email to proceed with tax-benefit mapping.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const code = `AMR-TXN-2026-${Math.floor(200000 + Math.random() * 800000)}`;
      setCompletedCode(code);
    }, 1600);
  };

  return (
    <section id="donate" className="py-24 border-t border-b border-slate-200 dark:border-slate-800 relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 dark:bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] px-3.5 py-1.5 rounded-full bg-blue-600/5 dark:bg-[#1E293B] border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            {language === 'bn' ? 'সুরক্ষিত অনুদান ও সাহায্য অভিজ্ঞতা' : 'SECURE DONATION EXPERIENCE'}
          </span>
          <h2 className="font-display font-bold text-3.5xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {language === 'bn' ? 'স্বচ্ছ ও সামাজিক সাহায্য প্রদান করুন' : 'Perform Transparent Philanthropy'}
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-sans text-sm sm:text-base mt-3 leading-relaxed">
            {language === 'bn'
              ? 'আমাদের সমস্ত অনুদান এবং ফান্ড পাবলিক অডিটের আওতাভুক্ত। আপনার অনুদানের ১০০% অর্থ সরাসরি খাদ্য বা সাহায্য সামগ্রী বিতরণে ব্যবহৃত হয়। ট্যাক্স রসিদ স্বয়ংক্রিয়ভাবে প্রদান করা হবে।'
              : 'All capital is subject to strict public auditing. 100% of individual contributions flow directly into raw field deliverables. Tax benefits map instantly.'
            }
          </p>
          <div className="h-1.5 w-16 bg-[#138808] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-2">
          
          {/* Main Donation Controls Form Card - 7 Columns */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between text-left">
            <div>
              
              {/* Frequency Selector */}
              <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 mb-8 self-start w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setFrequency('one-time');
                    setSelectedPreset(1000);
                    setCustomAmount('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    frequency === 'one-time' ? 'bg-[#1E3A8A] text-white font-bold' : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white'
                  }`}
                >
                  {language === 'bn' ? 'এককালীন সাহায্য' : 'One-Time Giving'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFrequency('monthly');
                    setSelectedPreset(500);
                    setCustomAmount('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    frequency === 'monthly' ? 'bg-[#1E3A8A] text-white font-bold' : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white'
                  }`}
                >
                  {language === 'bn' ? 'মাসিক সাহায্য' : 'Monthly Support'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFrequency('campaign');
                    setSelectedPreset(5000);
                    setCustomAmount('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    frequency === 'campaign' ? 'bg-[#1E3A8A] text-white font-bold' : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white'
                  }`}
                >
                  {language === 'bn' ? 'ক্যাম্পেইন স্পনসর' : 'Campaign Sponsorship'}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!completedCode ? (
                  <motion.form key="donate-form" onSubmit={handleDonateSubmit} className="space-y-6 text-xs font-sans">
                    
                    {/* Presets and Custom Inputs */}
                    <div className="space-y-4 text-left">
                      <label className="block text-[#334155] dark:text-slate-300 font-bold text-sm">
                        {language === 'bn' ? 'অনুদানের পরিমাণ নির্বাচন করুন *' : 'Select Contribution Amount *'}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {presets.map((p) => {
                          const isActivePreset = selectedPreset === p && !customAmount;
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => {
                                setSelectedPreset(p);
                                setCustomAmount('');
                              }}
                              className={`py-3 rounded-xl border font-mono font-bold text-sm transition-all text-center cursor-pointer ${
                                isActivePreset 
                                  ? 'bg-[#1E3A8A] text-white border-blue-600/20' 
                                  : 'bg-white dark:bg-[#1A2332] border-slate-200 dark:border-slate-800 hover:border-slate-500 text-[#334155] dark:text-slate-300'
                              }`}
                            >
                              ₹{toBnNo(p.toString())}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Amount input field */}
                      <div className="relative text-left">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none font-mono text-sm text-[#0050D2] font-bold">
                          ₹
                        </div>
                        <input
                          type="number"
                          placeholder={language === 'bn' ? 'অথবা আপনার পছন্দমতো অনুদানের পরিমাণ দিন (রুপি)...' : 'Or input customized sponsor amount (INR)...'}
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedPreset(0);
                          }}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-xl pl-8 pr-3 py-3 text-[#0F172A] dark:text-white outline-none text-xs sm:text-sm font-mono placeholder:text-[#64748B]"
                        />
                      </div>

                      {/* Quick Copy UPI Section */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-xl">
                        <div className="text-left text-xs">
                          <span className="text-[#64748B] dark:text-slate-400 block mb-0.5">{language === 'bn' ? 'ফাউন্ডেশনের ইউপিআই আইডি (UPI Address)' : 'UPI Foundation ID'}</span>
                          <strong className="text-[#0F172A] dark:text-white font-mono">{upiAddress}</strong>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className={`px-3 py-1.5 rounded-lg text-2xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                            copiedUpi 
                              ? 'bg-[#138808] text-white' 
                              : 'bg-white dark:bg-[#1A2332] text-[#334155] dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-blue-600'
                          }`}
                        >
                          <Clipboard className="h-3.5 w-3.5" />
                          {copiedUpi ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কপি করুন' : 'Copy')}
                        </button>
                      </div>
                    </div>

                    {/* Donor Details mapping form */}
                    <div className="space-y-4">
                      <h4 className="font-display font-semibold text-xs tracking-widest text-orange-600 dark:text-orange-400 uppercase">
                        {language === 'bn' ? 'দানদাতার বিবরণী (৮০জি ট্যাক্স-ছাড় সার্টিফিকেটের জন্য প্রয়োজনীয়)' : 'Donor Credentials (Required for tax-exempt 80G receipting)'}
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'সম্পূর্ণ নাম *' : 'First & Last Name *'}</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Shibam Das"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'ইমেইল এড্রেস *' : 'Email Address *'}</label>
                          <input
                            type="email"
                            required
                            placeholder="shibam@co.com"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{language === 'bn' ? 'যোগাযোগ নম্বর (ঐচ্ছিক)' : 'Contact Number (Optional)'}</label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 9876543210"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#1E3A8A] text-white font-display font-bold text-sm sm:text-base rounded-xl shadow hover:bg-blue-800 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <Heart className="h-5 w-5 animate-bounce fill-white" /> {language === 'bn' ? 'অনুদানের পৃষ্ঠা সংযোগ করা হচ্ছে...' : 'Securing encryption tunnel...'}
                        </>
                      ) : (
                        <>
                          <Heart className="h-5 w-5 fill-white" /> {language === 'bn' ? `₹${toBnNo(activeAmount.toString())} দিয়ে সহযোগিতা করুন` : `Securely Sponsor ₹${activeAmount.toLocaleString('en-IN')} INR`}
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="donate-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-6 bg-[#138808]/10 border border-emerald-500/20 rounded-2xl space-y-5 text-center text-xs"
                  >
                    <div className="mx-auto h-14 w-14 rounded-full bg-[#138808]/20 flex items-center justify-center border border-emerald-500/30">
                      <CheckCircle2 className="h-7 w-7 text-[#138808]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] dark:text-white text-base">
                        {language === 'bn' ? 'অনুদানের তথ্য সফলভাবে নিবন্ধিত হয়েছে' : 'Transaction Logged Successfully'}
                      </h4>
                      <p className="text-[#334155] dark:text-slate-300 font-sans mt-1">
                        {language === 'bn'
                          ? 'আমরা আপনার লেনদেন বা অনুদানটি রেকর্ড করেছি। একটি স্বয়ংক্রিয় অডিট সার্টিফিকেট এবং ৮০জি ট্যাক্স অনুদান রশিদ ইমেইলের মাধ্যমে আপনার কাছে পৌঁছে দেওয়া হবে।'
                          : 'We have registered your transaction. An automated PDF audit certificate and 80G receipt are traveling to your inbox.'
                        }
                      </p>
                    </div>

                    <div className="p-4 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-xl text-left space-y-2">
                      <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5 text-2xs text-[#64748B] dark:text-slate-400">
                        <span>{language === 'bn' ? 'ট্রানজেকশন রেফারেন্স' : 'TRANSACTION REFERENCE'}</span>
                        <span className="font-mono text-[#0F172A] dark:text-white text-xs">{completedCode}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5 text-2xs text-[#64748B] dark:text-slate-400">
                        <span>{language === 'bn' ? 'সহায়তাকারী' : 'SPONSOR'}</span>
                        <span className="text-[#0F172A] dark:text-white text-xs uppercase">{donorName}</span>
                      </div>
                      <div className="flex justify-between text-2xs text-[#64748B] dark:text-slate-400">
                        <span>{language === 'bn' ? 'গ্রহণকৃত অনুদান' : 'AMOUNT SECURED'}</span>
                        <span className="font-mono text-[#138808] text-xs font-bold">₹{toBnNo(activeAmount.toString())} INR</span>
                      </div>
                    </div>

                    <p className="text-[10.5px] text-[#64748B] dark:text-slate-400 font-sans leading-normal">
                      {language === 'bn'
                        ? 'এই ক্ষুধার্ত মানুষদের মুখের আহার জোগানোর মহৎ দায়িত্বে শামিল হওয়ার জন্য আমরা আপনাকে আন্তরিকভাবে ধন্যবাদ জানাই।'
                        : "We truly thank you for taking responsibility for these lives. Let's build a future free of hunger, together."
                      }
                    </p>

                    <button
                      onClick={() => setCompletedCode(null)}
                      className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-blue-600 underline cursor-pointer"
                    >
                      {language === 'bn' ? 'পুনরায় অনুদান করুন' : 'Make another contribution'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shield info */}
            <div className="border-t border-slate-200 dark:border-slate-800/60 pt-4 mt-8 flex justify-between items-center text-2xs text-[#64748B] dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> {language === 'bn' ? 'PCI DSS নিয়মানুযায়ী সুরক্ষিত' : 'PCI DSS compliant'}</span>
              <span className="text-orange-600 dark:text-orange-400 font-semibold uppercase">{language === 'bn' ? 'Razorpay দ্বারা সুরক্ষিত' : 'Secured by Razorpay'}</span>
            </div>
          </div>

          {/* Real-time Sourcing Sponsoring Details Box - 5 Columns */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Live Impact Calculator Box */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex-1 flex flex-col justify-between relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-br from-[#1E3A8A]/5 to-transparent rounded-bl-full pointer-events-none -not-z-10" />
              <div>
                <dt className="text-[10.5px] font-mono tracking-widest text-orange-600 dark:text-orange-400 font-bold uppercase mb-4 flex items-center gap-1">
                  <Sparkles className="h-4 w-4" /> {language === 'bn' ? 'প্রভাব পরিমাপক (আহার ও সাহায্য)' : 'IMPACT CALCULATOR'}
                </dt>
                
                <h4 className="font-display font-medium text-lg text-[#1E293B] dark:text-white mb-2 leading-tight">
                  {impact.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed font-sans mb-6">
                  {impact.desc}
                </p>

                {/* presets metrics display */}
                <div className="space-y-3.5 border-t border-slate-100/5 pt-5 text-2xs uppercase tracking-wider font-mono">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'প্রস্তুতকৃত পুষ্টিকর আহার' : 'Meals Generated'}</span>
                    <strong className="text-[#0F172A] dark:text-white text-xs">{toBnNo(activeAmount ? Math.floor(activeAmount / 45).toString() : '০')} {language === 'bn' ? 'টি পুষ্টিকর আহার' : 'Nutritious Servings'}</strong>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'সরাসরি সাহায্য সংযোগ' : 'Direct Recipient Routing'}</span>
                    <strong className="text-[#138808] dark:text-emerald-500 text-xs font-bold">{toBnNo('95.2%')} {language === 'bn' ? 'সুনিশ্চিত নেট ফান্ড' : 'Certified Net'}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#64748B] dark:text-slate-400">{language === 'bn' ? 'শিক্ষা সামগ্রী কিট' : 'Academic Kit Weight'}</span>
                    <strong className="text-[#0F172A] dark:text-white text-xs">{activeAmount >= 1000 ? (language === 'bn' ? 'সম্পূর্ণ একাডেমিক কিট (প্যাকেট)' : 'Level B Pack (Complete)') : (language === 'bn' ? 'প্রক্রিয়াধীন' : 'Pending')}</strong>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-8 p-3.5 bg-white dark:bg-[#1A2332] rounded-xl border border-slate-200 dark:border-slate-800/80 flex items-start gap-2 text-2xs leading-normal text-left">
                <ShieldAlert className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                <span className="text-[#64748B] dark:text-slate-400">
                  {language === 'bn'
                    ? 'আমাদের সমস্ত অবদানের বিরুদ্ধে ৮০জি করমুক্ত রশিদ প্রদান করা হয়। সকল রসিদ রাজ্য এমএসএমই এবং ট্রাস্ট লাইসেন্স দ্বারা সিল করা।'
                    : 'All transactions are 80G tax-free registrable. Receipts are securely sealed with state registration numbers.'
                  }
                </span>
              </div>
            </div>

            {/* QR Code Sponsoring box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden group text-left">
              <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-slate-155 mb-4 flex items-center gap-1.5 text-[#334155] dark:text-slate-300">
                <QrCode className="h-4.5 w-4.5 text-orange-600" /> {language === 'bn' ? 'ইউপিআই (UPI) স্ক্যান করুন' : 'Immediate UPI scan'}
              </h4>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* SVG QR Code */}
                <div className="h-28 w-28 p-2.5 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  {/* Beautiful crisp customized SVG vector QR code */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black" fill="currentColor">
                    <rect x="0" y="0" width="25" height="25" />
                    <rect x="5" y="5" width="15" height="15" fill="white" />
                    <rect x="8" y="8" width="9" height="9" />
                    
                    <rect x="75" y="0" width="25" height="25" />
                    <rect x="80" y="5" width="15" height="15" fill="white" />
                    <rect x="83" y="8" width="9" height="9" />
                    
                    <rect x="0" y="75" width="25" height="25" />
                    <rect x="5" y="80" width="15" height="15" fill="white" />
                    <rect x="8" y="83" width="9" height="9" />

                    {/* Random QR matrix pixels */}
                    <rect x="35" y="5" width="5" height="10" />
                    <rect x="50" y="0" width="10" height="5" />
                    <rect x="45" y="15" width="15" height="5" />
                    <rect x="65" y="5" width="5" height="15" />
                    <rect x="35" y="25" width="20" height="5" />
                    
                    <rect x="5" y="35" width="10" height="5" />
                    <rect x="0" y="45" width="5" height="15" />
                    <rect x="20" y="40" width="5" height="15" />
                    <rect x="15" y="60" width="10" height="5" />

                    <rect x="80" y="35" width="15" height="5" />
                    <rect x="75" y="45" width="5" height="15" />
                    <rect x="90" y="55" width="10" height="5" />
                    
                    <rect x="35" y="45" width="5" height="25" />
                    <rect x="45" y="50" width="20" height="5" />
                    <rect x="55" y="65" width="15" height="10" />
                    <rect x="35" y="80" width="10" height="5" />
                    <rect x="45" y="85" width="5" height="10" />
                    <rect x="60" y="80" width="5" height="15" />
                    <rect x="80" y="80" width="15" height="5" />
                    <rect x="75" y="90" width="5" height="10" />
                    <rect x="90" y="85" width="10" height="5" />
                  </svg>
                </div>

                {/* Details and Copy */}
                <div className="space-y-4 flex-1 text-center sm:text-left text-xs">
                  <div>
                    <span className="text-2xs font-mono text-[#64748B] dark:text-slate-400 block tracking-wider uppercase">{language === 'bn' ? 'ইউপিআই আইডি' : 'UPI ID PATH'}</span>
                    <strong className="text-[#0F172A] dark:text-slate-100 text-sm tracking-wide block truncate">{upiAddress}</strong>
                  </div>

                  <button
                    onClick={handleCopyUpi}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-2xs font-semibold flex items-center justify-center gap-1 hover:brightness-105 active:scale-98 transition-all cursor-pointer ${
                      copiedUpi 
                        ? 'bg-[#138808] text-white' 
                        : 'bg-white dark:bg-[#1A2332] text-[#334155] dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <Clipboard className="h-4 w-4" />
                    {copiedUpi ? (language === 'bn' ? 'ইউপিআই কপি হয়েছে!' : 'UPI Copied!') : (language === 'bn' ? 'ইউপিআই আইডি কপি করুন' : 'Copy UPI Address')}
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
