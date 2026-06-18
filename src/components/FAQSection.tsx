import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface FAQItem {
  id: string;
  enQuestion: string;
  enAnswer: string;
  bnQuestion: string;
  bnAnswer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    enQuestion: "How is my donation utilized?",
    enAnswer: "Our 'Direct-to-Field' system ensures 95% of your donation is used for direct aid (food, material, packaging). Only 5% covers essential operational costs.",
    bnQuestion: "আমার অনুদানের অর্থ কীভাবে ব্যবহৃত হয়?",
    bnAnswer: "আমাদের 'ডাইরেক্ট-টু-ফিল্ড' পদ্ধতির মাধ্যমে আপনার করা অনুদানের ৯৫% অর্থ সরাসরি সাহায্য (খাবার এবং সাহায্য সামগ্রী) হিসেবে ব্যবহৃত হয়। মাত্র ৫% খরচ আমাদের অন্যান্য সামগ্রিক প্রশাসনিক ব্যয় নির্বাহ করতে ব্যয়িত হয়।"
  },
  {
    id: "faq-2",
    enQuestion: "Where can I find audit reports?",
    enAnswer: "You can download our periodic audit reports in the 'Document Registry' section above, or view them directly through our dashboard.",
    bnQuestion: "আমি সামাজিক অডিট রিপোর্ট কীভাবে দেখতে পারি?",
    bnAnswer: "আপনারা আমাদের ডিজিটাল লজিস্টিকস ড্যাশবোর্ডে গিয়ে আমাদের সামাজিক অডিট রিপোর্টগুলি পর্যবেক্ষণ করতে পারেন এবং ওপরে থাকা ডকুমেন্ট রেজিস্ট্রি থেকে সেগুলো সরাসরি ডাউনলোডও করতে পারেন।"
  },
  {
    id: "faq-3",
    enQuestion: "Are you registered for corporate donations?",
    enAnswer: "Yes, we are registered under Indian trust laws and are fully compliant for CSR (Corporate Social Responsibility) funding. Please contact us for specific documentation.",
    bnQuestion: "আপনারা কি কর্পোরেট অনুদানের জন্য লাইসেন্সপ্রাপ্ত?",
    bnAnswer: "হ্যাঁ, আমরা এমএসএমই উদয়ম এবং ট্রাস্ট নিয়মানুযায়ী নিবন্ধিত এবং CSR (Corporate Social Responsibility) অনুদানের জন্য সম্পূর্ণ যোগ্য। প্রয়োজনীয় তথ্যাদি বা রিপোর্টের জন্য দয়া করে আমাদের সাথে সরাসরি যোগাযোগ করুন।"
  },
  {
    id: "faq-4",
    enQuestion: "How can I track the impact of my contribution?",
    enAnswer: "We provide geo-coded GPS confirmation photo sets and receipts for all donations directly to our administrative desks.",
    bnQuestion: "আমি আমাদের করা অনুদানের প্রকৃত প্রভাব কীভাবে নিশ্চিত হতে পারি?",
    bnAnswer: "আমরা আমাদের প্রতিটি বিতরণ কর্মসূচীর সম্পূর্ণ সততা রক্ষা করতে ফিল্ডে গিয়ে সরাসরি জিও-ট্যাগযুক্ত জিপিএস ছবি এবং পুষ্টিকর আহার বণ্টনের দৈনিক আপডেট শেয়ার করি।"
  }
];

export default function FAQSection() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="mt-12 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl text-left">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-[#1E3A8A]" />
        <h3 className="font-display font-semibold text-[#1E293B] dark:text-slate-100 text-lg">
          {language === 'bn' ? 'সাধারণ জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
        </h3>
      </div>
      
      <div className="space-y-4">
        {FAQ_DATA.map((item, index) => {
          const question = language === 'bn' ? item.bnQuestion : item.enQuestion;
          const answer = language === 'bn' ? item.bnAnswer : item.enAnswer;

          return (
            <div key={item.id} className="border border-[#E2E8F0] dark:border-[#334155] rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/10 dark:hover:bg-[#1E293B]/20 transition-colors cursor-pointer"
              >
                <span className="font-medium text-[#0F172A] dark:text-slate-200 text-sm sm:text-base">{question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <ChevronDown className="h-5 w-5 text-[#64748B] dark:text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <p className="p-4 border-t border-slate-100 dark:border-slate-800 text-[#64748B] dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
