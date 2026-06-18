import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Info, Heart, Calendar, HelpCircle, CheckCircle, 
  FileCheck2, UserCheck, Send, Search, Award, Flame, 
  MapPin, Clock, ShieldCheck, Sparkles, Filter, X 
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface ActiveVolunteer {
  id: string;
  nameEn: string;
  nameBn: string;
  roleEn: string;
  roleBn: string;
  locEn: string;
  locBn: string;
  hoursContributed: number;
  initials: string;
  badgeEn: string;
  badgeBn: string;
  streakDays: number;
  category: 'food' | 'children' | 'community';
}

const ACTIVE_VOLUNTEERS: ActiveVolunteer[] = [
  {
    id: 'vol-1',
    nameEn: 'Debarshi Roy',
    nameBn: 'দেবর্ষি রায়',
    roleEn: 'Lead Meal Distributor',
    roleBn: 'প্রধান খাদ্য পরিবেশক',
    locEn: 'Hindmotor Central',
    locBn: 'হিন্দমোটর সেন্ট্রাল',
    hoursContributed: 132,
    initials: 'DR',
    badgeEn: 'Food Security',
    badgeBn: 'খাদ্য নিরাপত্তা',
    streakDays: 45,
    category: 'food'
  },
  {
    id: 'vol-2',
    nameEn: 'Sneha Mukherjee',
    nameBn: 'স্নেহা মুখার্জী',
    roleEn: 'Primary Child Tutor',
    roleBn: 'প্রাথমিক শিশু শিক্ষক',
    locEn: 'Sreerampore',
    locBn: 'শ্রীরামপুর',
    hoursContributed: 98,
    initials: 'SM',
    badgeEn: 'Child Welfare',
    badgeBn: 'শিশু কল্যাণ',
    streakDays: 28,
    category: 'children'
  },
  {
    id: 'vol-3',
    nameEn: 'Pritam Sen',
    nameBn: 'প্রীতম সেন',
    roleEn: 'Food Supply Inspector',
    roleBn: 'খাদ্য সরবরাহ পরিদর্শক',
    locEn: 'Kolkata Slums',
    locBn: 'কলকাতা বস্তি',
    hoursContributed: 112,
    initials: 'PS',
    badgeEn: 'Quality Control',
    badgeBn: 'মান নিয়ন্ত্রণ',
    streakDays: 34,
    category: 'food'
  },
  {
    id: 'vol-4',
    nameEn: 'Ananya Dutta',
    nameBn: 'অনন্যা দত্ত',
    roleEn: 'Kitchen Ops Admin',
    roleBn: 'রান্নাঘর পরিচালনা',
    locEn: 'Hindmotor Kitchen',
    locBn: 'হিন্দমোটর রান্নাঘর',
    hoursContributed: 88,
    initials: 'AD',
    badgeEn: 'Kitchen Admin',
    badgeBn: 'রান্নাঘর অ্যাডমিন',
    streakDays: 19,
    category: 'food'
  },
  {
    id: 'vol-5',
    nameEn: 'Rohan Banerjee',
    nameBn: 'রোহন ব্যানার্জী',
    roleEn: 'Emergency Relief Driver',
    roleBn: 'জরুরি ত্রাণ চালক',
    locEn: 'Hooghly Suburban',
    locBn: 'হুগলী মফস্বল',
    hoursContributed: 154,
    initials: 'RB',
    badgeEn: 'Disaster Relief',
    badgeBn: 'দুর্যোগ ত্রাণ',
    streakDays: 60,
    category: 'community'
  },
  {
    id: 'vol-6',
    nameEn: 'Souvik Chakraborty',
    nameBn: 'সৌভিক চক্রবর্তী',
    roleEn: 'Medical Camp Volunteer',
    roleBn: 'মেডিকেল ক্যাম্প কর্মী',
    locEn: 'Sreerampore Hub',
    locBn: 'শ্রীরামপুর হাব',
    hoursContributed: 72,
    initials: 'SC',
    badgeEn: 'Healthcare Help',
    badgeBn: 'স্বাস্থ্যসেবা',
    streakDays: 14,
    category: 'community'
  },
  {
    id: 'vol-7',
    nameEn: 'Riya Sen',
    nameBn: 'রিয়া সেন',
    roleEn: 'Child Wellness Counselor',
    roleBn: 'শিশু সুস্থতা পরামর্শদাতা',
    locEn: 'Kolkata Center',
    locBn: 'কলকাতা কেন্দ্র',
    hoursContributed: 84,
    initials: 'RS',
    badgeEn: 'Child Protection',
    badgeBn: 'শিশু সুরক্ষা',
    streakDays: 22,
    category: 'children'
  },
  {
    id: 'vol-8',
    nameEn: 'Niladri Saha',
    nameBn: 'নীলাদ্রি সাহা',
    roleEn: 'Food Prep Partner',
    roleBn: 'খাদ্য প্রস্তুতি সহযোগী',
    locEn: 'Hindmotor Kitchen',
    locBn: 'হিন্দমোটর রান্নাঘর',
    hoursContributed: 68,
    initials: 'NS',
    badgeEn: 'Kitchen Specialist',
    badgeBn: 'রান্নাঘর বিশেষজ্ঞ',
    streakDays: 12,
    category: 'food'
  },
  {
    id: 'vol-9',
    nameEn: 'Sanjita Das',
    nameBn: 'সংজিতা দাস',
    roleEn: 'Grassroots Literacy Tutor',
    roleBn: 'তৃণমূল সাক্ষরতা শিক্ষক',
    locEn: 'Hooghly Center',
    locBn: 'হুগলী কেন্দ্র',
    hoursContributed: 106,
    initials: 'SD',
    badgeEn: 'Education',
    badgeBn: 'শিক্ষা',
    streakDays: 31,
    category: 'children'
  },
  {
    id: 'vol-10',
    nameEn: 'Ayan Seal',
    nameBn: 'অয়ন শীল',
    roleEn: 'Stock & Inventory Audit',
    roleBn: 'স্টক ও ইনভেন্টরি অডিট',
    locEn: 'Hindmotor Depot',
    locBn: 'হিন্দমোটর ডিপো',
    hoursContributed: 92,
    initials: 'AS',
    badgeEn: 'Inventory Support',
    badgeBn: 'ইনভেন্টরি সহায়তা',
    streakDays: 25,
    category: 'food'
  },
  {
    id: 'vol-11',
    nameEn: 'Pritha Ghoshal',
    nameBn: 'প্রীথা ঘোষাল',
    roleEn: 'Food Distribution Host',
    roleBn: 'খাদ্য বিতরণ সঞ্চালক',
    locEn: 'Sreerampore Crossing',
    locBn: 'শ্রীরামপুর ক্রসিং',
    hoursContributed: 76,
    initials: 'PG',
    badgeEn: 'Field Operations',
    badgeBn: 'মাঠপর্যায় কাজ',
    streakDays: 17,
    category: 'food'
  },
  {
    id: 'vol-12',
    nameEn: 'Arpan Bhattacharya',
    nameBn: 'অর্পণ ভট্টাচার্য',
    roleEn: 'Geriatric Support Assistant',
    roleBn: 'বার্ধক্য সহায়তা কর্মী',
    locEn: 'Hooghly Rural Nodes',
    locBn: 'হুগলী গ্রামীণ শাখা',
    hoursContributed: 118,
    initials: 'AB',
    badgeEn: 'Elderly Care',
    badgeBn: 'বার্ধক্য যত্ন',
    streakDays: 39,
    category: 'community'
  },
  {
    id: 'vol-13',
    nameEn: 'Sweta Paul',
    nameBn: 'শ্বেতা পাল',
    roleEn: 'Slum Education Mobilizer',
    roleBn: 'বস্তি শিক্ষা সংগঠক',
    locEn: 'Kolkata Slums',
    locBn: 'কলকাতা বস্তি',
    hoursContributed: 86,
    initials: 'SP',
    badgeEn: 'Empowerment',
    badgeBn: 'ক্ষমতায়ন',
    streakDays: 18,
    category: 'children'
  },
  {
    id: 'vol-14',
    nameEn: 'Abhishek Seth',
    nameBn: 'অভিষেক শেঠ',
    roleEn: 'Kitchen Hygiene Marshal',
    roleBn: 'রান্নাঘর স্বাস্থ্য পরিদর্শক',
    locEn: 'Hindmotor Kitchen',
    locBn: 'হিন্দমোটর কিচেন',
    hoursContributed: 134,
    initials: 'AS',
    badgeEn: 'Hygiene & Safety',
    badgeBn: 'পরিচ্ছন্নতা ও নিরাপত্তা',
    streakDays: 48,
    category: 'food'
  },
  {
    id: 'vol-15',
    nameEn: 'Manish Shaw',
    nameBn: 'মনীষ শ',
    roleEn: 'Weekend Meal Packer',
    roleBn: 'সাপ্তাহিক খাদ্য প্যাককর্মী',
    locEn: 'Hindmotor Kitchen',
    locBn: 'হিন্দমোটর রান্নাঘর',
    hoursContributed: 64,
    initials: 'MS',
    badgeEn: 'Weekly Cohort',
    badgeBn: 'সাপ্তাহিক কোহর্ট',
    streakDays: 10,
    category: 'food'
  },
  {
    id: 'vol-16',
    nameEn: 'Tiyasa Chaudhury',
    nameBn: 'তিয়াসা চৌধুরী',
    roleEn: 'Community Health Assistant',
    roleBn: 'কমিউনিটি স্বাস্থ্য সহকারী',
    locEn: 'Hooghly Camps',
    locBn: 'হুগলী ক্যাম্প',
    hoursContributed: 96,
    initials: 'TC',
    badgeEn: 'Community Service',
    badgeBn: 'সমাজসেবা',
    streakDays: 27,
    category: 'community'
  }
];

export default function Volunteer() {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('meal-packaging');
  const [hours, setHours] = useState('2-4 hours');
  const [motivation, setMotivation] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  // Active volunteers filter states
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');

  const roles = [
    { 
      id: 'meal-packaging', 
      label: isBn ? 'খাবার রান্না ও প্যাকেজিং' : 'Meal Prep & Packaging', 
      loc: isBn ? 'হিন্দমোটর সেন্ট্রাল কিচেন' : 'Hindmotor Central Kitchen' 
    },
    { 
      id: 'field-dist', 
      label: isBn ? 'ফিল্ড ডিস্ট্রিবিউশন চালক' : 'Field Distribution Driver', 
      loc: isBn ? 'সবআর্বান ডিস্ট্রিবিউশন নোডস' : 'Suburban Distribution Nodes' 
    },
    { 
      id: 'child-tutor', 
      label: isBn ? 'তৃণমূল শিশু শিক্ষক' : 'Grassroots Child Tutor', 
      loc: isBn ? 'শ্রীরামপুর শিক্ষামূলক কেন্দ্র' : 'Sreerampore Education Nests' 
    },
    { 
      id: 'medical-camp', 
      label: isBn ? 'বার্ধক্য ক্যাম্প সহকারী' : 'Geriatric Camp Support Assistant', 
      loc: isBn ? 'মোবাইল হেলথ ইউনিট' : 'Mobile Health Units' 
    }
  ];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert(isBn ? "দয়া করে আপনার নাম, ইমেইল এবং ফোন নম্বর প্রবেশ করান।" : "Please enter your name, email, and contact number to join.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `VOL-REF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessCode(code);
      
      // Clear values
      setName('');
      setPhone('');
      setEmail('');
      setMotivation('');
    }, 1400);
  };

  const filteredVolunteers = ACTIVE_VOLUNTEERS.filter(vol => {
    const nameMatch = isBn ? vol.nameBn : vol.nameEn;
    const roleMatch = isBn ? vol.roleBn : vol.roleEn;
    const locMatch = isBn ? vol.locBn : vol.locEn;

    const matchesSearch = nameMatch.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
                          roleMatch.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
                          locMatch.toLowerCase().includes(activeSearchQuery.toLowerCase());

    const matchesCategory = activeCategoryFilter === 'All' || vol.category === activeCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="volunteer" className="py-24 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-orange-600 dark:bg-orange-500/5 blur-3.5xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C5A059] px-3.5 py-1.5 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            {isBn ? 'মানব নেটওয়ার্ক কোহর্ট' : 'HUMAN NETWORK COHORT'}
          </span>
          <h2 className="font-display font-bold text-3.5xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {isBn ? 'আমাদের স্বেচ্ছাসেবক নেটওয়ার্কে যুক্ত হোন' : 'Join Our Volunteer Network'}
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-display font-medium text-base sm:text-lg text-orange-600 dark:text-orange-400 mt-2">
            {isBn ? '"পরিবর্তন তখনই শুরু হয় যখন সাধারণ মানুষ যত্ন নেওয়ার সিদ্ধান্ত নেয়।"' : '"Change begins when ordinary people choose to care."'}
          </p>
          <div className="h-1.5 w-16 bg-[#C5A059] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Opportunities and Leadership details - 7 columns */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E293B] dark:text-white mb-4">
                {isBn ? 'সক্রিয় স্বেচ্ছাসেবকদের কাজের ক্ষেত্র' : 'Active Volunteer Spheres of Action'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                {roles.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-1 bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] translate-y-[-1px] group-hover:translate-y-0 transition-all duration-300" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#1E293B] dark:text-white mb-1.5">{r.label}</h4>
                      <div className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-semibold uppercase">{r.loc}</div>
                    </div>
                    <p className="text-2xs text-[#64748B] dark:text-slate-400 mt-4 leading-normal font-sans">
                      {isBn ? 'স্থানীয় নিরাপত্তা পরিচালকদের সাথে সমন্বয় করা, তাপমাত্রা লগ পরিদর্শন করা এবং সুবিধাভোগীদের কাছে সরাসরি আহার বা শিক্ষা সামগ্রী সরবরাহ করা।' : 'Coordinate with localized safety marshals, inspect temperature logs, and deliver meals or classroom accessories directly to candidates.'}
                    </p>
                  </div>
                ))}
              </div>

              {/* Leadership Program overview block */}
              <div className="p-6 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-2xl">
                <h4 className="font-display font-bold text-sm sm:text-base text-[#1E293B] dark:text-white mb-2 flex items-center gap-1.5">
                  <UserCheck className="h-4.5 w-4.5 text-orange-600 dark:text-orange-400" /> {isBn ? 'কমিউনিটি লিডারশিপ প্রোগ্রাম' : 'Community Leadership Program'}
                </h4>
                <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 font-sans leading-relaxed">
                  {isBn 
                    ? 'সার্টিফিকেট-ব্যাকড একাডেমিক ক্রেডিট আওয়ার এবং কাঠামোগত উন্নয়নমূলক মেন্টরশিপ অর্জন করুন। আমাদের লিডারশিপ প্রোগ্রাম ত্রৈমাসিকভাবে ১৫ জন অনবদ্য স্বেচ্ছাসেবক প্রার্থীকে নির্বাচন করে যাতে তারা স্বাধীনভাবে স্থানীয় শাখা নোডগুলি পরিচালনা করতে পারে, যা তাদের বৈশ্বিক জনস্বাস্থ্য, পরোপকারী খাত বা সিএসআর উন্নয়ন নীতি বাস্তবায়নে প্রস্তুত করে।'
                    : 'Earn certificate-backed academic credit hours and structured developmental mentorship. Our Leadership program selects 15 high-performing volunteer candidates quarterly to coordinate local branch hubs independently, preparing them for careers in global public-health, philanthropic sectors, or CSR policy execution.'}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-mono italic mt-6 select-none border-l border-slate-200 dark:border-slate-800 pl-4 py-1 self-start">
              {isBn ? 'দ্রষ্টব্য: প্রত্যেক স্বেচ্ছাসেবক সক্রিয় ডিউটিতে স্যানিটাইজেশন গিয়ার, অফিশিয়াল সেফটি ব্রিফ এবং পুষ্টিকর মধ্যাহ্নভোজন পান। এটি আমাদের প্রতিশ্রুতি।' : 'Note: Every volunteer receives active-shift sanitization gear, official safety briefs, and high-protein mid-day meals. This is our promise.'}
            </p>
          </div>

          {/* Volunteer Registration Form - 5 columns */}
          <div className="lg:col-span-12 xl:col-span-12 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden xl:col-span-5">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest font-extrabold mb-3">
                <Users className="h-4.5 w-4.5" /> {isBn ? 'নিবন্ধন পোর্টাল' : 'Registration Portal'}
              </div>
              
              <h3 className="font-display font-bold text-lg text-[#1E293B] dark:text-white mb-1">
                {isBn ? 'সক্রিয় শিফটের জন্য আবেদন করুন' : 'Apply for Active Shift'}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-sans leading-normal mb-6">
                {isBn 
                  ? 'আপনার যোগ্যতা যাচাই সম্পূর্ণ করতে এবং তাত্ক্ষণিক আঞ্চলিক কোহর্টে যোগ দিতে নিচের বিবরণগুলি পূরণ করুন।' 
                  : 'Fill in the details below to complete background eligibility checks and join immediate regional cohorts.'}
              </p>

              <AnimatePresence mode="wait">
                {!successCode ? (
                  <motion.form key="vol-form" onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{isBn ? 'সম্পূর্ণ নাম *' : 'Full Name *'}</label>
                      <input
                        type="text"
                        required
                        placeholder={isBn ? 'যেমন: শিবম দাস' : 'e.g. Shibam Das'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] dark:text-slate-400 text-xs sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{isBn ? 'যোগাযোগ নম্বর *' : 'Contact Number *'}</label>
                        <input
                          type="tel"
                          required
                          placeholder={isBn ? 'যেমন: +91 9876543210' : 'e.g. +91 9876543210'}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] dark:text-slate-400 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{isBn ? 'ইমেইল ঠিকানা *' : 'Email Address *'}</label>
                        <input
                          type="email"
                          required
                          placeholder="shibam@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] dark:text-slate-400 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{isBn ? 'পছন্দসই কাজের ক্ষেত্র' : 'Desired Activity Domain'}</label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-slate-200 outline-none text-xs"
                        >
                          <option value="meal-prep">{isBn ? 'রান্নাঘরের খাবার তৈরি' : 'Kitchen Meal Prep'}</option>
                          <option value="delivery">{isBn ? 'মাঠপর্যায়ে খাদ্য বণ্টন' : 'Field Distribution'}</option>
                          <option value="tutoring">{isBn ? 'একাডেমিক টিউটরিং' : 'Academic Tutoring'}</option>
                          <option value="med-camp">{isBn ? 'মেডিকেল ক্যাম্প সহায়তা' : 'Medical Camp Support'}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{isBn ? 'সাপ্তাহিক সময় বরাদ্দ' : 'Weekly Allocation Availability'}</label>
                        <select
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-slate-200 outline-none text-xs"
                        >
                          <option>{isBn ? '১-২ ঘণ্টা' : '1-2 hours'}</option>
                          <option>{isBn ? '২-৪ ঘণ্টা' : '2-4 hours'}</option>
                          <option>{isBn ? '৪-৮ ঘণ্টা' : '4-8 hours'}</option>
                          <option>{isBn ? '৮+ ঘণ্টা (লিড রোল!)' : '8+ hours (Lead role!)'}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">{isBn ? 'আপনি কেন আমরা মানুষ-এ যোগ দিতে চান? (সংক্ষেপে)' : 'Why do you want to join Amra Manush? (Brief)'}</label>
                      <textarea
                        rows={3}
                        required
                        placeholder={isBn ? 'আপনার উদ্দেশ্য বা সামাজিক কাজের প্রতি আগ্রহ ভাগ করুন...' : 'Share high-level intent, background, or social action passion...'}
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] dark:text-slate-400 text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white font-bold rounded-lg shadow hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Users className="h-4 w-4 animate-bounce" /> {isBn ? 'স্লট নিশ্চিত করা হচ্ছে...' : 'Securing slots...'}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> {isBn ? 'শিফটের জন্য নিবন্ধন করুন' : 'Register For Shift'}
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="vol-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-5 bg-orange-600 dark:bg-orange-500/15 border border-emerald-500/20 rounded-xl space-y-4 text-center text-xs"
                  >
                    <div className="mx-auto h-12 w-12 rounded-full bg-orange-600 dark:bg-orange-500/10 flex items-center justify-center border border-emerald-500/35">
                      <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] dark:text-white text-sm">{isBn ? 'স্বেচ্ছাসেবক আবেদন নিবন্ধিত' : 'Volunteer Application Cataloged'}</h4>
                      <p className="text-[#334155] dark:text-slate-300 font-sans mt-0.5 leading-normal">
                        {isBn 
                          ? 'আপনার আবেদনপত্র অগ্রাধিকার স্ক্রীনিং পার করেছে। আঞ্চলিক কোহর্টে আপনাকে স্বাগত!' 
                          : 'Your application hash has bypassed priority screening. Welcome to the regional cohort!'}
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-lg font-mono">
                      <span className="text-[10px] text-[#64748B] dark:text-slate-400 uppercase block tracking-wider">COHORT_REFERENCE_HASH</span>
                      <strong className="text-orange-600 dark:text-orange-400 text-sm tracking-widest block mt-0.5">{successCode}</strong>
                    </div>

                    <p className="text-[10px] text-[#64748B] dark:text-slate-400 leading-normal">
                      {isBn 
                        ? 'একজন আঞ্চলিক নিরাপত্তা প্রধান আপনার সাথে কাস্টম সময়সূচী এবং একটি পিডিএফ নির্দেশিকা টুলকিট নিয়ে ৬ কর্মঘণ্টার মধ্যে যোগাযোগ করবেন।'
                        : 'A regional safety marshal will email you with your custom schedule and a PDF induction toolkit within 6 working hours.'}
                    </p>

                    <button
                      onClick={() => setSuccessCode(null)}
                      className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:text-[#0F172A] dark:text-white underline cursor-pointer"
                    >
                      {isBn ? 'অন্য কাজের ক্ষেত্রের জন্য আবেদন করুন' : 'Apply for separate activity domain'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Note signature */}
            <div className="border-t border-slate-200 dark:border-slate-800/60 pt-4 mt-6 text-[10.5px] text-[#64748B] dark:text-slate-400 font-mono text-center">
              {isBn ? 'নিবন্ধনকারী স্বেচ্ছাসেবক: শ্রীরামপুর নেস্ট কোহর্ট ২০২৬।' : 'Registrar Volunteer: Sreerampore Nest Cohort 2026.'}
            </div>
          </div>

        </div>

        {/* 15+ ACTIVE VOLUNTEERS SHOWCASE SECTION */}
        <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800/60 relative">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#C5A059]/5 blur-3.5xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A059] px-3.5 py-1.5 rounded bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase">
              {isBn ? 'সক্রিয় স্বেচ্ছাসেবক কোহর্ট' : 'ACTIVE VOLUNTEER COHORT'}
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1E293B] dark:text-white mt-4 tracking-tight">
              {isBn ? 'আমাদের মাঠপর্যায়ের মানব শক্তি (১৫+ সক্রিয় স্বেচ্ছাসেবক)' : 'Our Dedicated Field Force (15+ Active Volunteers)'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-450 font-sans mt-2 leading-relaxed">
              {isBn 
                ? 'হিন্দমোটর, শ্রীরামপুর এবং হুগলীর প্রান্তিক এলাকাগুলিতে যারা অক্লান্ত পরিশ্রম করে আমাদের কার্যক্রমের প্রতিটি সেবাকে পৌঁছে দিচ্ছেন।'
                : 'Meet the passionate warriors driving change across Hindmotor, Sreerampore, and suburban Hooghly district hubs.'}
            </p>
          </div>

          {/* Filters & Search Controls specifically for active volunteers */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 text-xs">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'All', labelEn: 'All Volunteers', labelBn: 'সব স্বেচ্ছাসেবক' },
                { id: 'food', labelEn: 'Food Security', labelBn: 'খাদ্য নিরাপত্তা' },
                { id: 'children', labelEn: 'Child Welfare', labelBn: 'শিশু কল্যাণ' },
                { id: 'community', labelEn: 'Community Core', labelBn: 'কমিউনিটি কোর' }
              ].map((cat) => {
                const isActive = activeCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                    className={`px-3 py-2 font-mono uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#C5A059] border-[#C5A059] text-white font-bold'
                        : 'bg-white dark:bg-[#1A2332]/60 border-slate-200 dark:border-slate-800 text-slate-450 hover:text-[#0F172A] dark:text-white hover:border-slate-700'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {isBn ? cat.labelBn : cat.labelEn}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder={isBn ? 'নাম, ভূমিকা বা স্থান দিয়ে খুঁজুন...' : 'Search by name, role or location...'}
                value={activeSearchQuery}
                onChange={(e) => setActiveSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#1A2332]/80 border border-slate-200 dark:border-slate-800 placeholder-slate-500 dark:placeholder-slate-400 text-xs text-[#0F172A] dark:text-slate-200 rounded-lg pl-9 pr-9 py-2 focus:outline-none focus:border-[#C5A059]/60 transition-all font-mono"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-slate-400">
                <Search className="h-3.5 w-3.5" />
              </div>
              {activeSearchQuery && (
                <button
                  type="button"
                  onClick={() => setActiveSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-slate-400 hover:text-[#334155] dark:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active Volunteers Grid */}
          {filteredVolunteers.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1A2332]/20 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md mx-auto">
              <Users className="h-8 w-8 text-[#334155] dark:text-slate-300 mx-auto mb-2" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-slate-300">
                {isBn ? 'কোনো স্বেচ্ছাসেবক পাওয়া যায়নি' : 'No volunteers found'}
              </h4>
              <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-1 px-4">
                {isBn 
                  ? `"${activeSearchQuery}" নামের সাথে মিল সম্পন্ন কোনো নিবেদিত স্বেচ্ছাসেবক উদ্ধার করা সম্ভব হয়নি।`
                  : `No registered active volunteers matched "${activeSearchQuery}" for current criteria.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVolunteers.map((vol, index) => (
                <motion.div
                  key={vol.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.25) }}
                  className="glass-panel glass-card-hover p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden group rounded-xl"
                >
                  {/* Subtle top horizontal indicator */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 dark:from-cyan-500/20 via-emerald-500/20 to-transparent pointer-events-none" />

                  <div>
                    {/* Header: Initial avatar & Badge category */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      {/* Geometric Initials Avatar */}
                      <div className="h-9 w-9 bg-white dark:bg-[#1A2332] border border-blue-600/20 dark:border-cyan-400/30 flex items-center justify-center text-xs font-mono font-bold text-orange-600 dark:text-orange-400 group-hover:border-blue-600/20 dark:border-cyan-400/30 transition-colors rounded">
                        {vol.initials}
                      </div>

                      {/* Domain Badge */}
                      <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 border bg-white dark:bg-[#1A2332]/60 text-orange-600 dark:text-orange-400 border-emerald-500/10 uppercase">
                        {isBn ? vol.badgeBn : vol.badgeEn}
                      </span>
                    </div>

                    {/* Volunteer details: Name & Role */}
                    <h4 className="font-display font-bold text-sm text-[#1E293B] dark:text-white group-hover:text-blue-600 dark:text-cyan-400 transition-colors">
                      {isBn ? vol.nameBn : vol.nameEn}
                    </h4>
                    <p className="text-2xs font-mono text-orange-600 dark:text-orange-400/80 font-bold uppercase tracking-wider mt-0.5 leading-tight">
                      {isBn ? vol.roleBn : vol.roleEn}
                    </p>

                    {/* Metadata indicators: Location */}
                    <div className="flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 font-sans mt-4 text-2xs">
                      <MapPin className="h-3 w-3 text-orange-600 dark:text-orange-400/80" />
                      <span className="truncate">{isBn ? vol.locBn : vol.locEn}</span>
                    </div>
                  </div>

                  {/* Footer status bar containing real hours & streak counters */}
                  <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/60 pt-3.5 mt-5">
                    {/* Hours Contributed */}
                    <div className="flex items-center gap-1 text-slate-450 text-[10px] font-mono">
                      <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400/80" />
                      <span>
                        <strong>{vol.hoursContributed}</strong> {isBn ? 'ঘণ্টা' : 'Hrs'}
                      </span>
                    </div>

                    {/* Streaks (Active days) */}
                    <div className="flex items-center gap-0.5 text-blue-600 dark:text-cyan-400 text-[10px] font-mono bg-blue-600/5 dark:bg-cyan-400/10 px-1.5 py-0.5 rounded border border-blue-600/20 dark:border-cyan-400/30">
                      <Flame className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400 fill-amber-500/10 animate-pulse" />
                      <span>
                        <strong>{vol.streakDays}d</strong>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Global network aggregate banner statistics */}
          <div className="mt-12 p-5 bg-white dark:bg-[#1A2332]/30 border border-slate-200 dark:border-slate-800 rounded-xl text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-1.5 text-orange-600 dark:text-orange-400 font-mono text-[10px] uppercase tracking-widest mb-1.5">
              <ShieldCheck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              {isBn ? 'স্বেচ্ছাসেবক সম্মতিপত্র নিয়মাবলী' : 'VOLUNTEER COHORT STANDARDS'}
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#64748B] dark:text-slate-400 font-sans leading-relaxed">
              {isBn 
                ? 'আমাদের নেটওয়ার্কের সকল স্বেচ্ছাসেবক ব্যাকগ্রাউন্ড চেক ও সেফটি ট্রেনিং মডিউল সম্পূর্ণ করেছেন। তাঁরা প্রত্যেকে মানবতার সেবায় নিবেদিত হয়ে সামাজিক পরিবর্তনে নেতৃত্ব দিচ্ছেন।' 
                : 'All listed active cohort members represent priority candidates who completed fundamental child-safety and field disaster training models to act on municipal platforms.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

