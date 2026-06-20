import React from 'react';
import { motion } from 'motion/react';
import { PieChart, ShieldCheck, FileText, Download } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

import AnimatedCounter from '../AnimatedCounter';

export default function TransparencyPortal() {
  const { language } = useLanguage();

  const toBnNo = (numStr: string) => {
    if (language !== 'bn') return numStr;
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      ',': ',', '+': '+', '%': '%'
    };
    return numStr.split('').map(char => map[char] || char).join('');
  };

  const allocationData = [
    { label: language === 'bn' ? 'খাদ্য সামগ্রী' : 'Food Ingredients', val: 45, color: '#1E3A8A' },
    { label: language === 'bn' ? 'লজিস্টিক ও রান্নাঘর' : 'Logistics & Kitchen', val: 25, color: '#138808' },
    { label: language === 'bn' ? 'শিশু শিক্ষা সহায়তা' : 'Child Education Aid', val: 15, color: '#FF9933' },
    { label: language === 'bn' ? 'শারীরিক পুনর্বাসন' : 'Disability Mobility', val: 10, color: '#64748b' },
    { label: language === 'bn' ? 'প্রশাসনিক সমর্থন' : 'Admin Support', val: 5, color: '#cbd5e1' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <PieChart className="h-6 w-6 text-emerald-600" />
            <h3 className="font-display font-bold text-xl text-[#0F172A] dark:text-white">
              {language === 'bn' ? 'নিরীক্ষিত তহবিল বন্টন (২০২৬)' : 'Audited Fund Disbursal (2026)'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <svg width="220" height="220" viewBox="0 0 42 42" className="transform -rotate-90">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#1E3A8A" strokeWidth="5" strokeDasharray="45 55" strokeDashoffset="100" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#138808" strokeWidth="5" strokeDasharray="25 75" strokeDashoffset="55" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#FF9933" strokeWidth="5" strokeDasharray="15 85" strokeDashoffset="30" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#94a3b8" strokeWidth="5" strokeDasharray="10 90" strokeDashoffset="15" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#cbd5e1" strokeWidth="5" strokeDasharray="5 95" strokeDashoffset="5" />
              </svg>
            </div>
            
            <div className="space-y-4">
              {allocationData.map((d, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{d.label}</span>
                  </div>
                  <span className="font-mono text-xs font-black text-[#0F172A] dark:text-white bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                    <AnimatedCounter value={d.val} language={language} />%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 text-white p-8 rounded-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
               <ShieldCheck className="h-8 w-8 text-emerald-200" />
               <h4 className="text-2xl font-black">100% Tax Efficiency</h4>
            </div>
            <p className="text-emerald-50 text-sm leading-relaxed max-w-xl">
              Our fiscal routing model ensures that the maximum possible value reach the ground level. We minimize overhead costs by utilizing automated logistics tracking.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 text-xs font-bold font-mono">
               <span className="bg-white/10 px-3 py-1.5 rounded border border-white/20">80G COMPLIANT</span>
               <span className="bg-white/10 px-3 py-1.5 rounded border border-white/20">CSR REG NO: CSR00071302</span>
               <span className="bg-white/10 px-3 py-1.5 rounded border border-white/20">MSME UDYAM CERT</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <h3 className="font-display font-bold text-lg text-[#0F172A] dark:text-white px-2">
           Compliance Vault
        </h3>
        <div className="space-y-3">
          {[
            { n: 'Annual Audit 2025-26', s: '4.2 MB' },
            { n: '80G Exemption Certificate', s: '1.1 MB' },
            { n: 'Section 12A Governance', s: '2.4 MB' },
            { n: 'Impact Ledger Log v2.1', s: '12.8 MB' },
          ].map((doc, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 5 }}
              className="p-4 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-sm flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">{doc.n}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{doc.s}</p>
                </div>
              </div>
              <Download className="h-4 w-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </motion.div>
          ))}
        </div>

        <div className="p-6 border border-dashed border-slate-300 dark:border-slate-800 rounded-sm text-center">
           <p className="text-xs text-slate-500 italic">
             "To secure investor trust, our operational frameworks function exactly like public corporations."
           </p>
        </div>
      </div>
    </div>
  );
}
