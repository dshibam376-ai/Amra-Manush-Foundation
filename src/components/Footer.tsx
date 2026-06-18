import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, ExternalLink, ShieldAlert, Award, FileText, Instagram, Facebook, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../lib/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toBnNo = (numStr: string) => {
    if (language !== 'bn') return numStr;
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    };
    return numStr.split('').map(char => map[char] || char).join('');
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email) {
      setStatus('error');
      setErrorMessage(language === 'bn' ? 'অনুগ্রহ করে একটি ইমেল লিখুন' : 'Please enter an email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage(language === 'bn' ? 'অমান্য ইমেল ফরম্যাট' : 'Invalid email format');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-16 text-[#334155] dark:text-slate-200 relative overflow-hidden">
      
      {/* Decorative gradients */}
      <div className="absolute bottom-0 right-0 h-48 w-48 bg-stone-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-200 dark:border-slate-800 pb-12 items-start">
          
          {/* Column 1 - Foundation overview */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group"
              onClick={() => onNavigate('hero')}
            >
              <Logo className="h-9 w-9 shrink-0" />
              <span className="font-display font-bold text-base sm:text-lg text-[#0F172A] dark:text-white tracking-tight">
                {language === 'bn' ? 'আমরা মানুষ ফাউন্ডেশন' : 'AMRA MANUSH FOUNDATION'}
              </span>
            </div>

            <p className="font-sans text-xs text-[#334155] dark:text-slate-300 leading-relaxed text-balance">
              {language === 'bn'
                ? 'আমরা মানুষ ফাউন্ডেশন একটি স্থায়ী ও নিবন্ধিত সামাজিক কল্যাণ প্রগতিশীল ট্রাস্ট, যা ক্ষুধা নিবারণ, সুবিধাবঞ্চিত শিশুদের মৌলিক শিক্ষা এবং নিঃসঙ্গ প্রবীণদের সম্মানজনক স্বাস্থ্য সুরক্ষা সুনিশ্চিত করতে নিবেদিতপ্রাণ।'
                : 'Amra Manush Foundation is a registered social impact enterprise dedicated to resolving extreme starvation, facilitating elementary child education, and restoring bodily dignity across Bengal.'
              }
            </p>

            <blockquote className="font-display font-medium text-xs text-[#1E3A8A] italic border-l border-blue-600/20 dark:border-cyan-400/30 pl-3 py-0.5">
              {language === 'bn' 
                ? '"শুধু একটি ট্রাস্ট নয়, এটি জীবন পরিবর্তনের এক পরম দায়িত্ব।"' 
                : '"Not just a Trust, a responsibility to change lives."'
              }
            </blockquote>
          </div>

          {/* Column 2 - Core Program Links */}
          <div className="md:col-span-2 text-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1E3A8A] mb-4">
              {language === 'bn' ? 'ন্যাভিগেশন' : 'Navigation'}
            </h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs">
              <button onClick={() => onNavigate('overview')} className="text-left text-[#334155] dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                {language === 'bn' ? '• ওভারভিউ' : '• Overview'}
              </button>
              <button onClick={() => onNavigate('flagship')} className="text-left text-[#334155] dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                {language === 'bn' ? '• আহার ক্যাম্পেইন' : '• Food Campaign'}
              </button>
              <button onClick={() => onNavigate('dashboard')} className="text-left text-[#334155] dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                {language === 'bn' ? '• পরিসংখ্যান' : '• Statistics'}
              </button>
              <button onClick={() => onNavigate('pillars')} className="text-left text-[#334155] dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap">
                {language === 'bn' ? '• সামাজিক স্তম্ভ' : '• Social Pillars'}
              </button>
            </div>
          </div>

          {/* Column 3 - Newsletter Subscription */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1E3A8A]">
              {language === 'bn' ? 'সংবাদপত্র সাবস্ক্রিপশন' : 'Newsletter Registry'}
            </h4>
            <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-slate-400 leading-snug">
              {language === 'bn' 
                ? 'আমাদের পরবর্তী ক্ষুধা নিবারণ ড্রাইভ এবং কার্যক্রম সম্পর্কে আপডেট পেতে সাবস্ক্রাইব করুন।' 
                : 'Stay informed about our upcoming hunger relief drives and community impact updates.'}
            </p>
            
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder={language === 'bn' ? 'আপনার ইমেল দিন' : 'Enter your email'}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  className={`w-full bg-white dark:bg-[#1A2332] border ${status === 'error' ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'} rounded-sm px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600/30 transition-all`}
                  disabled={status === 'loading' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-1 p-1.5 text-[#1E3A8A] hover:text-orange-600 disabled:opacity-50 transition-colors"
                >
                  {status === 'loading' ? (
                    <div className="h-4 w-4 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-1.5 text-[10px] text-[#138808] font-medium"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {language === 'bn' ? 'সাবস্ক্রাইব সফল হয়েছে!' : 'Successfully subscribed!'}
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-1.5 text-[10px] text-red-500 font-medium"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </div>

          {/* Column 4 - Regulatory Docs & Compliance */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1E3A8A]">
              {language === 'bn' ? 'কমপ্লায়েন্স' : 'Compliance'}
            </h4>
            
            <div className="grid grid-cols-1 gap-2.5 text-[10px] sm:text-xs text-[#334155] dark:text-slate-300">
              <div className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-[#138808]" /> {language === 'bn' ? `এমএসএমই: UDYAM-WB-07-0130195` : `MSME: UDYAM-WB-07-0130195`}</div>
              <div className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-orange-600" /> {language === 'bn' ? `১২এ এবং ৮০জি কমপ্লায়েন্স` : `Section 12A & 80G`}</div>
              <div className="flex items-center gap-1.5 group cursor-help">
                <ShieldAlert className="h-3.5 w-3.5 text-blue-800" /> 
                <span>{language === 'bn' ? `১০০% নিরাপদ তহবিল` : `100% Secure Fiscal Routing`}</span>
              </div>
            </div>

            <div className="p-2.5 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-sm">
              <div className="flex items-center gap-2">
                <Logo className="h-6 w-6 opacity-80" />
                <div>
                   <span className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase font-bold block leading-none mb-0.5">{language === 'bn' ? 'অফিসিয়াল পোর্টাল' : 'Official Portal'}</span>
                   <a href="https://amramanushfoundation.co.in" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1E3A8A] font-mono hover:underline inline-flex items-center gap-1">
                    amramanushfoundation.co.in <ExternalLink className="h-2 w-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Social Media & QR Bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-center gap-10 border-b border-slate-200 dark:border-slate-800 mb-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1E3A8A]">
              {language === 'bn' ? 'আমাদের পরিমণ্ডলে যুক্ত হোন' : 'Connect with Us'}
            </h4>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/amramanush_official" target="_blank" rel="noopener noreferrer" className="text-[#1E3A8A] hover:text-orange-600 transition-colors">
                <Instagram className="h-7 w-7" />
              </a>
              <a href="https://www.facebook.com/share/1FYC9gbhzx/" target="_blank" rel="noopener noreferrer" className="text-[#1E3A8A] hover:text-orange-600 transition-colors">
                <Facebook className="h-7 w-7" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#1E3A8A]">
              {language === 'bn' ? 'মোবাইলে খুলতে স্ক্যান করুন' : 'Scan to Open'}
            </h4>
            <div className="p-1 bg-indian-flag rounded-sm shadow-sm">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://amramanushfoundation.co.in" 
                alt="QR Code" 
                className="h-24 w-24 bg-white p-1 rounded-xs"
              />
            </div>
          </div>
        </div>

        {/* Lower meta row */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 items-start text-2xs text-[#64748B] dark:text-slate-400 font-mono gap-8 border-t border-slate-200 dark:border-slate-800 mt-8">
          <div className="text-center md:text-left">
            <p>© {toBnNo(currentYear.toString())} {language === 'bn' ? 'আমরা মানুষ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।' : 'Amra Manush Foundation. All human rights Reserved.'}</p>
            <p className="mt-1">
              {language === 'bn'
                ? `এমএসএমই উদয়ম বেঙ্গল মাইক্রো এন্টারপ্রাইজ নিবন্ধনের তারিখ: ১২ জুন ২০২৬, হুগলি জেলা। সমাজকল্যাণমূলক ট্রাস্ট সেবা।`
                : `UDYAM Bengal Micro Enterprise Registry Date: 12 June 2026. SC Welfare Services.`
              }
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span className="hover:text-blue-600 cursor-pointer">{language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}</span>
              <span className="h-2 w-[1px] bg-slate-300" />
              <span className="hover:text-blue-600 cursor-pointer">{language === 'bn' ? 'শর্তাবলী' : 'Terms & Conditions'}</span>
              <span className="h-2 w-[1px] bg-slate-300" />
              <span className="hover:text-blue-600 cursor-pointer">{language === 'bn' ? 'স্বচ্ছতা সংক্রান্ত প্রোটোকল চার্টার' : 'Transparency Protocol Charter'}</span>
            </div>
            <div className="text-[9px] uppercase tracking-tighter opacity-70">
              {language === 'bn' ? 'কন্টেন্ট ম্যানেজমেন্ট সিস্টেম ভার্সন: ২.৪.০' : 'Content Management System v2.4.0'}
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="font-bold text-[#1E3A8A] uppercase tracking-widest">
              {language === 'bn' ? 'শেষ আপডেট:' : 'Last Updated:'} 
              <span className="ml-1">{language === 'bn' ? '১৭ জুন ২০২৬' : '17 June 2026'}</span>
            </p>
            <p>{language === 'bn' ? 'সাইট ভিজিটর:' : 'Total Visitors:'} {toBnNo('১২,৪৩২+')}</p>
            <div className="flex items-center justify-center md:justify-end gap-2 mt-2">
              <span className="px-1.5 py-0.5 border border-slate-300 rounded text-[8px]">W3C WAI-AA</span>
              <span className="px-1.5 py-0.5 border border-slate-300 rounded text-[8px]">GIGW Compliant</span>
            </div>
          </div>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-indian-flag" />
    </footer>
  );
}
