import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, RefreshCcw, Globe, Shield, ExternalLink, MoreVertical } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

interface DashboardWrapperProps {
  children: React.ReactNode;
  subdomain: string;
  onBack: () => void;
  title: string;
}

export default function DashboardWrapper({ children, subdomain, onBack, title }: DashboardWrapperProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0F172A] min-h-[70vh] rounded-sm border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Professional Browser-style Header */}
      <div className="bg-white dark:bg-[#1E293B] border-b border-slate-200 dark:border-slate-800 p-3 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer text-[#64748B] dark:text-slate-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-amber-400 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 opacity-80" />
          </div>
        </div>

        {/* URL Bar mimicking subdomain */}
        <div className="flex-1 w-full sm:w-auto bg-[#F1F5F9] dark:bg-[#0F172A] rounded-md border border-slate-200 dark:border-slate-800 px-4 py-1.5 flex items-center gap-2 group">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Shield className="h-3.5 w-3.5" />
            <span className="text-[10px] font-bold font-mono tracking-tighter uppercase">Secure</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-800 mx-1" />
          <div className="flex-1 flex items-center gap-1 overflow-hidden">
            <span className="text-slate-400 font-mono text-xs hidden sm:inline">https://</span>
            <span className="text-[#1E3A8A] dark:text-blue-400 font-mono text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {subdomain}
            </span>
          </div>
          <div className="flex items-center gap-3">
             <RefreshCcw className="h-3 w-3 text-slate-400 cursor-pointer hover:rotate-180 transition-transform duration-500" />
             <ExternalLink className="h-3 w-3 text-slate-400 cursor-pointer" />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 ml-2">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language === 'bn' ? 'সিস্টেম স্ট্যাটাস' : 'System Status'}</p>
            <p className="text-xs font-mono font-bold text-emerald-600">ONLINE_AUDIT_V4.2</p>
          </div>
          <MoreVertical className="h-5 w-5 text-slate-400" />
        </div>
      </div>

      {/* Internal Title Area */}
      <div className="px-8 pt-8 pb-4 flex items-center justify-between">
        <h2 className="font-display font-black text-2xl text-[#0F172A] dark:text-white uppercase tracking-tight">
          {title}
        </h2>
        <div className="text-[10px] font-mono font-bold text-[#64748B] dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded-sm border border-slate-200 dark:border-slate-800">
           Ref: AMF-{subdomain.split('.')[0].toUpperCase()}-2026
        </div>
      </div>

      {/* Content scroll area */}
      <div className="p-8 pt-4">
        {children}
      </div>
    </div>
  );
}
