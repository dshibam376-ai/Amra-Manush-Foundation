import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FOUNDATION_MEMBERS } from '../data';
import { ShieldCheck, Mail, Linkedin, Users, Award, Landmark, UserCheck, Search, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Members() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { t, language } = useLanguage();

  const categories = ['All', 'Governing Body', 'Executive Team', 'PR Team', 'FW Team'];

  const getCategoryLabel = (cat: string) => {
    if (language !== 'bn') return cat;
    switch (cat) {
      case 'All': return 'সবাই';
      case 'Governing Body': return 'পরিচালনা পর্ষদ';
      case 'Executive Team': return 'নির্বাহী দল';
      case 'PR Team': return 'জনসংযোগ দল';
      case 'FW Team': return 'মাঠকর্মী দল';
      default: return cat;
    }
  };

  const getMemberTranslations = (id: string) => {
    if (language !== 'bn') return null;
    switch (id) {
      case 'member-sanjit':
        return {
          name: 'সঞ্জিত হাজরা',
          post: 'বোর্ড অব প্রেসিডেন্ট (BOP)',
          roleDescription: 'গভর্ন্যান্স কনভোকেশনের সভাপতিত্ব করেন, উচ্চ-স্তরের নীতি কাঠামো অনুমোদন করেন এবং বিধিবদ্ধ নিয়মকানুন মেনে চলা নিশ্চিত করেন।'
        };
      case 'member-sreejit':
        return {
          name: 'শ্রীজিৎ দাশগুপ্ত',
          post: 'সাধারণ সম্পাদক (GS)',
          roleDescription: 'সামগ্রিক প্রশাসনিক কার্যক্রম ও পাবলিক সেক্রেটারিয়েট সমন্বয় করেন এবং অফিসিয়াল চিঠিপত্র ও শাসন সংক্রান্ত সামাজিক অডিট পরিচালনা করেন।'
        };
      case 'member-bijay':
        return {
          name: 'বিজয় দাস',
          post: 'অর্থ কর্মকর্তা (FO)',
          roleDescription: 'যৌথ-স্বাক্ষর ব্যয়ের অনুমোদন প্রক্রিয়া পরিচালনা করেন, ব্যাংক পরিচালনা করেন এবং প্রতিষ্ঠানের অফিসিয়াল অ্যাকাউন্ট ব্যালেন্স শিট তদারকি করেন।'
        };
      case 'member-shibraj':
        return {
          name: 'শিবরাজ দাস',
          post: 'সহকারী অর্থ কর্মকর্তা',
          roleDescription: 'আর্থিক লেজার এন্ট্রিগুলিতে সহায়তা করেন, মাঠ পর্যায়ের ক্যাশ ফ্লো পর্যবেক্ষণ করেন এবং ভাউচার যাচাইকরণ সমন্বয় করেন।'
        };
      case 'member-abhay':
        return {
          name: 'অভয় মাহাতো',
          post: 'নির্বাহী পরিচালক (ED)',
          roleDescription: '"একবেলার আহার অভিযান" কার্যক্রমের মাঠ পর্যায়ের বাস্তবায়ন, কিচেন শিডিউল এবং রান্নাঘরের রেশনের সামগ্রী সরবরাহকারী সম্পর্ক পরিচালনা করেন।'
        };
      case 'member-nitish':
        return {
          name: 'নীতিশ শ',
          post: 'সহ-নির্বাহী পরিচালক',
          roleDescription: 'মাঠ পর্যায়ের কাঠামোগত পরিকল্পনা, পরিবহন ও খাদ্য সুরক্ষা অপারেশন এবং কুইক সার্ভিস রান্নাঘরের স্বাস্থ্যবিধি নিশ্চিতকরণে সহায়তা করেন।'
        };
      case 'member-indrajit':
        return {
          name: 'ইন্দ্রজিৎ পাল',
          post: 'প্রোগ্রাম ম্যানেজার (PM)',
          roleDescription: 'সক্রিয় সামাজিক অভিযানগুলি তদারকি করেন, স্বেচ্ছাসেবকদের শিফট ডিজাইন করেন এবং পুষ্টি লক্ষ্যমাত্রার ম্যাট্রিক্স সমন্বয় করেন।'
        };
      case 'member-debjit':
        return {
          name: 'দেবজিৎ রাহা',
          post: 'সহ-প্রোগ্রাম ম্যানেজার',
          roleDescription: 'কার্যক্রম বাস্তবায়নে সহায়তা করেন, প্রতিদিনের খাবার বিতরণ লজিস্টিকস তদারকি করেন এবং ডাটা লগ পরিচালনা করেন।'
        };
      case 'member-pr-manojit':
        return {
          name: 'মনোজিত চক্রবর্তী',
          post: 'জনসংযোগ দল',
          roleDescription: 'সামাজিক সহযোগী অংশীদার ও সংবাদ মাধ্যমের সাথে যুক্ত হন এবং কর্পোরেট স্পন্সরদের সাথে স্বচ্ছ রিপোর্ট শেয়ার করেন।'
        };
      case 'member-pr-shibam':
        return {
          name: 'শিবম দাস',
          post: 'জনসংযোগ দল',
          roleDescription: 'অনলাইন যোগাযোগ মাধ্যম, সামাজিক ক্যাম্পের ঘোষণা এবং অনুদান সংগ্রহকারী সার্কেল পরিচালনায় কাজ করেন।'
        };
      case 'member-pr-paras':
        return {
          name: 'পরশ দে সরকার',
          post: 'জনসংযোগ দল',
          roleDescription: 'সামাজিক আস্থা বৃদ্ধির কাজে যুক্ত থাকেন, ডিজিটাল নোটিস বোর্ড পরিচালনা করেন এবং উপকারভোগী সফলতার তথ্য সংরক্ষণ করেন।'
        };
      case 'member-pr-subha':
        return {
          name: 'শুভ দাস',
          post: 'জনসংযোগ দল',
          roleDescription: 'স্থানীয় সামাজিক সম্পৃক্ততা বৃদ্ধি ও সমন্বয়, অনুদানের রসিদ পৌঁছানো এবং প্রকাশ্য প্রশ্নাবলীর উত্তর প্রদানের কাজ করেন।'
        };
      case 'member-pr-soham':
        return {
          name: 'সোহম ঘোষ',
          post: 'জনসংযোগ দল',
          roleDescription: 'সামাজিক যোগাযোগ কার্যক্রম তদারকি করেন, অফিসিয়াল ফটোগ্রাফি ও মিডিয়া রুলস পরিচালনা এবং মাসিক খসড়া রিপোর্ট তৈরি করেন।'
        };
      case 'member-pr-sirshendu':
        return {
          name: 'শীর্ষেন্দু রায়',
          post: 'জনসংযোগ দল',
          roleDescription: 'বহিরাগত নেটওয়ার্কিং পরিকল্পনায় সহায়তা করেন, কর্পোরেট অংশীদারদের সাথে সংযোগ স্থাপন এবং নিউজলেটার সরবরাহ করেন।'
        };
      case 'member-fw-samu':
        return {
          name: 'সামু দাস',
          post: 'মাঠকর্মী দল (FW)',
          roleDescription: 'খাদ্য বিতরণ লজিস্টিকস এবং সক্রিয় বিতরণ ক্যাম্প পরিচালনা করেন এবং খাবারের গুণগত মান নিরীক্ষণ করেন।'
        };
      case 'member-fw-soumodeep':
        return {
          name: 'সৌমোদীপ বিশ্বাস',
          post: 'মাঠকর্মী দল (FW)',
          roleDescription: 'সরাসরি ক্ষেত্রীয় যোগাযোগ, স্থানীয় যুব স্বেচ্ছাসেবকদের দিকদিকনির্দেশ এবং রান্নাঘরের পরিচ্ছন্নতা কার্যক্রম পরিচালনা করেন।'
        };
      case 'member-fw-deb':
        return {
          name: 'দেব দাস',
          post: 'মাঠকর্মী দল (FW)',
          roleDescription: 'খাদ্য বিতরণ কেন্দ্রের অন-গ্রাউন্ড পরিচালনা এবং চাল-ডাল ইত্যাদি খাদ্য উপাদানের ইনভেন্টরি যাচাইকরণ তদারকি করেন।'
        };
      case 'member-fw-suvonkar':
        return {
          name: 'শুভঙ্কর গোস্বামী',
          post: 'মাঠকর্মী দল (FW)',
          roleDescription: 'অসহায়, পরিবারহীন এবং একাকী বসবাসকারী প্রান্তিক প্রবীণদের ঘরে ঘরে খাবার পৌঁছে দেওয়ার দায়িত্ব পালন করেন।'
        };
      case 'member-fw-sadhitra':
        return {
          name: 'সাধিত্র ভট্টাচার্য',
          post: 'মাঠকর্মী দল (FW)',
          roleDescription: 'গরম খাবার প্রস্তুত হওয়ার এক ঘণ্টার মধ্যে পরিবেশন বা বণ্টনের জন্য সবচেয়ে নিখুঁত লজিস্টিকস রুট ডিজাইন করেন।'
        };
      case 'member-fw-subhodeep':
        return {
          name: 'শুভদীপ মিত্র',
          post: 'মাঠকর্মী দল (FW)',
          roleDescription: 'দৈনিক কিচেন রিডিং এবং রান্নাঘরের যৌথ তালিকাযুক্ত ইনভেন্টরি স্প্রেডশীট পুঙ্খানুপুঙ্খ যাচাই করার কাজ করেন।'
        };
      default:
        return null;
    }
  };

  const filteredMembers = FOUNDATION_MEMBERS.filter(member => {
    const matchesCategory = selectedCategory === 'All' || member.badge === selectedCategory;
    
    // Dynamic naming mapping inside search filter
    const trans = getMemberTranslations(member.id);
    const mName = trans ? trans.name : member.name;
    const mPost = trans ? trans.post : member.post;

    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.post.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mPost.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="members" className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
      {/* Background radial overlays */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-600 dark:bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#1E3A8A] uppercase px-3 py-1 rounded bg-blue-600/5 dark:bg-[#1E293B] border border-blue-600/20 dark:border-cyan-400/30">
            {language === 'bn' ? 'ফাউন্ডেশন গভর্ন্যান্স কমিটি' : 'FOUNDATION GOVERNANCE'}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            {t('members.title')}
          </h2>
          <p className="text-sm text-[#64748B] dark:text-slate-400 mt-4 max-w-xl mx-auto font-sans leading-relaxed">
            {t('members.subtitle')}
          </p>
          <div className="h-1 w-16 bg-[#138808] mx-auto mt-6 rounded-none" />
        </div>

        {/* Categories & Search Filter Controls Section */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-12 max-w-7xl mx-auto">
          {/* Categories Navigation Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-mono font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1E3A8A] border-[#1E3A8A] text-white'
                      : 'bg-white dark:bg-[#1A2332]/60 border-slate-300 dark:border-slate-800 text-[#0F172A] dark:text-slate-400 hover:text-black dark:text-white hover:border-slate-700'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  {getCategoryLabel(category)}
                </button>
              );
            })}
          </div>

          {/* Real-time search bar */}
          <div className="relative w-full lg:max-w-xs">
            <input
              type="text"
              placeholder={language === 'bn' ? 'সদস্য বা পদের নাম দিয়ে খুঁজুন...' : 'Search members or posts...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#1A2332]/80 border border-slate-200 dark:border-slate-800 hover:border-slate-700/80 placeholder-slate-500 dark:placeholder-slate-400 text-xs text-[#0F172A] dark:text-white rounded-lg pl-9 pr-9 py-2.5 focus:outline-none focus:border-blue-600/60 transition-all font-mono"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-slate-400">
              <Search className="h-3.5 w-3.5" />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-slate-400 hover:text-[#334155] dark:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Members Grid & Empty Fallback States */}
        {filteredMembers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white dark:bg-[#1A2332]/10 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg mx-auto"
          >
            <Users className="h-10 w-10 text-[#334155] dark:text-slate-200 mx-auto mb-3" />
            <h4 className="font-display font-semibold text-[#1E293B] dark:text-slate-200 text-sm uppercase tracking-wider">
              {language === 'bn' ? 'কোনো সদস্য খুঁজে পাওয়া যায়নি' : 'No matching officials found'}
            </h4>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-2 px-6 leading-relaxed">
              {language === 'bn' 
                ? `আমরা "${selectedCategory}" ক্যাটাগরির অধীনে "${searchQuery}" মিল থাকা কোনো কর্মকর্তাকে খুঁজে পাইনি। সঠিক বানান বা পদ ব্যবহারে চেষ্টা করুন।`
                : `We couldn't track any officers matching "${searchQuery}" under category "${getCategoryLabel(selectedCategory)}". Use literal names or designations.`
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-5 px-4 font-bold py-1.5 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 hover:border-blue-600/40 text-[#1E3A8A] text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer"
              style={{ borderRadius: '2px' }}
            >
              {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, i) => {
                const trans = getMemberTranslations(member.id);
                const name = trans ? trans.name : member.name;
                const post = trans ? trans.post : member.post;
                const roleDescription = trans ? trans.roleDescription : member.roleDescription;
                
                return (
                  <motion.div
                    layout
                    key={member.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    whileHover={{ 
                      y: -6,
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    className="glass-panel p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden text-left cursor-default"
                  >
                    {/* Subtle corner highlight */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />

                    <div>
                      {/* Card Header Profile Row */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        {/* Unique Geometric Initials Avatar */}
                        <div className="h-12 w-12 border border-[#1E3A8A]/20 bg-white dark:bg-[#1A2332] flex items-center justify-center text-sm font-mono font-bold text-[#1E3A8A] group-hover:border-blue-600/60 transition-all duration-300">
                          {member.avatarInitials}
                        </div>

                        {/* Officer Status Badge */}
                        {member.badge && (
                          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                            member.badge === 'Governing Body' 
                              ? 'bg-[#1E3A8A]/5 border-[#1E3A8A]/30 text-[#1E3A8A]' 
                              : member.badge === 'Executive Team'
                              ? 'bg-orange-50 dark:bg-orange-500/5 border border-orange-200/30 text-orange-700 dark:text-orange-400'
                              : member.badge === 'PR Team'
                              ? 'bg-[#3b82f6]/5 border-[#3b82f6]/20 text-[#3b82f6]'
                              : 'bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200/20 text-[#138808]'
                          }`}>
                            {getCategoryLabel(member.badge)}
                          </span>
                        )}
                      </div>

                      {/* Member Name and Position */}
                      <h3 className="font-display font-semibold text-lg text-[#1E293B] dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest font-semibold mb-3">
                        {post}
                      </p>

                      {/* Character/Role description */}
                      <p className="text-xs sm:text-[13px] text-[#334155] dark:text-slate-300 leading-relaxed font-sans mt-3 border-t border-slate-200 dark:border-slate-800/60 pt-3">
                        {roleDescription}
                      </p>
                    </div>

                    {/* Card Footer Interaction Bar */}
                    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-4 mt-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#138808]" />
                        {language === 'bn' ? 'অনুমোদিত ও যাচাইকৃত' : 'Verified Official'}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <a
                          href={member.email ? `mailto:${member.email}` : "mailto:amramanushfoundation@gmail.com"}
                          title={`Contact ${name}`}
                          className="p-1 px-1.5 bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all cursor-pointer"
                          style={{ borderRadius: '2px' }}
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn Profile"
                          className="p-1 px-1.5 bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all cursor-pointer"
                          style={{ borderRadius: '2px' }}
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Fiduciary Commitment Disclaimer */}
        <div className="mt-12 p-5 bg-white dark:bg-[#1A2332]/40 border border-[#1E3A8A]/10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#64748B] dark:text-slate-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Landmark className="h-4 w-4 text-[#1E3A8A]" />
            {language === 'bn' ? 'যৌথ প্রশাসনিক জবাবদিহিতা' : 'Joint Administrative Accountability'}
          </div>
          <p className="text-[11px] sm:text-xs text-[#64748B] dark:text-slate-400 font-sans leading-relaxed">
            {language === 'bn' 
              ? 'সকল ব্যাংক লেনদেন, প্রকিউরমেন্ট নিরীক্ষা এবং সামাজিক তহবিল যৌথ স্বাক্ষর দ্বারা পরিচালিত হয়, যা যেকোনো অনিয়ম বা অনধিকার চর্চা রুখতে সম্পূর্ণ সুরক্ষার প্রতিশ্রুতি দেয়।'
              : 'All bank transactions, procurement audits, and community funds are governed by double-party endorsement requirements, ensuring absolute protection against individual discretion or mismanagement.'
            }
          </p>
        </div>

      </div>
    </section>
  );
}
