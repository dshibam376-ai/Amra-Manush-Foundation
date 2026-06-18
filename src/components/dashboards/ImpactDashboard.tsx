import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp, CheckCircle, Flame, Target } from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';

export default function ImpactDashboard() {
  const { language } = useLanguage();

  const toBnNo = (numStr: string) => {
    if (language !== 'bn') return numStr;
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
      ',': ',', '+': '+', '%': '%'
    };
    return numStr.split('').map(char => map[char] || char).join('');
  };

  const mealsData = [
    { label: language === 'bn' ? 'সপ্তাহ ১' : 'Wk 1', val: 120 },
    { label: language === 'bn' ? 'সপ্তাহ ২' : 'Wk 2', val: 250 },
    { label: language === 'bn' ? 'সপ্তাহ ৩' : 'Wk 3', val: 410 },
    { label: language === 'bn' ? 'সপ্তাহ ৪' : 'Wk 4', val: 680 },
    { label: language === 'bn' ? 'সপ্তাহ ৫' : 'Wk 5', val: 1100 },
    { label: language === 'bn' ? 'সপ্তাহ ৬ (অনু.)' : 'Wk 6 (Est)', val: 1540 },
  ];

  const metrics = [
    { 
      label: language === 'bn' ? 'আহার বিতরণ' : 'Meals Distributed', 
      val: toBnNo('1,540'), 
      pct: '+24%',
      trend: 'up' 
    },
    { 
      label: language === 'bn' ? 'শিশু সহায়তা' : 'Children Supported', 
      val: toBnNo('125'), 
      pct: '+18%',
      trend: 'up' 
    },
    { 
      label: language === 'bn' ? 'স্বেচ্ছাসেবী ঘন্টা' : 'Volunteer Hours', 
      val: toBnNo('1,820'), 
      pct: '+35%',
      trend: 'up' 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white dark:bg-[#1E293B] p-6 rounded-sm border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</p>
            <div className="flex items-end justify-between">
              <h4 className="text-3xl font-black text-[#0F172A] dark:text-white">{m.val}</h4>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {toBnNo(m.pct)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1E293B] p-8 rounded-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-display font-bold text-lg text-[#0F172A] dark:text-white">
              {language === 'bn' ? 'আহার বিতরণ অগ্রগতি চিত্র (২০২৬)' : 'Meal Distribution Progression (2026)'}
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400">Weekly accumulation report based on distribution tokens.</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-200 dark:border-emerald-500/20">
             <Target className="h-3 w-3" /> {language === 'bn' ? 'নিরীক্ষা সুনিশ্চিত' : 'AUDIT VERIFIED'}
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mealsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} fontWeight={600} />
              <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#1E3A8A', fontWeight: 'bold' }}
              />
              <Bar dataKey="val" fill="#1E3A8A" radius={[2, 2, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-slate-900 text-white rounded-sm">
           <Flame className="h-6 w-6 text-orange-500 mb-4" />
           <h4 className="text-xl font-bold mb-2">Live Efficiency Metrics</h4>
           <p className="text-sm text-slate-400 mb-6">Our distribution logistics are optimized for zero-waste delivery to remote blocks.</p>
           <div className="space-y-4">
             {[
               { l: 'Cooking Start Time', v: '04:30 AM' },
               { l: 'Last Mile Dispatch', v: '08:15 AM' },
               { l: 'Quality Check Pass', v: '100%' }
             ].map((item, i) => (
               <div key={i} className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                 <span className="text-slate-500 font-mono">{item.l}</span>
                 <span className="font-bold">{item.v}</span>
               </div>
             ))}
           </div>
        </div>
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-sm flex flex-col justify-center text-center space-y-4">
          <div className="mx-auto p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-full">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold dark:text-white">Validation Status</h4>
          <p className="text-sm text-slate-500">Every meal token is cross-referenced with beneficiary ID records on the blockchain ledger.</p>
          <button className="mx-auto text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Download Audit Log (PDF)</button>
        </div>
      </div>
    </div>
  );
}
