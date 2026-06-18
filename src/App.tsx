import React, { useState, useEffect } from 'react';
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
import { useLanguage } from './lib/LanguageContext';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const { language, setLanguage } = useLanguage();

  // Unified scroll-to-view navigation mechanism
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Offset scroll for header clearance
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

  // Observe current scroll height to highlight correct navbar headers automatically
  useEffect(() => {
    const sections = [
      'hero',
      'overview',
      'members',
      'flagship',
      'dashboard',
      'pillars',
      'stories',
      'partnerships',
      'transparency',
      'gallery',
      'volunteer',
      'donate',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // middle line detection offset
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
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
      {/* Premium Luxury Navigation Rail */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} language={language} setLanguage={setLanguage} />

      {/* Structured Sections */}
      <main id="main-content" className="flex-grow">
        
        {/* Hero Section with animated stat dials */}
        <Hero onNavigate={handleNavigate} />

        {/* Executive Overview - CredentialsTimeline */}
        <div id="overview">
          <Overview />
        </div>

        {/* Foundation Members Team */}
        <div id="members">
          <Members />
        </div>

        {/* Flagship Hunger Campaign - Ekbelar Aahar Abhiyan */}
        <div id="flagship">
          <Flagship onDonateClick={() => handleNavigate('donate')} />
        </div>

        {/* Impact Dashboard - Sourced Sponsoring Analytics */}
        <div id="dashboard">
          <Dashboard />
        </div>

        {/* Core Strategic Pillars & Domains */}
        <div id="pillars">
          <Pillars />
        </div>

        {/* Challenge-Intervention-Outcome Case Studies */}
        <div id="stories">
          <SuccessStories />
        </div>

        {/* CSR Partners with purpose */}
        <div id="partnerships">
          <Partnerships />
        </div>

        {/* Financial Transparency and Governance Docs */}
        <div id="transparency">
          <Transparency />
        </div>

        {/* Frequently Asked Questions */}
        <div id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <FAQSection />
        </div>

        {/* Masonry Verified Photo Gallery with zoom Lightbox */}
        <div id="gallery">
          <Gallery />
        </div>

        {/* Volunteer Induction Recruitment Forms */}
        <div id="volunteer">
          <Volunteer />
        </div>

        {/* Direct Donation Calculators with UPI simulation QR */}
        <div id="donate">
          <Donation />
        </div>

        {/* Administrative Inquiry Dispatche Forms */}
        <div id="contact">
          <Contact />
        </div>

      </main>

      {/* Detailed footer representing branch locations & legal seals */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Scroll to Top button appearing past the Hero section */}
      <ScrollToTop />
      
      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}
