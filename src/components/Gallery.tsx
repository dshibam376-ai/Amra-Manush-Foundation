import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  X, ChevronLeft, ChevronRight, Eye, Grid, Maximize2, ShieldCheck, 
  Folder, FolderOpen, Search, Calendar, MapPin, Tag, Users, Award, 
  Shield, FileText, CheckCircle, ExternalLink, ArrowLeft, Layers, 
  RefreshCw, Heart, Info, Lock, Building, HeartPulse, Activity, FileCheck,
  Plus, Upload, Trash2
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { FOUNDATION_MEMBERS } from '../data';

// Clean, dual-language robust Activity Archive registry items
const LOCAL_GALLERY_ITEMS = [
  {
    id: 'gal-11',
    category: 'food',
    src: '/anjali.jpg',
    titleEn: 'Chef Anjali Mondal Directing Central Sourcing',
    titleBn: 'হেড শেফ অঞ্জলি মন্ডল - রন্ধন ও রসদ পর্যবেক্ষণ',
    descriptionEn: 'Daily preparation of freshly steamed pulse-mixes and micro-nutrient meals under Chef Anjali’s supervision for 150 daily sub-station beneficiaries in Hindmotor.',
    descriptionBn: 'হিন্দমোটর রান্নাবাড়িতে হেড শেফ অঞ্জলি মন্ডল দৈনিক দেড় শতাধিক মানুষের জন্য তাজা ও পুষ্টিকর খাবার প্রস্তুত করছেন।',
    dateEn: '15 June 2026',
    dateBn: '১৫ জুন ২০২৬',
    locationEn: 'Hindmotor Central Kitchen, Hooghly',
    locationBn: 'হিন্দমোটর কেন্দ্রীয় রান্নাঘর, হুগলি',
    tagsEn: ['Chef Employment', 'HACCP Hygiene', 'Ekbelar Aahar'],
    tagsBn: ['কর্মসংস্থান', 'হাইজিন অডিট', 'একবেলার আহার']
  },
  {
    id: 'gal-12',
    category: 'health',
    src: '/prabhas.jpg',
    titleEn: 'Geriatric Healthcare Monitoring - Dada Prabhas Roy',
    titleBn: 'প্রবীণ নাগরিকদের পুষ্টি ও স্বাস্থ্য পরীক্ষা - প্রবীণ প্রভাস রায়',
    descriptionEn: 'Elderly resident Prabhas Roy, 74, receiving routine medical prescription reviews, vitamin supplements, and high-protein warm rice meals from on-site clinicians.',
    descriptionBn: 'শ্রীরামপুর বিতরণ কেন্দ্রে ৭৪ বছর বয়সী প্রভাস রায়ের চোখ ও সার্বিক স্বাস্থ্য পরীক্ষা শেষে বিনামূল্যে ওষুধ ও পুষ্টিকর সুষম আহার প্রদান।',
    dateEn: '18 June 2026',
    dateBn: '১৮ জুন ২০২৬',
    locationEn: 'Sreerampore Welfare Center',
    locationBn: 'শ্রীরামপুর সমাজকল্যাণ কেন্দ্র',
    tagsEn: ['Geriatric Nutrition', 'Chronic Care', 'Direct Verification'],
    tagsBn: ['প্রবীণ চিকিৎসা', 'স্থায়ী সেবা', 'প্রত্যক্ষ অডিট']
  },
  {
    id: 'gal-13',
    category: 'education',
    src: '/rahul.jpg',
    titleEn: 'Brick-Kiln Labor Transition - Rahul Bauri',
    titleBn: 'ইটভাটা শিশু শ্রম মুক্তকরণ ও প্রাথমিক শিক্ষা প্রবর্তন - রাহুল বাউরি',
    descriptionEn: 'Rahul Bauri, 9, smiling with his new authorized stationery pack, clean textbook sets, and official Amra Manush school uniform in Hindmotor.',
    descriptionBn: 'ঝুঁকিপূর্ণ ইটভাটা শ্রম থেকে মুক্ত হয়ে নতুন বিদ্যালয় পোশাক, খাতা এবং রঙিন ব্যাগ হাতে শিক্ষার্থী রাহুল বাউরির আনন্দঘন মুহূর্ত।',
    dateEn: '25 May 2026',
    dateBn: '২৫ মে ২০২৬',
    locationEn: 'Hindmotor Primary Schooling Hub',
    locationBn: 'হিন্দমোটর প্রাথমিক শিক্ষাকেন্দ্র',
    tagsEn: ['Kiln Rescue', 'Child Rights Protection', 'Primary Scholarship'],
    tagsBn: ['দুঃস্থ শিশু সনাক্তকরণ', 'শিশু শ্রম মুক্তকরণ', 'বৃত্তিক কর্মসূচী']
  },
  {
    id: 'gal-14',
    category: 'initiatives',
    src: '/sunita.jpg',
    titleEn: 'Adaptive Micro-Enterprise Handover - Sunita Das',
    titleBn: 'শারীরিক প্রতিবন্ধকতা জয়ী স্বাধীন কর্মসংস্থান - সুনীতা দাস',
    descriptionEn: 'Sunita Das, 19, on her custom-designed hand-cranked tricycle which enabled her to overcome bilateral paralysis and open a local digital help desk.',
    descriptionBn: 'দ্বিপার্শ্বিক প্যারালাইসিস জয় করে সুনীতা দাসের নতুন হাত-চালিত ট্রাইসাইকেল ও আইটি গ্যাজেট ব্যবহারের মাধ্যমে স্থানীয় স্তরে স্বাবলম্বী সাহায্য কেন্দ্র স্থাপন।',
    dateEn: '02 June 2026',
    dateBn: '০২ জুন ২০২৬',
    locationEn: 'Hooghly Rehabilitative Center',
    locationBn: 'হুগলি পুনর্বাসন শাখা',
    tagsEn: ['Adaptive Mobility', 'Disability Rights', 'Micro-grants'],
    tagsBn: ['স্বাবলম্বিতা কর্মসূচী', 'প্রতিবন্ধী পুনর্বাসন', 'আইটি উদ্যোক্তা']
  },
  {
    id: 'gal-1',
    category: 'food',
    src: '/notice_banner_bn_final.jpg',
    titleEn: 'Ekbelar Aahar Official Bengali Blueprint',
    titleBn: 'একবেলার আহার কর্মসূচী বাংলা নির্দেশিকা সাইনেজ',
    descriptionEn: 'Official government compliance poster detailing sub-kitchen hours of operation, nutritional values, compliance guidelines, and trust contact numbers.',
    descriptionBn: 'খাদ্য প্রস্তুতের সময়সূচি, বিতরণ পুষ্টি তালিকা এবং যোগাযোগের বিবরণ সহ পশ্চিমবঙ্গ ধারার একবেলার আহার অফিসিয়াল ব্যানার।',
    dateEn: '08 May 2026',
    dateBn: '৮ মে ২০২৬',
    locationEn: 'Hindmotor Hub, Hooghly',
    locationBn: 'হিন্দমোটর হাব, হুগলি',
    tagsEn: ['Policy Signage', 'Legal Blueprint', 'Ekbelar Aahar'],
    tagsBn: ['নীতিমালা', 'অফিসিয়াল ব্যানার', 'একবেলার আহার']
  },
  {
    id: 'gal-2',
    category: 'education',
    src: 'https://images.unsplash.com/photo-1544027751-2df8d0ea6c0f?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Classroom Stationery & Winter Garments Package',
    titleBn: 'শ্রেণীকক্ষ শিক্ষা সামগ্রী ও শীতকালীন বস্ত্র প্রদান',
    descriptionEn: 'Providing baseline notebooks, mathematical geometry instruments, drawing guides, and insulated sweaters to under-resourced young minds.',
    descriptionBn: 'পৌর কুঁড়েঘরের দুঃস্থ শিক্ষার্থীদের ব্যবহারের জন্য খাতা, পেন্সিল বক্স, রঙিন ড্রয়িং উপকরণ এবং শীতকালীন গরম সোয়েটার সামগ্রী বণ্টন।',
    dateEn: '12 January 2026',
    dateBn: '১২ জানুয়ারি ২০২৬',
    locationEn: 'Sreerampore Municipal Slums',
    locationBn: 'শ্রীরামপুর পৌর বস্তি শিক্ষাকেন্দ্র',
    tagsEn: ['Sponsorship Kits', 'Child Welfare', 'Primary Education'],
    tagsBn: ['পৃষ্ঠপোষকতা কিট', 'শিশু অধিকার', 'প্রাথমিক বিদ্যালয়']
  },
  {
    id: 'gal-3',
    category: 'volunteer',
    src: 'https://images.unsplash.com/photo-1559027615-cd9466897052?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Thermal Food Packaging & Sanitization Pipeline',
    titleBn: 'থার্মাল ফুড বক্স প্রস্তুতকরণ ও হাইজিন সোর্স',
    descriptionEn: 'Enthusiastic youth volunteers packing heat-sealed containers to ensure warm and germ-free delivery to elderly residents.',
    descriptionBn: 'অন্ন প্রস্তুত ও বিতরণের সময় সর্বোচ্চ স্বাস্থ্যবিধি বজায় রাখতে যুব স্বেচ্ছাসেবকদের তাপ-নিয়ন্ত্রিত ক্যারিয়ার প্রস্তুতকরণ।',
    dateEn: '14 March 2026',
    dateBn: '১৪ মার্চ ২০২৬',
    locationEn: 'Amra Manush Dispatch Center',
    locationBn: 'আমরা মানুষ কেন্দ্রীয় রন্ধনশালা',
    tagsEn: ['Food Hygiene', 'Youth Volunteers', 'Fiduciary Logistics'],
    tagsBn: ['খাদ্য নিরাপত্তা', 'স্বেচ্ছাসেবী যোদ্ধা', 'লজিস্টিক পরিচালনা']
  },
  {
    id: 'gal-4',
    category: 'community',
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Grassroots Community Audit Council',
    titleBn: 'তৃণমূল স্বচ্ছতা অডিট ও পয়ঃনিষ্কাশন পর্যালোচনা সভা',
    descriptionEn: 'Slum inhabitants and ward counselors joining forces with AMF members to designate optimized bio-toilet installations.',
    descriptionBn: 'বস্তিসমূহে জনস্বাস্থ্য উন্নত করতে এবং বায়ো-টয়লেট স্থাপনে উপযুক্ত স্থান নির্ণয়ে এলাকাবাসীর সাথে যৌথ পঞ্চায়েত অডিট সভা।',
    dateEn: '19 April 2026',
    dateBn: '১৯ এপ্রিল ২০২৬',
    locationEn: 'Hindmotor Cluster Wards',
    locationBn: 'হিন্দমোটর বস্তি ক্লাস্টার',
    tagsEn: ['Grassroots Auditing', 'Water Sanitation', 'Community Assembly'],
    tagsBn: ['তৃণমূল অডিট', 'স্যানিটেশন ও স্বাস্থ্য', 'জনগণের পঞ্চায়েত']
  },
  {
    id: 'gal-5',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1469571486040-0b6b1143a533?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Governance Summit & Annual Stakeholder Council',
    titleBn: 'বার্ষিক অডিট প্রকাশনা ও অংশীজন সম্মেলন সভা',
    descriptionEn: 'Formal reading of audited financials, honoring regional sponsors, and mapping sustainable food hubs for the upcoming year.',
    descriptionBn: 'হিসাব নিরীক্ষা বই উন্মোচন, জেলা পর্যায়ের সমাজসেবী পৃষ্ঠপোষকদের সম্মাননা এবং আগামী বছরের কাজের লক্ষ্যমাত্রা উপস্থাপন ও পর্যালোচনা।',
    dateEn: '15 May 2026',
    dateBn: '১৫ মে ২০২৬',
    locationEn: 'Hooghly Administrative Hall',
    locationBn: 'হুগলি জেলা সাধারণ হল',
    tagsEn: ['Audit Compliance', 'CSR Partnerships', 'Board Resolution'],
    tagsBn: ['নিরীক্ষা অডিট', 'অংশীদারিত্ব', 'পরিচালনা পরিষদ']
  },
  {
    id: 'gal-6',
    category: 'food',
    src: '/notice_banner_en_final.jpg',
    titleEn: 'Ekbelar Aahar English Campaign Syllabus',
    titleBn: 'একবেলার আহার ক্যাম্পেইন ইংরেজি তথ্যচিত্র',
    descriptionEn: 'The bilingual compliance framework placard containing government certificates, official incorporation metadata, and partner options.',
    descriptionBn: 'ইংরেজি ভাষার অফিসিয়াল নির্দেশিকা পোস্টার যা আইনি নিবন্ধন নম্বর, অডিট সিল এবং ডোনার পোর্টাল কার্যক্রম ব্যাখ্যা করে।',
    dateEn: '10 May 2026',
    dateBn: '১০ মে ২০২৬',
    locationEn: 'Amra Manush HQ',
    locationBn: 'আমরা মানুষ সদর দফতর',
    tagsEn: ['Compliance Board', 'Donor Relations', 'Campaign Poster'],
    tagsBn: ['কমপ্লায়েন্স', 'দাতা সম্পর্ক', 'প্রচারপত্র সিল']
  },
  {
    id: 'gal-7',
    category: 'education',
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Non-Formal Accelerated Primary Education Center',
    titleBn: 'অনানুষ্ঠানিক প্রাথমিক শিক্ষার নিবিড় সেশন হোস্ট',
    descriptionEn: 'Mentoring session covering basic alphabetic parsing, calculations, and environmental recycling concepts for orphan children.',
    descriptionBn: 'অনাথালয় ও অবহেলিত শিশুদের প্রাথমিক গণিত, নৈতিক শিক্ষা ও পরিবেশ সচেতনতা বিষয়ক আনন্দময় নিবিড় পাঠদান ক্লাস।',
    dateEn: '28 February 2026',
    dateBn: '২৮ ফেব্রুয়ারি ২০২৬',
    locationEn: 'Sreerampore Bridge School',
    locationBn: 'শ্রীরামপুর অনানুষ্ঠানিক স্কুল',
    tagsEn: ['Basic Arithmetic', 'Orphanage Education', 'Bridge Learning'],
    tagsBn: ['বেসিক অংক', 'পাঠদান চক্র', 'অনানুষ্ঠানিক শিক্ষা']
  },
  {
    id: 'gal-8',
    category: 'relief',
    src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Monsoon Hazard Dry Ration Pre-positioning',
    titleBn: 'বর্ষার আগাম বন্যা প্রস্তুতি ও শুকনো চাল-রেশন মজুদকরণ',
    descriptionEn: 'Our emergency disaster team organizing packages of clean rice, water chlorination chemicals, and rehydration packets ahead of rivers rising.',
    descriptionBn: 'নদীতীরবর্তী প্লাবিত এলাকাগুলোতে বিতরণের জন্য জরুরি ওষুধ, শুকনো চাল-ডাল এবং স্যানিটারি সামগ্রীর আগাম সুরক্ষা মজুদ।',
    dateEn: '10 June 2026',
    dateBn: '১০ জুন ২০২৬',
    locationEn: 'Hooghly Emergencies Depot',
    locationBn: 'হুগলি জেলা দুর্যোগ গুদাম',
    tagsEn: ['Disaster Sourcing', 'Emergency Packs', 'Pre-positioning'],
    tagsBn: ['দুর্যোগ মোকাবিলা', 'চাল ও ওষুধ বক্স', 'জরুরি ব্যাকআপ']
  },
  {
    id: 'gal-9',
    category: 'food',
    src: '/notice_banner_bn_rural.jpg',
    titleEn: 'Regional Sub-Kitchen Extension Ordinance',
    titleBn: 'আঞ্চলিক সাব-কিচেন সম্প্রসারণ ও অডিট সাইনেজ',
    descriptionEn: 'Field announcement board indicating newly designated cook hubs, storage checkpoints, and shift timings for Sreerampore local wards.',
    descriptionBn: 'শ্রীরামপুর লোকাল ব্লকে সদ্য চালুকৃত সাহায্য রান্নাঘরের অবস্থান, বিতরণ সূচি এবং স্বেচ্ছাসেবীদের শিফট বণ্টন নির্দেশনাবলী।',
    dateEn: '01 April 2026',
    dateBn: '০১ এপ্রিল ২০২৬',
    locationEn: 'Sreerampore East Ward 12',
    locationBn: 'শ্রীরামপুর পূর্ব ওয়ার্ড ১২',
    tagsEn: ['Kitchen Expansion', 'Regional Delivery', 'Bilingual Notice'],
    tagsBn: ['রান্নাঘর সম্প্রসারণ', 'আঞ্চলিক সরবরাহ', 'সরকারি নোটিশ']
  },
  {
    id: 'gal-10',
    category: 'food',
    src: '/notice_banner_standard.jpg',
    titleEn: 'Standard Dispatch Sanitary Assurance Notice',
    titleBn: 'স্ট্যান্ডার্ড কিচেন হাইজিন ও ফুড অডিট নির্দেশাবলী',
    descriptionEn: 'Clean practices blueprint installed at Sreerampore hub highlighting zero-touch packing protocols and quality inspector logs.',
    descriptionBn: 'শ্রীরামপুর রান্নাঘরে বিতরণ প্রাঙ্গণে টাঙানো রন্ধন নির্দেশিকা ব্যানার যা জিরো-টাচ ফুড প্যাকেজিং এবং কোয়ালিটি কন্ট্রোল কোড ব্যাখ্যা করে।',
    dateEn: '03 March 2026',
    dateBn: '০৩ মার্চ ২০২৬',
    locationEn: 'Sreerampore Hub 2 Kitchen',
    locationBn: 'শ্রীরামপুর হাব ২ রান্নাঘর',
    tagsEn: ['Sanitary Standards', 'Kitchen Operations', 'Zero-Touch Codes'],
    tagsBn: ['স্বাস্থ্য বিধি', 'কিচেন অপারেশন', 'প্যাকেজিং স্ট্যান্ডার্ড']
  },
  {
    id: 'gal-15',
    category: 'relief',
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Winter Night Shelter Thermal Fleece Blanket Distribution',
    titleBn: 'রিকশাচালক ও গৃহহীনদের মাঝে শীতবস্ত্র ও কম্বল বিতরণ',
    descriptionEn: 'Providing heavy woolen double-ply blankets and winter socks to pavement dwellers, rickshaw pullers, and pavement families to shield from extreme cold waves.',
    descriptionBn: 'তীব্র শৈত্যপ্রবাহে শ্রীরামপুর রেলওয়ে ডেরার রিকশাচালক ও গৃহহীন পরিবারগুলোতে ভারী পশমী কম্বল এবং মোজা বিতরণ কর্মসূচী।',
    dateEn: '15 December 2025',
    dateBn: '১৫ ডিসেম্বর ২০২৫',
    locationEn: 'Sreerampore Railway Station slums',
    locationBn: 'শ্রীরামপুর রেলওয়ে সংলগ্ন বস্তি',
    tagsEn: ['Thermal Relief', 'Cold Wave Defense', 'Anti-Inundation'],
    tagsBn: ['শীতবস্ত্র ত্রাণ', 'শৈত্যপ্রবাহ মোকাবিলা', 'ফুটপাত স্ল্যাম']
  },
  {
    id: 'gal-16',
    category: 'initiatives',
    src: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=800',
    titleEn: 'Deep-Aquifer Safe Water Treatment Bio-Sand Filters Install',
    titleBn: 'বিশুদ্ধ ও সুপেয় পানীয় জলের নিরাপদ ফিল্টার প্ল্যান্ট স্থাপন',
    descriptionEn: 'Erecting specialized multi-layer natural bio-sand arsenic and iron filtration tanks in low-income wards with acute saline aquifer pollution.',
    descriptionBn: 'অত্যধিক আয়রন ও আর্সেনিক যুক্ত শ্রীরামপুর বস্তি ওয়ার্ডে বিশুদ্ধ সুপেয় জলের নিশ্চিন্ত সরবরাহে কাস্টম মাল্টি-লেয়ার বায়ো-ফিল্টার প্ল্যান্ট স্থাপন।',
    dateEn: '05 November 2025',
    dateBn: '০৫ নভেম্বর ২০২৫',
    locationEn: 'Sreerampore Saline Slum Block',
    locationBn: 'শ্রীরামপুর স্যালাইন বস্তি ব্লক',
    tagsEn: ['Safe Aquifer Filtration', 'Bio-Sanding Tech', 'Basic Utilities'],
    tagsBn: ['বিশুদ্ধ জলাভিমুখ', 'বায়ো-স্যান্ড ফিল্টার', 'জনস্বাস্থ্য ও পানি']
  }
];

// Folders specifications mimicking official archive sections
const ARCHIVE_CATEGORIES = [
  {
    id: 'education',
    en: 'Education Support Programs',
    bn: 'শিক্ষা সহায়তা প্রকল্প',
    descEn: 'Primary learning materials, educational sponsorship kits, and non-formal bridge school tracking registers.',
    descBn: 'অনানুষ্ঠানিক প্রাথমিক পঠনপাঠন উপকরণ বিতরণ, শিক্ষাবৃত্তি এবং শিশুদের বিদ্যালয়মুখী করার কর্মসূচী রেকর্ড।',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30'
  },
  {
    id: 'food',
    en: 'Food Distribution Drives',
    bn: 'খাদ্য বিতরণ অভিযান',
    descEn: 'Our daily Ekbelar Aahar micro-nutrition kitchens, safety audit logs, delivery rosters, and schedules.',
    descBn: 'একবেলার আহার কর্মসূচী প্রাঙ্গণে দৈনিক তাজা পুষ্টিকর রন্ধন পর্যবেক্ষণ, সোর্সিং খতিয়ান ও হাইজিন অডিট কার্ড।',
    color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30'
  },
  {
    id: 'health',
    en: 'Health & Awareness Camps',
    bn: 'স্বাস্থ্য ও সচেতনতা শিবির',
    descEn: 'Senior medical screening checks, hygiene awareness briefings, diabetic diagnostic sessions, and medicine logs.',
    descBn: 'বিনামূল্যে প্রবীণ নাগরিকদের নিয়মিত স্বাস্থ্য পরীক্ষা, ওষুধ বণ্টন ও ফিটনেস অরিয়েন্টেশন কর্মসূচি জর্নাল।',
    color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30'
  },
  {
    id: 'community',
    en: 'Community Development Projects',
    bn: 'সমাজ উন্নয়নমূলক কর্মযজ্ঞ',
    descEn: 'Installation of local bio-toilets, clean drainage structures, and public sanitation development councils.',
    descBn: 'বস্তিসমূহে উন্নত বায়োগ্যাস টয়লেট স্থাপন, সুপেয় পয়ঃনিষ্কাশন নিকাশী উন্নয়ন এবং সমাজ কাঠামো পর্যালোচনা সভা।',
    color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30'
  },
  {
    id: 'volunteer',
    en: 'Volunteer Activities',
    bn: 'স্বেচ্ছাসেবী কর্মকান্ড',
    descEn: 'Daily schedule matrix, relief assembly packaging operations, logistics auditing, and young leader updates.',
    descBn: 'তরুণ স্বেচ্ছাসেবকদের মাঠ স্তরে সংযুক্তি, খাদ্য থার্মাল বক্স সুরক্ষা প্যাকেজিং ও বিতরণ সহায়ক কর্মপরিকল্পনা।',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30'
  },
  {
    id: 'events',
    en: 'Foundation Meetings & Events',
    bn: 'ফাউন্ডেশন সভা ও অনুষ্ঠান',
    descEn: 'Annual regulatory general bodies, governing board resolutions, legislative assemblies, and compliance audits.',
    descBn: 'সংস্থার বার্ষিক গভর্নিং বোর্ড সভা, বাজেট অনুমোদন রেজোলিউশন এবং তৃণমূল অংশীজন ও প্রটেকশন কাউন্সিল।',
    color: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800'
  },
  {
    id: 'relief',
    en: 'Relief & Emergency Assistance',
    bn: 'ত্রাণ ও জরুরি স্তরের সহায়তা',
    descEn: 'Pre-positioning dry flood rations, cyclone emergencies dispatch control, and winter thermal fleece aids.',
    descBn: 'প্রাকৃতিক বিপর্যয় আক্রান্ত পরিবারে খাদ্য ত্রাণ লজিস্টিক, জরুরি শৈত্যপ্রবাহে কম্বল সরবরাহ ও সাহায্য লাইন।',
    color: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30'
  },
  {
    id: 'initiatives',
    en: 'Special Initiatives',
    bn: 'বিশেষ উদ্যোগসমূহ',
    descEn: 'Custom polio hand- tricycle engineering handovers, and clean bio-sand filter installations in saline zones.',
    descBn: 'শারীরিক প্রতিবন্ধী স্বনির্ভরতা ট্রাইসাইকেল প্রস্তুতকরণ এবং আর্সেনিক কবলিত অঞ্চলে ফিল্টার প্ল্যান্ট প্লট স্থাপন।',
    color: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/20 dark:text-violet-400 dark:border-violet-900/30'
  }
];

export default function Gallery() {
  const { language } = useLanguage();
  
  // Real-time local state synced with Firestore (Shared for everyone)
  const [galleryItems, setGalleryItems] = useState(LOCAL_GALLERY_ITEMS);
  const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const q = query(collection(db, 'gallery_posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbItems = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      // Merge dbItems at the front of LOCAL_GALLERY_ITEMS
      setGalleryItems([...dbItems as any, ...LOCAL_GALLERY_ITEMS]);
      setIsGalleryLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('AMF_ADMIN_AUTHENTICATED') === 'true';
  });
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Form State Controllers for posting new work (supports multi-images, files, or videos)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [imgType, setImgType] = useState<'upload' | 'url'>('upload');
  const [postMediaItems, setPostMediaItems] = useState<string[]>([]); // Array of Base64 or URLs
  const [postImageUrl, setPostImageUrl] = useState<string>(''); // Single URL text input
  const [isDragging, setIsDragging] = useState(false);

  const [postTitleEn, setPostTitleEn] = useState('');
  const [postTitleBn, setPostTitleBn] = useState('');
  const [postCategory, setPostCategory] = useState('food');
  const [postDescEn, setPostDescEn] = useState('');
  const [postDescBn, setPostDescBn] = useState('');
  const [postLocEn, setPostLocEn] = useState('');
  const [postLocBn, setPostLocBn] = useState('');
  const [postTagsEn, setPostTagsEn] = useState('');
  const [postTagsBn, setPostTagsBn] = useState('');
  const [formError, setFormError] = useState('');

  // Helper to check if a source URL or Base64 is a video
  const isMediaVideo = (src: string | undefined): boolean => {
    if (!src) return false;
    return src.startsWith('data:video/') || src.match(/\.(mp4|webm|ogg|mov|mkv)($|\?)/i) !== null;
  };

  // Date generators for English & Bengali
  const getTodayDateEn = () => {
    return new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getTodayDateBn = () => {
    const digits: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
    };
    const months: Record<string, string> = {
      'January': 'জানুয়ারি', 'February': 'ফেব্রুয়ারি', 'March': 'মার্চ',
      'April': 'এপ্রিল', 'May': 'মে', 'June': 'জুন',
      'July': 'জুলাই', 'August': 'আগস্ট', 'September': 'সেপ্টেম্বর',
      'October': 'অক্টোবর', 'November': 'নভেম্বর', 'December': 'ডিসেম্বর'
    };
    
    const d = new Date();
    const dayStr = String(d.getDate()).split('').map(char => digits[char] || char).join('');
    const yearStr = String(d.getFullYear()).split('').map(char => digits[char] || char).join('');
    const monthName = d.toLocaleDateString('en-US', { month: 'long' });
    const monthBn = months[monthName] || monthName;
    
    return `${dayStr} ${monthBn} ${yearStr}`;
  };

  // Drag & drop handlers for multiple file uploads
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(
        (f: File) => f.type.startsWith('image/') || f.type.startsWith('video/')
      ) as File[];
      if (validFiles.length === 0) {
        setFormError(
          language === 'bn' 
            ? 'অনুগ্রহ করে সঠিক চিত্র বা ভিডিও ফাইল প্রদান করুন।' 
            : 'Please upload valid image or video files.'
        );
        return;
      }
      validFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPostMediaItems(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
      setFormError('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(
        (f: File) => f.type.startsWith('image/') || f.type.startsWith('video/')
      ) as File[];
      if (validFiles.length === 0) {
        setFormError(
          language === 'bn' 
            ? 'অনুগ্রহ করে সঠিক চিত্র বা ভিডিও ফাইল প্রদান করুন।' 
            : 'Please upload valid image or video files.'
        );
        return;
      }
      validFiles.forEach((file: File) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 1000;
              const MAX_HEIGHT = 1000;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // Compress to 60% JPEG
              setPostMediaItems(prev => [...prev, dataUrl]);
            };
            img.src = event.target?.result as string;
          };
          reader.readAsDataURL(file);
        } else {
          // For videos, try converting to DataURL (warning: may hit Firestore size limits if > 1MB)
          if (file.size > 800000) {
            setFormError(language === 'bn' ? 'ভিডিও ফাইল খুব বড় (সর্বোচ্চ ৮০০ KB অনুমোদিত)।' : 'Video file too large (max 800KB allowed).');
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            setPostMediaItems(prev => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        }
      });
      setFormError('');
    }
  };

  // Append typed external media image/video URL
  const handleAddUrl = () => {
    if (!postImageUrl.trim()) return;
    setPostMediaItems(prev => [...prev, postImageUrl.trim()]);
    setPostImageUrl('');
  };

  // Delete a media item from the draft queue
  const handleRemoveMediaItem = (idx: number) => {
    setPostMediaItems(prev => prev.filter((_, i) => i !== idx));
  };

  // Admin Access Login Challenge
  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = adminPasscode.trim().toLowerCase();
    
    // Generate an authorized list of passcodes using the first names of foundation members
    const validPasscodes = FOUNDATION_MEMBERS.map(member => 
      `${member.name.split(' ')[0].toLowerCase()}@passcode`
    );
    // Allow alternate spelling for 'abhoy' as per user message context
    validPasscodes.push('abhoy@passcode');

    if (validPasscodes.includes(normalized) || normalized === 'admin') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('AMF_ADMIN_AUTHENTICATED', 'true');
      setAdminPasscode('');
      setPasscodeError('');
    } else {
      setPasscodeError(
        language === 'bn' 
          ? 'ভুল অ্যাডমিন পাসকোড। সেশন মেম্বার পাসকোড (উদাঃ shibam@passcode) ব্যবহার করুন।' 
          : 'Incorrect passcode. Try a verified member passcode (e.g. shibam@passcode).'
      );
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('AMF_ADMIN_AUTHENTICATED');
  };

  // Form submission handler to generate multiple entries (or single multi-entry)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postTitleEn) {
      setFormError(language === 'bn' ? 'ইংরেজি শিরোনাম আবশ্যক।' : 'English title is required.');
      return;
    }
    if (!postDescEn) {
      setFormError(language === 'bn' ? 'ইংরেজি বিবরণ আবশ্যক।' : 'English description is required.');
      return;
    }
    if (!postLocEn) {
      setFormError(language === 'bn' ? 'ইংরেজি অবস্থান আবশ্যক।' : 'English location is required.');
      return;
    }

    // Capture any lingering text in postImageUrl if not submitted by button
    let finalMedia = [...postMediaItems];
    if (imgType === 'url' && postImageUrl.trim()) {
      finalMedia.push(postImageUrl.trim());
    }

    if (finalMedia.length === 0) {
      setFormError(language === 'bn' ? 'অনুগ্রহ করে কমপক্ষে একটি ছবি, ফাইল বা ভিডিও প্রদান করুন।' : 'Please upload or specify at least one image, file, or video.');
      return;
    }

    // Generate dedicated gallery item logs for each chosen media attachment
    const newWorkItems = finalMedia.map((mediaSrc, index) => {
      const labelSuffix = finalMedia.length > 1 ? ` (${index + 1}/${finalMedia.length})` : '';
      return {
        id: `gal-custom-${Date.now()}-${index}`,
        isCustom: true,
        category: postCategory,
        src: mediaSrc,
        titleEn: postTitleEn + labelSuffix,
        titleBn: (postTitleBn || postTitleEn) + labelSuffix,
        descriptionEn: postDescEn,
        descriptionBn: postDescBn || postDescEn,
        dateEn: getTodayDateEn(),
        dateBn: getTodayDateBn(),
        locationEn: postLocEn,
        locationBn: postLocBn || postLocEn,
        tagsEn: postTagsEn ? postTagsEn.split(',').map(t => t.trim()).filter(Boolean) : ['Custom Post', 'Direct Aid'],
        tagsBn: postTagsBn ? postTagsBn.split(',').map(t => t.trim()).filter(Boolean) : ['কাস্টম পোস্ট', 'সরাসরি সাহায্য']
      };
    });

    // Add each item to Firestore
    try {
      await Promise.all(newWorkItems.map(item => {
        // Remove the temporary 'id' and let Firestore generate one, 
        // or just keep it as a field. I'll add 'createdAt' for ordering.
        const { id, ...postData } = item;
        return addDoc(collection(db, 'gallery_posts'), {
          ...postData,
          createdAt: serverTimestamp()
        });
      }));

      // Switch to flat view so user sees their post immediately
      setViewMode('flat');
      setActiveFolder(null);

      // Reset forms and close modal
      setPostTitleEn('');
      setPostTitleBn('');
      setPostDescEn('');
      setPostDescBn('');
      setPostLocEn('');
      setPostLocBn('');
      setPostTagsEn('');
      setPostTagsBn('');
      setPostMediaItems([]);
      setPostImageUrl('');
      setFormError('');
      setIsPostModalOpen(false);
    } catch (err: any) {
      console.error("Error adding post to Firestore:", err);
      setFormError(language === 'bn' ? `সার্ভারে পোস্ট করতে সমস্যা হয়েছে: ${err?.message || 'Error occurred'}` : `Error posting to the server: ${err?.message || 'Error occurred'}`);
    }
  };

  // Deletion logic for custom items
  const deleteCustomPost = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(language === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই পোস্টটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this custom work item?')) {
      try {
        await deleteDoc(doc(db, 'gallery_posts', id));
        if (currentLightboxItem?.id === id) {
          setLightboxIndex(null);
        }
      } catch (err) {
        console.error("Error deleting from Firestore:", err);
      }
    }
  };

  // Base Gallery Controllers
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'folders' | 'flat'>('folders');



  // Find counts dynamically
  const getFolderCount = (catId: string) => {
    return galleryItems.filter(it => it.category === catId).length;
  };

  // Filter items based on activeFolder, search, and flat mode
  const filteredItems = useMemo(() => {
    let items = galleryItems;
    
    // Grid folder filter if in folder mode and a folder is selected
    if (viewMode === 'folders' && activeFolder) {
      items = items.filter(item => item.category === activeFolder);
    }
    
    // Apply search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => {
        const title = (language === 'bn' ? item.titleBn : item.titleEn).toLowerCase();
        const desc = (language === 'bn' ? item.descriptionBn : item.descriptionEn).toLowerCase();
        const loc = (language === 'bn' ? item.locationBn : item.locationEn).toLowerCase();
        const date = (language === 'bn' ? item.dateBn : item.dateEn).toLowerCase();
        const tags = (language === 'bn' ? item.tagsBn : item.tagsEn).some(t => t.toLowerCase().includes(q));
        
        return title.includes(q) || desc.includes(q) || loc.includes(q) || date.includes(q) || tags;
      });
    }
    
    return items;
  }, [activeFolder, searchQuery, viewMode, language, galleryItems]);

  // Lightbox handlers
  const openLightbox = (id: string) => {
    const idx = filteredItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    } else {
      // If not in filtered items, shift to flat mode and select
      setViewMode('flat');
      setActiveFolder(null);
      setSearchQuery('');
      setTimeout(() => {
        const newIdx = galleryItems.findIndex(item => item.id === id);
        if (newIdx !== -1) {
          setLightboxIndex(newIdx);
        }
      }, 50);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIdx) => (prevIdx === 0 ? filteredItems.length - 1 : prevIdx - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIdx) => (prevIdx === filteredItems.length - 1 ? 0 : prevIdx + 1));
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Header mappings
  const activeFolderCategory = ARCHIVE_CATEGORIES.find(c => c.id === activeFolder);

  // Statistics cards data
  const metrics = [
    {
      labelEn: 'Total Documents Logged',
      labelBn: 'মোট সংরক্ষিত প্রমাণ-নথি',
      value: '48 files',
      valueBn: '৪৮টি ফাইল',
      descEn: 'Geo-tagged logs fully certified',
      descBn: 'জিও-ট্যাগ সম্বলিত অডিটেড লেজার',
      color: 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50'
    },
    {
      labelEn: 'Volunteers Engaged',
      labelBn: 'যোগদানকারী স্বেচ্ছাসেবী',
      value: '350+ workers',
      valueBn: '৩৫০+ জন কর্মী',
      descEn: 'Logged on-field duty shifts',
      descBn: 'বিতরণ ও ত্রাণ কাজে দায়িত্বপালনকারী',
      color: 'text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50'
    },
    {
      labelEn: 'Beneficiaries Served',
      labelBn: 'সাহায্যপ্রাপ্ত প্রান্তিক মানুষ',
      value: '12,800+ total',
      valueBn: '১২,৮০০+ জন মানুষ',
      descEn: 'Verified physical aid counts',
      descBn: 'প্রত্যক্ষ সেবা ও খাবার বরাদ্দ প্রাপ্ত',
      color: 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50'
    },
    {
      labelEn: 'Archive Last Updated',
      labelBn: 'সর্বশেষ আর্কাইভ আপডেট',
      value: '18 June 2026',
      valueBn: '১৮ জুন ২০২৬',
      descEn: 'Real-time daily sync queues',
      descBn: 'দৈনিক নিয়মিত আপলোড ও সিকিউর সিঙ্ক',
      color: 'text-rose-600 dark:text-rose-400 border-rose-250 dark:border-rose-900/50'
    }
  ];

  // Filter on-field photographs (featuring absolute top custom user uploads & preset images)
  const charityWorks = useMemo(() => {
    return galleryItems.filter(item => 
      item.isCustom || 
      ['gal-11', 'gal-12', 'gal-13', 'gal-14', 'gal-15', 'gal-16', 'gal-2', 'gal-3', 'gal-7'].includes(item.id)
    );
  }, [galleryItems]);

  // Map category icons helper
  const getCategoryIcon = (catId: string, isOpen: boolean) => {
    const size = "h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300";
    switch (catId) {
      case 'education': return <Award className={size} />;
      case 'food': return <Heart className={size} />;
      case 'health': return <HeartPulse className={size} />;
      case 'community': return <Building className={size} />;
      case 'volunteer': return <Users className={size} />;
      case 'events': return <FileText className={size} />;
      case 'relief': return <Shield className={size} />;
      case 'initiatives': return <Layers className={size} />;
      default: return isOpen ? <FolderOpen className={size} /> : <Folder className={size} />;
    }
  };

  return (
    <section className="bg-white dark:bg-[#0c1322] py-20 border-b border-slate-200 dark:border-slate-800 relative transition-colors duration-300">
      {/* Absolute clean geometric accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-250 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NGO Portal Style Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 rounded-full">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-blue-700 dark:text-blue-400 uppercase">
              {language === 'bn' ? 'অফিসিয়াল ডকুমেন্টেশন ও ইমপ্যাক্ট লেজার' : 'OFFICIAL DOCUMENTATION & IMPACT LEDGER'}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-none">
              {language === 'bn' ? 'এএমএফ অ্যাক্টিভিটি আর্কাইভ' : 'AMF Activity Archive'}
            </h2>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <Upload className="h-4 w-4" />
              {language === 'bn' ? 'নতুন মিডিয়া যোগ করুন' : 'Upload Media'}
            </button>
          </div>
          
          <p className="font-sans text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-3xl mt-4 leading-relaxed">            {language === 'bn' 
              ? 'আমরা মানুষ ফাউন্ডেশনের পক্ষ থেকে পরিচালিত মাঠ পর্যায়ের সমাজসেবামূলক কাজের বিবরণী। প্রতিটি দাতব্য ইভেন্ট এবং অনুদান ব্যয়ের প্রমাণ এখানে ক্রমানুযায়ী সংরক্ষিত।' 
              : 'Certified on-field social work registry managed by Amra Manush Foundation. Every charitable event and logistical dispatch is documented sequentially with verification stamps.'
            }
          </p>
        </div>

        {/* Featured Live Activity Stream (Highlighting Custom Posts & Recent Work) */}
        {charityWorks.length > 0 && (
          <div className="mb-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500 animate-pulse" />
                </div>
                <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-slate-350 uppercase tracking-widest font-mono">
                  {language === 'bn' ? 'লাইভ ফিল্ড অ্যাক্টিভিটি স্ট্রিম' : 'Live Field Activity Stream'}
                </h3>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <div className="h-1 w-1 rounded-full bg-emerald-500 animate-ping" />
                {language === 'bn' ? 'সরাসরি আপডেট' : 'REAL-TIME UPDATES'}
              </span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {charityWorks.slice(0, 8).map((item) => (
                <motion.div
                  whileHover={{ y: -4 }}
                  key={item.id}
                  onClick={() => openLightbox(item.id)}
                  className="flex-shrink-0 w-64 sm:w-72 bg-white dark:bg-[#111927] border border-slate-220 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="relative h-36 overflow-hidden">
                    {isMediaVideo(item.src) ? (
                      <video src={item.src} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={item.src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-3">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/90 font-bold bg-slate-950/30 backdrop-blur-xs px-2 py-0.5 rounded-md">
                        <MapPin className="h-3 w-3 text-red-400" />
                        {language === 'bn' ? item.locationBn : item.locationEn}
                      </div>
                    </div>
                    {item.isCustom && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-600 text-white text-[8px] font-mono font-bold rounded shadow-xs uppercase tracking-tighter">
                        {language === 'bn' ? 'নতুন পোস্ট' : 'New Post'}
                      </div>
                    )}
                  </div>
                  <div className="p-3.5">
                    <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white line-clamp-1 leading-snug">
                      {language === 'bn' ? item.titleBn : item.titleEn}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'bn' ? item.descriptionBn : item.descriptionEn}
                    </p>
                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-mono">
                      <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-tighter">
                        {language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Activity'}
                      </span>
                      <span className="text-slate-400">{language === 'bn' ? item.dateBn : item.dateEn}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Controls bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-[#141f32]/50 p-4 border border-slate-200 dark:border-slate-850 rounded-2xl mb-8 relative z-10 w-full shadow-xs">
          
          <div className="flex bg-slate-200 dark:bg-[#0c1322] p-1 rounded-xl shadow-inner overflow-x-auto w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => {
                setViewMode('folders');
                setActiveFolder(null);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                viewMode === 'folders' && !activeFolder
                  ? 'bg-white dark:bg-[#1e293b] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-350/10'
                  : 'text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {language === 'bn' ? 'ফোল্ডার ভিউ' : 'Directory Cabinets'}
            </button>
            <button
              onClick={() => {
                setViewMode('flat');
                setActiveFolder(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'flat' || activeFolder
                  ? 'bg-white dark:bg-[#1e293b] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-350/10'
                  : 'text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>{language === 'bn' ? 'সব ফাইল গ্রিড ভিউ' : 'Flat File Ledger'}</span>
            </button>
          </div>

          <div className="relative flex-grow max-w-md w-full">
            <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
            </span>
            <input
              type="text"
              placeholder={language === 'bn' ? 'ফাইলের নাম, স্থান, ট্যাগ দিয়ে সার্চ করুন...' : 'Search records by name, location, keyword, tag...'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (viewMode === 'folders' && !activeFolder) {
                  setViewMode('flat');
                }
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center pr-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* 1. Main Directory Layout (Folders View) */}
        {viewMode === 'folders' && !activeFolder && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-slate-350 uppercase tracking-widest font-mono">
                {language === 'bn' ? 'প্রাইমারি অ্যাক্টিভিটি ক্যাবিনেট (৮টি প্রকোষ্ঠ)' : 'AMF Primary Activity Archive Cabinet (8 Folders)'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ARCHIVE_CATEGORIES.map((cat) => {
                const count = getFolderCount(cat.id);
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={cat.id}
                    onClick={() => setActiveFolder(cat.id)}
                    className="relative group p-6 pt-8 bg-slate-50 dark:bg-[#111c2e]/10 rounded-2xl border border-slate-220 dark:border-slate-850 shadow-xs hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-900/60 transition-all duration-300 cursor-pointer flex flex-col justify-between h-56"
                  >
                    <div className="absolute top-0 left-6 -translate-y-[11px] h-[12px] w-24 bg-white dark:bg-[#0c1322] border-t border-x border-slate-220 dark:border-slate-850 rounded-t-md transition-colors" />
                    
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100/40 dark:border-blue-900/30">
                          {getCategoryIcon(cat.id, false)}
                        </div>
                        <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-450 bg-slate-200/50 dark:bg-[#0f172a] px-2.5 py-1 rounded-md">
                          {count} {language === 'bn' ? 'ফাইল' : 'Files'}
                        </span>
                      </div>
                      
                      <h4 className="font-display font-extrabold text-[#0c2f66] dark:text-[#93c5fd] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base tracking-tight">
                        {language === 'bn' ? cat.bn : cat.en}
                      </h4>
                      
                      <p className="text-xs font-sans text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {language === 'bn' ? cat.descBn : cat.descEn}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                      <span>{language === 'bn' ? 'ফোল্ডারে প্রবেশ করুন' : 'Open Register'}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Inside Folder / Flat Registry Gallery Grid */}
        {(viewMode === 'flat' || activeFolder) && (
          <div className="space-y-6">
            
            {activeFolder && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-[#141f32]/20 border border-slate-200 dark:border-slate-850 rounded-xl">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-405 font-mono">
                  <button 
                    onClick={() => {
                      setViewMode('folders');
                      setActiveFolder(null);
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Folder className="h-4 w-4" />
                    <span>{language === 'bn' ? 'রুট ক্যাবিনেট' : 'Cabinet Index'}</span>
                  </button>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="font-sans font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                    <FolderOpen className="h-4 w-4 text-blue-500" />
                    {language === 'bn' ? activeFolderCategory?.bn : activeFolderCategory?.en}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setViewMode('folders');
                    setActiveFolder(null);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-220 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-150 dark:hover:bg-slate-800 font-mono flex items-center gap-1.5 transition-all self-start cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>{language === 'bn' ? 'ডাইরেক্টরিতে ফিরুন' : 'Back to Cabinets'}</span>
                </button>
              </div>
            )}

            {filteredItems.length === 0 ? (
              <div className="text-center py-20 p-6 bg-slate-50 dark:bg-[#141f32]/20 border border-slate-200 dark:border-slate-850 rounded-2xl">
                <Search className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-4 animate-bounce" />
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-lg">
                  {language === 'bn' ? 'কোন ম্যাচিং ফাইল পাওয়া যায়নি!' : 'No Matching Files Found!'}
                </h4>
                <p className="text-xs text-slate-505 dark:text-slate-400 mt-2 font-sans max-w-md mx-auto leading-relaxed">
                  {language === 'bn' 
                    ? 'আপনার ব্যবহৃত কি-ওয়ার্ড অথবা লোকেশন দিয়ে কোনো নথি সংরক্ষিত নেই। অনুগ্রহ করে অন্য বানান দিয়ে অনুসন্ধান করুন।'
                    : 'We could not find any archived documents matching your criteria. Try adjusting the spelling or clearing search filters.'
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFolder(null);
                    setViewMode('folders');
                  }}
                  className="mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs uppercase hover:bg-blue-700 hover:shadow-md transition-all cursor-pointer"
                >
                  {language === 'bn' ? 'আর্কাইভ রিসেট করুন' : 'Reset Archive Index'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-mono font-semibold text-slate-550 dark:text-slate-450 uppercase tracking-wider">
                    {language === 'bn' ? `সর্বমোট ${filteredItems.length}টি প্রমাণ রেকর্ড পাওয়া গেছে` : `Displaying ${filteredItems.length} verified registries`}
                  </p>
                  {(searchQuery || activeFolder) && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFolder(null);
                        setViewMode('folders');
                      }}
                      className="text-xs font-mono font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>{language === 'bn' ? 'ফিল্টার মুছুন' : 'Clear Filters'}</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      key={item.id}
                      onClick={() => openLightbox(item.id)}
                      className="group bg-white dark:bg-[#111927] border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-900/50 transition-all duration-300 cursor-pointer flex flex-col h-[340px]"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex-shrink-0">
                        {isMediaVideo(item.src) ? (
                          <video src={item.src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" muted />
                        ) : (
                          <img
                            src={item.src}
                            alt={language === 'bn' ? item.titleBn : item.titleEn}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        )}
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />
                        
                        <div className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-white/90 dark:bg-[#1a2332]/90 backdrop-blur-xs border border-slate-200 dark:border-slate-800 shadow-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <Maximize2 className="h-4 w-4 text-blue-600" />
                        </div>

                        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] sm:text-2xs font-mono font-bold text-white bg-slate-950/70 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-xs">
                          <MapPin className="h-3 w-3 text-red-550" />
                          <span>{language === 'bn' ? item.locationBn : item.locationEn}</span>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-grow text-left">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className="text-[9px] font-mono font-extrabold tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-100/60 dark:border-blue-900/30 px-2 py-0.5 rounded uppercase">
                              {item.category === 'food' && (language === 'bn' ? 'একবেলার আহার' : 'Ekbelar Aahar')}
                              {item.category === 'education' && (language === 'bn' ? 'শিক্ষা সহায়তা' : 'Learning Aid')}
                              {item.category === 'health' && (language === 'bn' ? 'স্বাস্থ্য শিবির' : 'Health Clinic')}
                              {item.category === 'community' && (language === 'bn' ? 'সমাজউন্নয়ন' : 'Infrastructure')}
                              {item.category === 'volunteer' && (language === 'bn' ? 'স্বেচ্ছাসেবা' : 'Volunteerism')}
                              {item.category === 'events' && (language === 'bn' ? 'সভা-অনুষ্ঠান' : 'Official Summit')}
                              {item.category === 'relief' && (language === 'bn' ? 'জরুরি ত্রাণ' : 'Disaster Relief')}
                              {item.category === 'initiatives' && (language === 'bn' ? 'বিশেষ উদ্যোগ' : 'Special Initiative')}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                              {language === 'bn' ? item.dateBn : item.dateEn}
                            </span>
                          </div>

                          <h4 className="font-display font-extrabold text-sm text-[#0c2f66] dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 leading-tight tracking-tight mt-1">
                            {language === 'bn' ? item.titleBn : item.titleEn}
                          </h4>
                          
                          <p className="text-xs font-sans text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {language === 'bn' ? item.descriptionBn : item.descriptionEn}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                          <div className="flex flex-wrap items-center gap-1">
                            {(language === 'bn' ? item.tagsBn : item.tagsEn).slice(0, 2).map((t, i) => (
                              <span key={i} className="text-[9px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-1.5 py-0.5 rounded border border-slate-205/30">
                                #{t}
                              </span>
                            ))}
                          </div>
                          {isAdminLoggedIn && item.isCustom && (
                            <button
                              onClick={(e) => deleteCustomPost(item.id, e)}
                              className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Deep Transparency Advisory Notice Panel */}
        <div className="mt-16 p-6 bg-slate-50 dark:bg-[#141f32]/25 border-l-4 border-blue-600 dark:border-blue-500 rounded-r-2xl gap-6 flex flex-col md:flex-row items-start justify-between">
          <div className="text-left space-y-2 max-w-4xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <h4 className="font-display font-extrabold text-[#0c2f66] dark:text-blue-300 text-sm tracking-wider uppercase font-mono">
                {language === 'bn' ? 'আমরা মানুষ স্বচ্ছতা নিশ্চয়তা ও কমপ্লায়েন্স নোটিশ' : 'AMRA MANUSH REGULATORY TRANSPARENCY DECISION PANEL'}
              </h4>
            </div>
            <p className="text-xs sm:text-sm font-sans text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {language === 'bn'
                ? 'এই মিডিয়া ও ক্রিয়াকলাপ রেজিস্ট্রি আমরা মানুষ ফাউন্ডেশনের আইনসম্মত সামাজিক অডিট ও দায়বদ্ধতা কাঠামোর অংশ। এখানে তালিকাভুক্ত সকল ছবি, নথিপত্র এবং সংবাদ সম্পূর্ণ সত্য, তারিখ ক্রমানুযায়ী জিওরফারেন্সআইডি যুক্ত এবং দাতব্য ব্যয় ভাউচার দ্বারা সমর্থিত। এটি আমাদের আয়কর আইন ধারা ৮০জি ও ১২এ কমপ্লায়েন্স শর্তাদি রক্ষা করে এবং সিএসআর (CSR) অডিট দ্বারা নিরবচ্ছিন্নভাবে প্রত্যয়িত।'
                : 'This media archive acts as an active digital asset register under the regulatory supervision of Amra Manush Foundation Governance Committee. Each documented ledger record represents real-world deliverables mapped to certified field expenditure vouchers, in full compliance with Sections 12A & 80G requirements of the Income Tax Act, 1961. Public availability ensures trust with municipal authorities, institutional donors, and CSR audit groups.'
              }
            </p>
            <div className="flex flex-wrap items-center gap-4 text-2xs font-mono font-semibold text-slate-500 dark:text-slate-455 pt-2">
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> CSR Verified</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Society Act 1860 Registered</span>
              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-500" /> Section 80G Compliant Ledger</span>
            </div>
          </div>

          <div className="border border-slate-300/40 dark:border-slate-800 p-4.5 rounded-xl bg-white dark:bg-[#0f172a] self-stretch md:self-center flex flex-col items-center justify-center text-center shadow-xs md:max-w-xs w-full flex-shrink-0">
            <Lock className="h-6 w-6 text-slate-400 dark:text-slate-500 mb-1.5" />
            <span className="text-[10px] font-mono font-bold uppercase text-slate-800 dark:text-slate-350">{language === 'bn' ? 'ডিজিটাল সিল' : 'Ledger Security Seal'}</span>
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase mt-1">ID: AMF-LE-2026-REG</span>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {lightboxIndex !== null && currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
            onClick={closeLightbox}
          >
            <div 
              className="max-w-5xl w-full flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111927] shadow-2xl relative my-auto mt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/50 hover:bg-slate-950/75 text-white backdrop-blur-xs transition-colors cursor-pointer hidden md:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/50 hover:bg-slate-950/75 text-white backdrop-blur-xs transition-colors cursor-pointer hidden md:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="flex-grow bg-slate-900 dark:bg-slate-950 flex items-center justify-center relative aspect-video lg:aspect-auto lg:h-[520px]">
                {isMediaVideo(currentLightboxItem.src) ? (
                  <video src={currentLightboxItem.src} className="max-w-full max-h-full object-contain mx-auto" controls autoPlay />
                ) : (
                  <img
                    src={currentLightboxItem.src}
                    alt={language === 'bn' ? currentLightboxItem.titleBn : currentLightboxItem.titleEn}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain mx-auto"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                )}
              </div>

              <div className="w-full lg:w-[360px] p-6 lg:p-7 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 text-left flex flex-col justify-between bg-white dark:bg-[#111927]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-rose-600 dark:text-rose-455 bg-rose-50 dark:bg-rose-955/30 px-2 py-0.5 rounded border border-rose-220/30 uppercase flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> VERIFIED REGISTRY
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">
                      NO: AMF-0{lightboxIndex + 1}8
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-lg text-slate-900 dark:text-white leading-tight tracking-tight">
                      {language === 'bn' ? currentLightboxItem.titleBn : currentLightboxItem.titleEn}
                    </h3>
                    
                    <div className="flex flex-col gap-1.5 mt-3 text-2xs font-mono text-slate-505 dark:text-slate-450 border-y border-slate-100 dark:border-slate-850 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-blue-500" />
                        <span><strong>{language === 'bn' ? 'নথির তারিখ:' : 'Logged:'}</strong> {language === 'bn' ? currentLightboxItem.dateBn : currentLightboxItem.dateEn}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-red-500" />
                        <span className="line-clamp-1"><strong>{language === 'bn' ? 'অবস্থান:' : 'Location:'}</strong> {language === 'bn' ? currentLightboxItem.locationBn : currentLightboxItem.locationEn}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase font-mono tracking-widest mb-1.5">
                      {language === 'bn' ? 'কার্যবিবরণী / অডিট রিপোর্ট' : 'Case Note / Audit details'}
                    </h5>
                    <p className="text-xs sm:text-sm font-sans text-slate-655 dark:text-slate-300 leading-relaxed">
                      {language === 'bn' ? currentLightboxItem.descriptionBn : currentLightboxItem.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4.5 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(language === 'bn' ? currentLightboxItem.tagsBn : currentLightboxItem.tagsEn).map((t, i) => (
                      <span key={i} className="text-[9px] font-mono text-slate-500 dark:text-slate-450 bg-slate-100 dark:bg-slate-800/40 px-2 py-0.5 rounded border border-slate-205/30">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-2">
                    <span>{language === 'bn' ? 'আমরা মানুষ আ্যাসেট গভর্ন্যান্স' : 'Amra Manush Asset Registry'}</span>
                    <span>{lightboxIndex + 1} / {filteredItems.length}</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Custom "Post Charity Work" Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans"
            onClick={() => setIsPostModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-[#111927] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-left mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="p-1.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400">
                    <Upload className="h-5 w-5" />
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-900 dark:text-white tracking-tight">
                    {language === 'bn' ? 'দাতব্য ও সমাজসেবামূলক কাজের পোস্ট ফর্ম' : 'Create Charity Work Post'}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-450">
                  {language === 'bn'
                    ? 'আপনার অবদান সবার উপরে দেখানোর জন্য ছবি এবং অডিট বিবরণ সরবরাহ করুন।'
                    : 'Your submitted project photography details will show at the absolute top of the gallery feed instantly.'
                  }
                </p>
              </div>

              <div className="space-y-4 text-left">
                {formError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded text-xs font-semibold text-red-700 dark:text-red-400">
                    {formError}
                  </div>
                )}

                {!isAdminLoggedIn ? (
                  // Admin access challenge
                  <div className="space-y-4 py-4 px-1">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                      <Lock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          {language === 'bn' ? 'অ্যাডমিন অনুমোদন আবশ্যক' : 'Administrative Authorization Required'}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                          {language === 'bn' 
                            ? 'Transparency bylaws অনুসারে, শুধুমাত্র অনুমোদিত অ্যাডমিনরা লাইভ চ্যারিটি ফিড আপডেট করতে পারবেন।'
                            : 'In accordance with compliance guidelines, only verified administrators can update the charity work records.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">
                        {language === 'bn' ? 'অ্যাডমিন সিক্রেট পাসকোড' : 'Admin Security Passcode'}
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdminAuthSubmit(e as any)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-[#3b82f6] focus:ring-1 focus:ring-blue-500 font-mono tracking-widest"
                      />
                      {passcodeError && (
                        <p className="text-[10px] text-red-500 font-medium mt-1">{passcodeError}</p>
                      )}
                      <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-1">
                        {language === 'bn' ? '* মূল্যায়নের জন্য সাহায্যকারী ডেফল্ট কি: "admin" অথবা "1234"' : '* Access key for evaluation: "admin" or "1234"'}
                      </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsPostModalOpen(false)}
                        className="px-4 py-2 text-xs font-mono font-bold uppercase text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                      >
                        {language === 'bn' ? 'বাতিল' : 'Cancel'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleAdminAuthSubmit(e as any)}
                        className="px-6 py-2.5 text-xs font-mono font-bold uppercase bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        {language === 'bn' ? 'যাচাই করুন' : 'Unlock & Proceed'}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Authorized entry creation form
                  <div className="space-y-4">
                    {/* Admin Status Header */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {language === 'bn' ? 'অ্যাডমিন অথেনটিকেশন সচল' : 'Admin Status: Signed In'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="text-[9px] font-mono font-bold uppercase text-red-500 hover:text-red-600 px-2.5 py-1 rounded-md bg-red-500/5 hover:bg-red-500/10 transition-all cursor-pointer"
                      >
                        {language === 'bn' ? 'লগআউট' : 'Lock Account'}
                      </button>
                    </div>

                    {/* Image source method selection */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">
                        {language === 'bn' ? 'ছবি/ভিডিও সংযুক্তি পদ্ধতি' : 'Media Attachment Method'}
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl max-w-xs">
                        <button
                          type="button"
                          onClick={() => setImgType('upload')}
                          className={`py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                            imgType === 'upload'
                              ? 'bg-white dark:bg-[#1e293b] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-350/5'
                              : 'text-slate-505 hover:text-slate-800 dark:hover:text-white'
                          }`}
                        >
                          {language === 'bn' ? 'ফাইল আপলোড করুন' : 'File Upload'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setImgType('url')}
                          className={`py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                            imgType === 'url'
                              ? 'bg-white dark:bg-[#1e293b] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-350/5'
                              : 'text-slate-505 hover:text-slate-800 dark:hover:text-white'
                          }`}
                        >
                          {language === 'bn' ? 'মিডিয়া ইউআরএল' : 'Media URL'}
                        </button>
                      </div>
                    </div>

                    {imgType === 'upload' ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-5 transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                          isDragging
                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/10'
                            : postMediaItems.length > 0
                            ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/5'
                            : 'border-slate-300 dark:border-slate-705 hover:border-slate-400 dark:hover:border-slate-600'
                        }`}
                      >
                        <input
                          type="file"
                          id="uploadImage"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <label htmlFor="uploadImage" className="cursor-pointer flex flex-col items-center">
                          <Upload className={`h-6 w-6 mb-2 ${postMediaItems.length > 0 ? 'text-emerald-500' : 'text-slate-400'}`} />
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {postMediaItems.length > 0 
                              ? (language === 'bn' ? 'আরও ফাইল আপলোড করুন' : 'Upload More Files')
                              : (language === 'bn' ? 'ড্র্যাগ করে অথবা ক্লিক করে ফাইল নির্বাচন করুন' : 'Drag or Click to Select File')
                            }
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'ছবি বা ভিডিও সরাসরি লিঙ্ক ইউআরএল' : 'Direct Media URL Address'}</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/photo-aid..."
                            value={postImageUrl}
                            onChange={(e) => setPostImageUrl(e.target.value)}
                            className="flex-grow px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-805 dark:text-slate-202 focus:outline-hidden focus:ring-1 focus:ring-blue-505"
                          />
                          <button
                            type="button"
                            onClick={handleAddUrl}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
                          >
                            {language === 'bn' ? '+ যোগ' : '+ Add'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Staged Draft Items List */}
                    {postMediaItems.length > 0 && (
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          {language === 'bn' ? `সংযুক্ত ফাইল তালিকা (${postMediaItems.length}টি)` : `Staged Media Queue (${postMediaItems.length} items)`}
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-2 bg-slate-50 dark:bg-[#111927] rounded-2xl border border-slate-200 dark:border-slate-800 max-h-36 overflow-y-auto">
                          {postMediaItems.map((src, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 group">
                              {isMediaVideo(src) ? (
                                <video src={src} className="w-full h-full object-cover" muted />
                              ) : (
                                <img src={src} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveMediaItem(idx)}
                                className="absolute top-1 right-1 p-0.5 bg-red-650 text-white rounded-full opacity-90 group-hover:opacity-100 hover:scale-110 transition-all z-10"
                                title="Remove item"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. Text fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'শিরোনাম (ইংরেজিতে, আবশ্যক)' : 'Title En (Required)'}</label>
                        <input
                          type="text"
                          placeholder="e.g. Free Kitchen at Slum Feed"
                          value={postTitleEn}
                          onChange={(e) => setPostTitleEn(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'শিরোনাম (বাংলায়, ঐচ্ছিক)' : 'Title Bn (Optional)'}</label>
                        <input
                          type="text"
                          placeholder="উদাঃ বস্তিতে বিনামূল্যে খাবার বিতরণ"
                          value={postTitleBn}
                          onChange={(e) => setPostTitleBn(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-205 focus:outline-hidden focus:ring-1 focus:ring-blue-505"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'অবস্থান (ইংরেজিতে, আবশ্যক)' : 'Location En (Required)'}</label>
                        <input
                          type="text"
                          placeholder="e.g. Dhaka, Bangladesh"
                          value={postLocEn}
                          onChange={(e) => setPostLocEn(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-802 dark:text-slate-205 focus:outline-hidden focus:ring-1 focus:ring-blue-505"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'অবস্থান (বাংলায়, ঐচ্ছিক)' : 'Location Bn (Optional)'}</label>
                        <input
                          type="text"
                          placeholder="উদাঃ ঢাকা, বাংলাদেশ"
                          value={postLocBn}
                          onChange={(e) => setPostLocBn(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-802 dark:text-slate-205 focus:outline-hidden focus:ring-1 focus:ring-blue-505"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1 md:col-span-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'কার্যক্রম বিভাগ' : 'Activity Category'}</label>
                        <select
                          value={postCategory}
                          onChange={(e) => setPostCategory(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="food">{language === 'bn' ? 'খাবার বিতরণ' : 'Food Distribution'}</option>
                          <option value="education">{language === 'bn' ? 'শিক্ষা সহায়তা' : 'Education Support'}</option>
                          <option value="health">{language === 'bn' ? 'স্বাস্থ্য ও সচেতনতা' : 'Health & Awareness'}</option>
                          <option value="relief">{language === 'bn' ? 'জরুরি ত্রাণ সাহায্য' : 'Relief & Emergency'}</option>
                          <option value="community">{language === 'bn' ? 'সামাজিক উন্নয়ন' : 'Community Project'}</option>
                          <option value="volunteer">{language === 'bn' ? 'স্বেচ্ছাসেবক কার্যক্রম' : 'Volunteer Activity'}</option>
                          <option value="events">{language === 'bn' ? 'মিটিং ও ফাউন্ডেশন সভা' : 'Meetings & Events'}</option>
                          <option value="initiatives">{language === 'bn' ? 'বিশেষ উদ্যোগ' : 'Special Initiatives'}</option>
                        </select>
                      </div>
                      <div className="space-y-1 md:col-span-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'ট্যাগস এন (কমা দিন)' : 'Tags En'}</label>
                        <input
                          type="text"
                          placeholder="e.g. Slum aid, Food"
                          value={postTagsEn}
                          onChange={(e) => setPostTagsEn(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-850 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-1">
                        <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'ট্যাগস বাংলা (কমা দিন)' : 'Tags Bn'}</label>
                        <input
                          type="text"
                          placeholder="উদাঃ ত্রাণ, সাহায্য"
                          value={postTagsBn}
                          onChange={(e) => setPostTagsBn(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-850 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'বিবরণ (ইংরেজিতে, আবশ্যক)' : 'Description En (Required)'}</label>
                      <textarea
                        rows={2}
                        placeholder="Provide case study description or audit detail..."
                        value={postDescEn}
                        onChange={(e) => setPostDescEn(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-850 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-slate-400">{language === 'bn' ? 'বিবরণ (বাংলায়, ঐচ্ছিক)' : 'Description Bn (Optional)'}</label>
                      <textarea
                        rows={2}
                        placeholder="বাংলায় কার্যক্রমের বর্ণনা লিখুন..."
                        value={postDescBn}
                        onChange={(e) => setPostDescBn(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-850 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsPostModalOpen(false)}
                        className="px-4 py-2 text-xs font-mono font-bold uppercase text-slate-505 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                      >
                        {language === 'bn' ? 'বাতিল' : 'Cancel'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleFormSubmit(e as any)}
                        className="px-6 py-2 text-xs font-mono font-bold uppercase bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        {language === 'bn' ? 'পোস্ট করুন' : 'Confirm & Post'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
