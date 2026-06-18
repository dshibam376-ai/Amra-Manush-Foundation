import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  PieChart, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Lock, 
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

interface DashboardCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subdomain: string;
  onClick: (id: string) => void;
  accent: string;
  key?: React.Key;
}

const DashboardCard = ({ id, title, description, icon, subdomain, onClick, accent }: DashboardCardProps) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
    className="group bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-sm p-6 cursor-pointer flex flex-col justify-between h-full transition-all"
    onClick={() => onClick(id)}
  >
    <div>
      <div className={`p-3 rounded-sm w-fit mb-6 transition-colors ${accent} group-hover:scale-110 duration-300`}>
        {icon}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono font-bold tracking-tighter text-[#64748B] dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          {subdomain}
        </span>
      </div>
      <h3 className="font-display font-bold text-xl text-[#0F172A] dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[#475569] dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
    <div className="mt-8 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
      <span className="flex items-center gap-1.5">
        Enter Dashboard <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
      <BarChart3 className="h-4 w-4 opacity-20 group-hover:opacity-100 transition-opacity" />
    </div>
  </motion.div>
);

export default function DashboardHub({ onSelect }: { onSelect: (id: string) => void; key?: React.Key }) {
  const { language } = useLanguage();

  const dashboards = [
    {
      id: 'impact',
      title: language === 'bn' ? 'ইমপ্যাক্ট অ্যান্ড ডেলিভারি পোর্টাল' : 'Impact & Delivery Portal',
      subdomain: 'impact.amramanush.org',
      description: language === 'bn' 
        ? 'আহার বিতরণ এবং সামাজিক অডিট ডেটার রিয়েল-টাইম ট্র্যাকিং। আমাদের সামাজিক লক্ষ্যের অগ্রগতি পর্যালোচনা করুন।'
        : 'Real-time tracking of meal delivery and social audit data. Review the progression of our core social missions.',
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      accent: 'bg-blue-600',
    },
    {
      id: 'transparency',
      title: language === 'bn' ? 'আর্থিক স্বচ্ছতা হাব' : 'Transparency & Governance Hub',
      subdomain: 'transparency.amramanush.org',
      description: language === 'bn'
        ? 'তহবিল ব্যবহার, প্রশাসনিক বিতরণ এবং কমপ্লায়েন্স সার্টিফিকেশন রিপোর্টের বিশদ বিবরণ দেখুন।'
        : 'Detailed breakdown of fund utilization, administrative disbursal, and compliance certification reports.',
      icon: <PieChart className="h-6 w-6 text-white" />,
      accent: 'bg-emerald-600',
    },
    {
      id: 'citizen',
      title: language === 'bn' ? 'নাগরিক বিশ্লেষণ ডেটাসেন্টার' : 'Citizen Analytics Datacenter',
      subdomain: 'analytics.amramanush.org',
      description: language === 'bn'
        ? 'জনসংখ্যাভিত্তিক শ্রেণী বিন্যাস এবং ভৌগোলিক বিস্তৃতি বিশ্লেষণ। আমাদের লক্ষ্যভিত্তিক কার্যক্রমের গভীরতা বুঝুন।'
        : 'Demographic representation and geographical reach analysis. Understand the depth of our targeted initiatives.',
      icon: <Users className="h-6 w-6 text-white" />,
      accent: 'bg-orange-600',
    },
    {
      id: 'officer',
      title: language === 'bn' ? 'অফিসিয়াল ভেরিফিকেশন গেটওয়ে' : 'Official Verification Gateway',
      subdomain: 'verified.amramanush.org',
      description: language === 'bn'
        ? 'নিবন্ধিত কর্মকর্তাদের জন্য অভ্যন্তরীণ ম্যানেজমেন্ট কনসোল। প্রমাণপত্র যাচাই এবং ফিল্ড লেভেল রিপোর্ট ম্যানেজমেন্ট।'
        : 'Internal management console for registered officers. Credential validation and field-level report management.',
      icon: <ShieldCheck className="h-6 w-6 text-white" />,
      accent: 'bg-slate-800',
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-blue-600 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <Globe className="h-3 w-3" /> Professional Ecosystem
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0F172A] dark:text-white tracking-tight">
          {language === 'bn' ? 'ফাউন্ডেশন ডাটা পোর্টাল' : 'Foundation Data Ecosystem'}
        </h2>
        <p className="text-[#64748B] dark:text-slate-400 text-lg leading-relaxed">
          {language === 'bn' 
            ? 'আমাদের প্রতিটি কার্যক্রম স্বচ্ছ এবং পেশাদারভাবে পরিচালনা নিশ্চিত করতে আমরা ভিন্ন ভিন্ন স্টেকহোল্ডারদের জন্য নির্দিষ্ট পোর্টাল ব্যবস্থা করেছি।'
            : 'To ensure maximum transparency and professional auditing, we provide specialized data portals for different organizational stakeholders.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {dashboards.map((db) => (
          <DashboardCard key={db.id} {...db} onClick={onSelect} />
        ))}
      </div>

      <div className="p-8 bg-slate-50 dark:bg-[#1A2332]/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-[#0F172A] dark:text-white text-sm">
              {language === 'bn' ? 'নিরাপদ ডেটা অ্যাক্সেস' : 'Secure Data Access Protocol'}
            </h4>
            <p className="text-xs text-[#64748B] dark:text-slate-400">
              {language === 'bn' 
                ? 'সকল অডিট লগ এবং সংবেদনশীল রিপোর্ট এনক্রিপশন প্রোটোকল দ্বারা সুরক্ষিত।' 
                : 'All audit logs and sensitive reports are protected by TLS 1.3 encryption protocols.'}
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors">
          View Documentation <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
