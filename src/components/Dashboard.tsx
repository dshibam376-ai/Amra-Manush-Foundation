import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, PieChart, Users, CheckCircle, Flame, Target, Star, Leaf, LogIn, LogOut } from 'lucide-react';
import { auth, googleSignIn, logout } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import NoticeBanner from './NoticeBanner';
import { useLanguage } from '../lib/LanguageContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'meals' | 'allocation' | 'beneficiaries'>('meals');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error('Login failed', error);
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

  if (loading) {
    return (
      <section id="dashboard" className="py-24 bg-white dark:bg-[#1A2332] border-t border-b border-slate-200 dark:border-slate-800 relative min-h-[50vh] flex items-center justify-center">
        <div className="text-[#0F172A] dark:text-white">Loading...</div>
      </section>
    );
  }

  // Unified view: Always render the dashboard. Guests see statistics, and signed-in officers unlock advanced credential validation.


  // Real-time metric card constants
  const metrics = [
    { 
      label: t('dashboard.meals_dist'), 
      val: toBnNo('1,540'), 
      desc: language === 'bn' ? 'সরাসরি পুষ্টি সহায়তা' : 'Direct nutritional aid', 
      pct: toBnNo('+24% MoM') 
    },
    { 
      label: t('dashboard.children_supp'), 
      val: toBnNo('125'), 
      desc: language === 'bn' ? 'পুষ্টি ও শিক্ষা প্রোগ্রাম' : 'Nutrition & education programs', 
      pct: toBnNo('+18% MoM') 
    },
    { 
      label: t('dashboard.comm_drives'), 
      val: toBnNo('6'), 
      desc: language === 'bn' ? 'চিকিৎসা ও পরিচ্ছন্ন অভিযান' : 'Medical & sanitation efforts', 
      pct: language === 'bn' ? 'সক্রিয়' : 'Active' 
    },
    { 
      label: t('dashboard.vol_hours'), 
      val: toBnNo('1,820'), 
      desc: language === 'bn' ? 'স্বেচ্ছাসেবী অবদান' : 'Civic solidarity investment', 
      pct: toBnNo('+35% MoM') 
    },
    { 
      label: t('dashboard.fam_reached'), 
      val: toBnNo('84'), 
      desc: language === 'bn' ? 'চরম জীবিকা সংকটে ব্যাকআপ' : 'Extreme distress backup', 
      pct: toBnNo('+12% MoM') 
    },
    { 
      label: t('dashboard.ben_served'), 
      val: toBnNo('320'), 
      desc: language === 'bn' ? 'সুবিধাপ্রাপ্ত স্বতন্ত্র মানুষ' : 'Unique human beings touched', 
      pct: toBnNo('+21% MoM') 
    },
  ];

  // Simulated chart data points for SVG rendering
  const mealsData = [
    { label: language === 'bn' ? 'সপ্তাহ ১' : 'Wk 1', val: 120 },
    { label: language === 'bn' ? 'সপ্তাহ ২' : 'Wk 2', val: 250 },
    { label: language === 'bn' ? 'সপ্তাহ ৩' : 'Wk 3', val: 410 },
    { label: language === 'bn' ? 'সপ্তাহ ৪' : 'Wk 4', val: 680 },
    { label: language === 'bn' ? 'সপ্তাহ ৫' : 'Wk 5', val: 1100 },
    { label: language === 'bn' ? 'সপ্তাহ ৬ (অনু.)' : 'Wk 6 (Est)', val: 1540 },
  ];

  const allocationData = [
    { label: language === 'bn' ? 'খাদ্য সামগ্রী' : 'Food Ingredients', val: 45, color: '#fbbf24' },  // Gold
    { label: language === 'bn' ? 'লজিস্টিক ও রান্নাঘর' : 'Logistics & Kitchen', val: 25, color: '#10b981' }, // Green
    { label: language === 'bn' ? 'শিশু শিক্ষা সহায়তা' : 'Child Education Aid', val: 15, color: '#3b82f6' }, // Blue
    { label: language === 'bn' ? 'শারীরিক পুনর্বাসন' : 'Disability Mobility', val: 10, color: '#F97316' }, // Purple
    { label: language === 'bn' ? 'প্রশাসনিক সমর্থন' : 'Admin Support', val: 5, color: '#64748b' },      // Slate
  ];

  const beneficiaryData = [
    { label: language === 'bn' ? 'সুবিধাবঞ্চিত শিশু' : 'Underprivileged Children', val: 40 },
    { label: language === 'bn' ? 'অসহায় প্রবীণ' : 'Abandoned Elderly', val: 30 },
    { label: language === 'bn' ? 'বিশেষ সক্ষম নাগরিক' : 'Disabled Citizens', val: 15 },
    { label: language === 'bn' ? 'গৃহহীন অত্যন্ত দরীদ্র' : 'Destitute Streets', val: 15 },
  ];

  // Simple math helper to compute positions in SVGs
  const maxMealsVal = Math.max(...mealsData.map(d => d.val));
  const svgWidth = 600;
  const svgHeight = 220;

  return (
    <section id="dashboard" className="py-24 border-t border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#138808]/10 dark:bg-[#138808]/15 blur-[100px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-[#FF9933]/10 dark:bg-[#FF9933]/15 blur-[100px] pointer-events-none animate-float-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#0056D2]/10 dark:bg-[#0056D2]/15 blur-[80px] pointer-events-none animate-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 bg-white dark:bg-[#1A2332] rounded-sm overflow-hidden border border-slate-200 dark:border-slate-800">
             <NoticeBanner />
        </div>
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left max-w-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-[#3B82F6] px-3 py-1 rounded-sm bg-[#0056D2]/5 border border-blue-600/20 dark:border-cyan-400/30">
                {language === 'bn' ? 'বার্ষিক প্রতিবেদন পোর্টাল (উন্মুক্ত সরকারি তথ্য)' : 'ANNUAL REPORT PORTAL (OPEN GOVT DATA)'}
              </span>
              {user ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono text-[#138808] dark:text-[#22C55E] font-bold bg-[#138808]/10 dark:bg-[#22C55E]/10 border border-[#138808]/25 dark:border-[#22C55E]/25 px-2 py-0.5 rounded">
                    {language === 'bn' ? '● কর্মকর্তা সেশন সক্রিয়' : '● OFFICER SESSION ACTIVE'}
                  </span>
                  <button onClick={logout} className="text-[#64748B] dark:text-slate-400 hover:text-red-500 flex items-center gap-1 text-xs font-mono cursor-pointer transition-colors">
                    <LogOut className="h-3.5 w-3.5" /> {language === 'bn' ? 'সাইন আউট' : 'Sign Out'}
                  </button>
                </div>
              ) : (
                <button onClick={handleLogin} className="text-[#0056D2] dark:text-[#3B82F6] hover:underline flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer transition-colors bg-blue-500/5 hover:bg-blue-500/10 dark:bg-blue-400/5 dark:hover:bg-blue-400/10 px-3 py-1 border border-blue-600/10 dark:border-blue-400/20 rounded">
                  <LogIn className="h-3.5 w-3.5" /> {language === 'bn' ? 'অফিসিয়াল কর্মকর্তা সাইন-ইন' : 'Official Verification Sign-In'}
                </button>
              )}
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
              {t('dashboard.title')}
            </h2>
            <p className="text-[#334155] dark:text-slate-300 font-sans mt-3 text-sm sm:text-base leading-relaxed">
              {language === 'bn' 
                ? `স্বাগতম, ${user ? (user.displayName || user.email) : "অতিথি নাগরিক / সহযোগী অংশীদার"}। এই তথ্য ফলকটি আমাদের বর্তমান সামাজিক নিরীক্ষা চক্র, লজিস্টিক বিবরণী এবং প্রত্যয়িত বিতরণ ফলাফল প্রদর্শন করে।` 
                : `Welcome, ${user ? (user.displayName || user.email) : "Guest Citizen / Partner"}. This analytics panel showcases our current citizen-centric audit cycles, logistical metrics, and audited distribution outputs.`
              }
            </p>
          </div>
          
          {/* Interactive Navigation Pills for Dashboard Insights */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0 p-1 rounded-sm bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('meals')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'meals' 
                  ? 'bg-[#0056D2] text-white font-bold shadow-sm' 
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#1E3A8A]'
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              {language === 'bn' ? 'আহার বিতরণ তথ্য' : 'Meal Delivery Output'}
            </button>
            <button
              onClick={() => setActiveTab('allocation')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'allocation' 
                  ? 'bg-[#0056D2] text-white font-bold shadow-sm' 
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#1E3A8A]'
              }`}
            >
              <PieChart className="h-3.5 w-3.5" />
              {language === 'bn' ? 'তহবিলের সুষম বন্টন' : 'Fund Utilization'}
            </button>
            <button
              onClick={() => setActiveTab('beneficiaries')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'beneficiaries' 
                  ? 'bg-[#0056D2] text-white font-bold shadow-sm' 
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#1E3A8A]'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              {language === 'bn' ? 'সামাজিক শ্রেণী বিন্যাস' : 'Socio Demographics'}
            </button>
          </div>
        </div>

        {/* 6 Key Performance Indicators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <div 
              key={i} 
              className="glass-panel p-5 rounded-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-600/20 dark:border-cyan-400/30 transition-all shadow-sm group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] to-[#138808] translate-y-[-1px] group-hover:translate-y-0 transition-transform duration-300" />
              <div>
                <dt className="text-xs font-semibold text-[#64748B] dark:text-slate-400 font-sans truncate">{metric.label}</dt>
                <dd className="font-display font-extrabold text-2xl sm:text-3xl text-[#16A34A] dark:text-white mt-2 tracking-tight group-hover:text-[#16A34A] transition-colors">
                  {metric.val}
                </dd>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#64748B] dark:text-slate-400">
                <span className="truncate">{metric.desc}</span>
                <span className="font-mono font-semibold text-[#138808]">{metric.pct}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Display Area based on tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Visual Chart - 7 Columns */}
          <div className="lg:col-span-7 block glass-panel p-6 sm:p-8 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1E293B] dark:text-white">
                    {activeTab === 'meals' && (language === 'bn' ? 'আহার বিতরণ অগ্রগতি চিত্র (২০২৬)' : 'Monthly Distribution Progression (2026)')}
                    {activeTab === 'allocation' && (language === 'bn' ? 'নিরীক্ষিত তহবিল বন্টন শতাংশ (%)' : 'Audited Fund Disbursal Breakdown (%)')}
                    {activeTab === 'beneficiaries' && (language === 'bn' ? 'অগ্রাধিকার পাওয়া নাগরিক শ্রেণী বিন্যাস' : 'Priority Segment Representation')}
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 font-sans mt-1">
                    {activeTab === 'meals' && (language === 'bn' ? 'আহার সরবরাহের স্কেল ট্র্যাকিং এবং সামাজিক নিরীক্ষা নম্বর' : 'Audit confirmed counts tracking meal delivery scale')}
                    {activeTab === 'allocation' && (language === 'bn' ? 'উচ্চ আর্থিক সততার সাথে পরিকল্পিত সম্পদ ব্যবহারের নিয়ম' : 'Allocation rules designed with high fiscal precision')}
                    {activeTab === 'beneficiaries' && (language === 'bn' ? 'প্রোগ্রাম কাস্টমাইজেশনের জন্য তালিকাভুক্ত অনুমোদিত প্রাপক' : 'Verified recipients categorized for program customisation')}
                  </p>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#138808] px-2 py-1 rounded-sm bg-[#138808]/5 border border-[#138808]/10">
                  <Target className="h-3 w-3" /> {language === 'bn' ? 'নিরীক্ষা সুনিশ্চিত' : 'Audit Verified'}
                </div>
              </div>

              {/* Chart Body */}
              <div className="min-h-[220px] flex items-center justify-center relative select-none">
                
                {/* Tab 1: Meals Progress Chart */}
                {activeTab === 'meals' && (
                  <div className="w-full h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mealsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}
                          itemStyle={{ color: '#0056D2' }}
                        />
                        <Bar dataKey="val" fill="#0056D2" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Tab 2: Fund Allocation Chart */}
                {activeTab === 'allocation' && (
                  <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 flex justify-center">
                      {/* Premium Donut Chart rendered in pure SVG */}
                      <svg width="180" height="180" viewBox="0 0 42 42" className="transform -rotate-90">
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
                        
                        {/* Food ingredients segment: 45% */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0056D2" strokeWidth="5.5" 
                                strokeDasharray="45 55" strokeDashoffset="100" />
                        {/* Logistics segment: 25% */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#138808" strokeWidth="5.5" 
                                strokeDasharray="25 75" strokeDashoffset="55" />
                        {/* Child education aid: 15% */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#FF9933" strokeWidth="5.5" 
                                strokeDasharray="15 85" strokeDashoffset="30" />
                        {/* Disability: 10% */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#94a3b8" strokeWidth="5.5" 
                                strokeDasharray="10 90" strokeDashoffset="15" />
                        {/* Admin: 5% */}
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#cbd5e1" strokeWidth="5.5" 
                                strokeDasharray="5 95" strokeDashoffset="5" />
                      </svg>
                    </div>
                    
                    <div className="md:col-span-7 space-y-3.5">
                      {allocationData.map((d, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#334155] dark:text-slate-200">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ 
                              backgroundColor: d.label === 'খাদ্য সামগ্রী' || d.label === 'Food Ingredients' ? '#0056D2' : 
                                               d.label === 'লজিস্টিক ও রান্নাঘর' || d.label === 'Logistics & Kitchen' ? '#138808' :
                                               d.label === 'শিশু শিক্ষা সহায়তা' || d.label === 'Child Education Aid' ? '#FF9933' : '#94a3b8' 
                            }} />
                            <span>{d.label}</span>
                          </div>
                          <span className="font-mono text-xs font-extrabold text-[#0F172A] dark:text-white">{toBnNo(d.val.toString())}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Sociodemographics Chart */}
                {activeTab === 'beneficiaries' && (
                  <div className="w-full space-y-5">
                    {beneficiaryData.map((d, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-xs font-bold text-[#334155] dark:text-slate-200 mb-1.5">
                          <span>{d.label}</span>
                          <span className="font-mono text-[#1E3A8A]">{toBnNo(d.val.toString())}% {language === 'bn' ? 'প্রতিনিধিত্বকারী' : 'Represented'}</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 dark:bg-[#1E293B] rounded-sm overflow-hidden border border-slate-200 dark:border-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${d.val}%` }}
                            transition={{ duration: 0.9, delay: idx * 0.1 }}
                            className="h-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* Note */}
            <div className="border-t border-slate-100 pt-4 mt-6 text-2xs text-[#64748B] dark:text-slate-400 font-mono flex items-center justify-between">
              <span>{language === 'bn' ? 'পরবর্তী সামাজিক অডিট প্রকাশ: জুলাই ২০২৬' : 'Next Audited Release cycle: July 2026'}</span>
              <span className="text-[#1E3A8A]">{language === 'bn' ? '১০০% করমুক্ত উপকারভোগী সংযোগ' : '100% Tax Free Recipient Routing'}</span>
            </div>
          </div>

          {/* Core Impact Philosophy Narrative - 5 Columns */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-stone-100 rounded-full blur-2xl" />
            
            <div>
              <div className="p-3 bg-[#138808]/5 border border-[#138808]/10 rounded-sm w-fit mb-6">
                <Leaf className="h-6 w-6 text-[#138808]" />
              </div>
              
              <h3 className="font-display font-bold text-xl text-[#1E293B] dark:text-white mb-4">
                {language === 'bn' ? 'কাঠামোগত সামাজিক দায়বদ্ধতা' : 'Structured Social Accountability'}
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#334155] dark:text-slate-200 leading-relaxed font-sans">
                <p>
                  {language === 'bn' 
                    ? 'বিনিয়োগকারীদের আস্থা অর্জনের জন্য, আমাদের প্রতিটি কার্যক্রম একটি পাবলিক কর্পোরেশনের মতো পরিচালিত হয়। প্রতিটি গ্রেন চাল, ব্যবহৃত প্রতিটি চিকিৎসা গ্লাভস এবং প্রতিটি অনুদানের টাকা সম্পূর্ণ নথিভুক্ত এবং অডিট করা হয়।'
                    : 'To secure investor trust, our operational frameworks function exactly like public corporations. Every grain of rice bought, every medical glove dispensed, and every single rupee of CSR capital is cataloged and fully audited.'
                  }
                </p>
                <p>
                  {language === 'bn'
                    ? 'আমরা বহু-বিন্দু স্বাক্ষর নিশ্চিতকরণ পদ্ধতি, ফিল্ড বিতরণের জন্য জিপিএস এবং টাইমস্ট্যাম্প যুক্ত ছবি এবং মাসিক ইনভেন্টরি মিলকরণ প্রয়োগ করি।'
                    : 'We implement multi-point signature confirmations, GPS and timestamp photo tracking for all field distribution points, and monthly inventory reconciliations.'
                  }
                </p>
                <p>
                  {language === 'bn'
                    ? 'আমাদের এই কঠোর নীতিমালার কারণেই বিভিন্ন কর্পোরেট পার্টনার এবং দানদাতাগণ "আমরা মানুষ ফাউন্ডেশন" এর সাথে যুক্ত হতে অত্যন্ত স্বাচ্ছন্দ্য ও নিরাপদ বোধ করেন।'
                    : 'This rigid discipline is why institutional donors find partnership with Amra Manush highly risk-free and strategically efficient.'
                  }
                </p>
              </div>
            </div>

            {/* Certification Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-white dark:bg-[#1A2332] rounded-sm border border-slate-200 dark:border-slate-800 text-left">
                <h4 className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase tracking-wider">{language === 'bn' ? 'আয়কর সুবিধা' : 'TAX BENEFITS'}</h4>
                <p className="text-xs font-bold text-[#0F172A] dark:text-white mt-1">{language === 'bn' ? '৮০জি ধারা অনুযায়ী করমুক্ত' : 'Section 80G Compliant'}</p>
                <span className="text-[9px] text-[#1E3A8A] mt-0.5 block font-mono">{language === 'bn' ? 'নিবন্ধিত/অনুমোদিত' : 'Assigned/Pending'}</span>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#1A2332] rounded-sm border border-slate-200 dark:border-slate-800 text-left">
                <h4 className="text-[10px] font-mono text-[#64748B] dark:text-slate-400 uppercase tracking-wider">{language === 'bn' ? 'CSR যোগ্যতা' : 'CSR ELIGIBILITY'}</h4>
                <p className="text-xs font-bold text-[#0F172A] dark:text-white mt-1">{language === 'bn' ? 'সরাসরি এনজিও শ্রেণীভুক্ত' : 'Direct NGO Category'}</p>
                <span className="text-[9px] text-[#138808] mt-0.5 block font-mono">{language === 'bn' ? 'ক্ষুদ্র সামাজিক প্রতিষ্ঠান' : 'Micro Enterprise'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
