import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  PieChart, 
  Users, 
  ShieldCheck, 
  LogIn, 
  LogOut,
  LayoutDashboard,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { auth, googleSignIn, logout } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import NoticeBanner from './NoticeBanner';
import { useLanguage } from '../lib/LanguageContext';

// Import specialized sub-dashboards
import DashboardHub from './dashboards/DashboardHub';
import DashboardWrapper from './dashboards/DashboardWrapper';
import ImpactDashboard from './dashboards/ImpactDashboard';
import TransparencyPortal from './dashboards/TransparencyPortal';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const [activeDashboard, setActiveDashboard] = useState<string | null>(null);
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

  const getDashboardConfig = (id: string) => {
    switch (id) {
      case 'impact':
        return { 
          title: language === 'bn' ? 'ইমপ্যাক্ট অ্যানালিটিক্স' : 'Social Impact Analytics', 
          subdomain: 'impact.amramanush.org',
          content: <ImpactDashboard />
        };
      case 'transparency':
        return { 
          title: language === 'bn' ? 'স্বচ্ছতা এবং গভর্ন্যান্স' : 'Transparency & Governance', 
          subdomain: 'transparency.amramanush.org',
          content: <TransparencyPortal />
        };
      case 'citizen':
        return { 
          title: language === 'bn' ? 'নাগরিক পরিসংখ্যান' : 'Citizen Demographics', 
          subdomain: 'analytics.amramanush.org',
          content: <TransparencyPortal /> // Fallback for now or reuse components
        };
      case 'officer':
        return { 
          title: language === 'bn' ? 'অফিসিয়াল গেটওয়ে' : 'Official Officer Portal', 
          subdomain: 'verified.amramanush.org',
          content: <ImpactDashboard /> // Protected content logic can be added inside
        };
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <section id="dashboard" className="py-24 bg-white dark:bg-[#1A2332] flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4 text-blue-600">
           <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
           <p className="font-mono text-xs font-bold uppercase tracking-widest">Initializing Ecosystem...</p>
        </div>
      </section>
    );
  }

  const activeConfig = activeDashboard ? getDashboardConfig(activeDashboard) : null;

  return (
    <section id="dashboard" className="py-24 border-t border-b border-slate-200 dark:border-slate-800 relative overflow-hidden bg-slate-50/50 dark:bg-[#0F172A]">
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-[#138808]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-[#FF9933]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verification Status Header Bar */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-sm shadow-sm gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${user ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                {language === 'bn' ? 'ভেরিফিকেশন স্ট্যাটাস' : 'Verification Status'}
              </p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {user 
                  ? (language === 'bn' ? `${user.displayName} (অফিসার সেশন সক্রিয়)` : `Session: ${user.displayName || "Admin Officer"}`)
                  : (language === 'bn' ? 'অতিথি মোড (লিমিটেড অ্যাক্সেস)' : 'Guest Mode (Public Data Access)')
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
               <button onClick={logout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                 <LogOut className="h-4 w-4" /> {language === 'bn' ? 'সাইন আউট' : 'Sign Out'}
               </button>
            ) : (
               <button onClick={handleLogin} className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                 <LogIn className="h-4 w-4" /> {language === 'bn' ? 'অফিসার সাইন-ইন' : 'Officer Sign-In'}
               </button>
            )}
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-black dark:hover:text-white transition-colors">
               Reports <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!activeDashboard ? (
            <DashboardHub key="hub" onSelect={setActiveDashboard} />
          ) : (
            <motion.div
              key="active-dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DashboardWrapper 
                onBack={() => setActiveDashboard(null)}
                subdomain={activeConfig?.subdomain || ""}
                title={activeConfig?.title || ""}
              >
                {activeConfig?.content}
              </DashboardWrapper>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
