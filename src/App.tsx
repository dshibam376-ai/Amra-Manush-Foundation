import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import Members from './components/Members';
import Flagship from './components/Flagship';
import Dashboard from './components/Dashboard';
import Pillars from './components/Pillars';
import SuccessStories from './components/SuccessStories';
import Partnerships from './components/Partnerships';
import Transparency from './components/Transparency';
import FAQSection from './components/FAQSection';
import Gallery from './components/Gallery';
import Volunteer from './components/Volunteer';
import Donation from './components/Donation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import SectionLayout from './components/SectionLayout';
import { useLanguage } from './lib/LanguageContext';

function LandingPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleNavigate = (sectionId: string) => {
    const targetId = sectionId === 'about' ? 'overview' : sectionId;
    setActiveSection(sectionId);
    
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  useEffect(() => {
    const sections = [
      'hero', 'about', 'members', 'flagship', 'dashboard-pillars', 
      'gallery', 'partnerships', 'volunteer', 'donate', 'contact'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            const mappedSection = (section === 'overview' || section === 'members') ? 'about' : section;
            setActiveSection(mappedSection);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-[var(--text-body)] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-500/35 dark:selection:text-blue-100 transition-all duration-300 relative">
      <Header onNavigate={handleNavigate} activeSection={activeSection} language={language} setLanguage={setLanguage} />
      <main id="main-content" className="flex-grow">
        <Hero onNavigate={handleNavigate} />
        <div id="about"><Overview /></div>
        <div id="members"><Members /></div>
        <div id="flagship"><Flagship onDonateClick={() => handleNavigate('donate')} /></div>
        <div id="dashboard-pillars" className="space-y-0">
          <Dashboard />
          <Pillars />
          <Transparency />
        </div>
        <div id="gallery">
          <SuccessStories />
          <Gallery />
        </div>
        <div id="partnerships"><Partnerships /></div>
        <div id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 mb-12"><FAQSection /></div>
        <div id="volunteer"><Volunteer /></div>
        <div id="donate"><Donation /></div>
        <div id="contact"><Contact /></div>
      </main>
      <Footer onNavigate={handleNavigate} />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Standalone Subdomain Pages */}
      <Route path="/about" element={
        <SectionLayout title={language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'} subdomain="about">
          <Overview />
          <div className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
            <Members />
          </div>
        </SectionLayout>
      } />
      
      <Route path="/flagship" element={
        <SectionLayout title={language === 'bn' ? 'আগামী ইভেন্টসমূহ' : 'Upcoming Events'} subdomain="events">
          <Flagship onDonateClick={() => navigate('/donate')} />
        </SectionLayout>
      } />

      <Route path="/dashboard-pillars" element={
        <SectionLayout title={language === 'bn' ? 'ড্যাশবোর্ড ও স্তম্ভসমূহ' : 'Dashboard & Pillars'} subdomain="dashboard-pillars">
          <Dashboard />
          <Pillars />
          <Transparency />
        </SectionLayout>
      } />

      <Route path="/gallery" element={
        <SectionLayout title={language === 'bn' ? 'গ্যালারি' : 'Gallery'} subdomain="gallery">
          <SuccessStories />
          <Gallery />
        </SectionLayout>
      } />

      <Route path="/partnerships" element={
        <SectionLayout title={language === 'bn' ? 'অংশীদারিত্ব' : 'Partnerships'} subdomain="csr">
          <Partnerships />
        </SectionLayout>
      } />

      <Route path="/volunteer" element={
        <SectionLayout title={language === 'bn' ? 'স্বেচ্ছাসেবী পোর্টাল' : 'Volunteer Portal'} subdomain="volunteer">
          <Volunteer />
        </SectionLayout>
      } />

      <Route path="/donate" element={
        <SectionLayout title={language === 'bn' ? 'সহায়তা করুন' : 'Support Us'} subdomain="donate">
          <Donation />
        </SectionLayout>
      } />

      <Route path="/contact" element={
        <SectionLayout title={language === 'bn' ? 'যোগাযোগ গেটওয়ে' : 'Contact Gateway'} subdomain="contact">
          <Contact />
        </SectionLayout>
      } />
    </Routes>
  );
}
