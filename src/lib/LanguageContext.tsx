import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation Dictionary for English and Bengali
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav Items
    'nav.about': 'About Us',
    'nav.overview': 'Who We Are',
    'nav.members': 'Trust Members',
    'nav.flagship': 'Upcoming Events',
    'nav.dashboard_pillars': 'Dashboard & Pillars',
    'nav.dashboard': 'Impact Dashboard',
    'nav.pillars': 'Our Pillars',
    'nav.stories': 'Success Stories',
    'nav.partnerships': 'CSR Partnerships',
    'nav.transparency': 'Transparency',
    'nav.media': 'Media',
    'nav.stories_media': 'Gallery',
    'nav.volunteer': 'Volunteer',
    'nav.donate': 'Donate Now',
    'nav.contact': 'Contact Us',

    // Hero Section
    'hero.badge': 'GOVT CERTIFIED MSME FOUNDATION',
    'hero.gov_title': 'Ministry of MSME, Govt of India',
    'hero.title_part1': 'Transforming Compassion Into',
    'hero.title_part2': 'Measurable Impact',
    'hero.description': "Building a future where no individual sleeps hungry, every child has an opportunity to thrive, and communities are empowered through collective action. Let's create long-term social value, together.",
    'hero.action_volunteer': 'Join as Volunteer',
    'hero.action_donate': 'Donate Now',
    'hero.explore_charter': 'Explore Trust Charter',

    // Notice Banner Ribbon & Modal
    'banner.title': 'Amra Manush Foundation: "Not just a Trust, a responsibility to change lives."',
    'banner.badge': 'TRUST CHARTER',
    'banner.sub': 'Together we can, together we will.',
    'banner.view_poster': 'View Official Poster',
    'banner.dismiss': 'Dismiss Notice',
    'banner.modal_badge': 'HUMANITY FIRST • আমরা মানুষ',
    'banner.modal_title_part1': 'Not just a Trust,',
    'banner.modal_title_part2': 'a responsibility to change lives.',
    'banner.modal_desc': 'Every life we touch represents a thread of systemic change we sew together for a more compassionate and equitable society.',
    'banner.govt_certified': 'GOVT CERTIFIED ORGANIZATION',
    'banner.sub_gold': '"Together we can, together we will"',
    'banner.red_ribbon': 'Helping underprivileged children grow, learn & dream.',
    'banner.domains_title': 'CORE STRATEGIC DOMAINS OF ENGAGEMENT:',
    'banner.domain1_title': 'Child Welfare',
    'banner.domain1_desc': 'Supporting underprivileged children for a better, brighter future.',
    'banner.domain2_title': 'Helping Families',
    'banner.domain2_desc': 'Standing by needy families in times of emergencies & livelihood gaps.',
    'banner.domain3_title': 'Homeless Support',
    'banner.domain3_desc': 'Providing care, seasonal warmth support, and shelter dignity to the homeless.',
    'banner.domain4_title': 'Animal Care',
    'banner.domain4_desc': 'Feeding, vaccination, and emergency caring for stray animals with love.',
    'banner.domain5_title': 'Community Service',
    'banner.domain5_desc': 'Working together collectively for a better and stronger, resilient society.',
    'banner.join_us': 'Join us. Be the reason someone smiles tomorrow.',
    'banner.serving': 'Serving Humanity, Spreading Smiles',

    // Overview Section
    'overview.title': 'Trust Purpose & Milestones',
    'overview.subtitle': 'About Us: We exist to uplift the distressed and forgotten citizens through methodical care and long-term socio-economic interventions.',
    'overview.timeline_title': 'The Amra Manush Journey',
    'overview.timeline_subtitle': 'Key milestones of execution',

    // Members Section
    'members.title': 'A Dedicated Governing Council',
    'members.subtitle': 'Led by selfless local leaders, PR professionals, and field advocates driving continuous support.',
    'members.role_cop': 'Contact Officer',
    'members.contact_now': 'Contact Now',

    // Flagship Component
    'flagship.title': 'Upcoming Food Distribution Events',
    'flagship.subtitle': 'Our flagship monthly food preservation and delivery campaigns for needy seniors and slum children.',
    'flagship.primary_goal': 'Eliminate Hunger',
    'flagship.nutrition_guaranteed': 'Micro-nutrients & quality guaranteed hot food.',

    // Dashboard Sections
    'dashboard.title': 'Impact Metrics & Live Dashboard',
    'dashboard.subtitle': 'Real-time performance metrics and audited resource allocation statements showing structural responsibility.',
    'dashboard.meals_dist': 'Meals Distributed',
    'dashboard.children_supp': 'Children Supported',
    'dashboard.comm_drives': 'Community Drives',
    'dashboard.vol_hours': 'Volunteer Hours',
    'dashboard.fam_reached': 'Families Reached',
    'dashboard.ben_served': 'Beneficiaries Served',
    'dashboard.officer_signin': 'Officer Sign-In',
    'dashboard.officer_desc': 'Verify official MSME registration, bylaws, and live financial ledgers directly from Google Drive.',
    'dashboard.weekly_impact': 'Weekly Impact Sourcing Metrics',
    'dashboard.resource_allocation': 'Resource Sourcing & Fund Allocation',
    'dashboard.distribution_mix': 'Beneficiary Sourcing & Distribution Mix',
    'dashboard.view_drive': 'Unlock Verified Drive Folders',

    // Pillars Section
    'pillars.title': 'Our Core Strategic Pillars',
    'pillars.subtitle': 'Methodical programs designed to uplift the distressed through sustainable developmental exercises.',
    'pillars.food_title': 'Food Security & Hunger Relief',
    'pillars.food_desc': 'Eliminating basic food insecurity among distressed street dwellers by serving warmth-loaded meals.',
    'pillars.child_title': 'Child Welfare & Protection',
    'pillars.child_desc': 'Halting childhood stunting and nutritional decay while sponsoring basic school kits and classes.',
    'pillars.comm_title': 'Community Empowerment',
    'pillars.comm_desc': 'Establishing clean drinking water systems, sanitation checkpoints, and livelihood vocational courses.',
    'pillars.dis_title': 'Disability & Rehab Assistance',
    'pillars.dis_desc': 'Sponsoring custom tricycles, prosthetics, and sensory therapy sessions for challenged citizens.',
    'pillars.eld_title': 'Dignified Elderly Care',
    'pillars.eld_desc': 'Organizing diagnostics health checkups, life-saving medicines, and counseling against loneliness.',
    'pillars.vol_title': 'Volunteer Mobilization',
    'pillars.vol_desc': 'Training community youth leaders in immediate disaster coordination and sub-kitchen management.',

    // Success Stories
    'stories.title': 'Stories of Resilient Transformations',
    'stories.subtitle': 'Behold the real human impact generated through our structural interventions, replacing despair with dignity.',
    'stories.rahul_title': 'Reclaiming Childhood: From Brick Kiln to Sreerampore Primary',
    'stories.rahul_challenge': 'Rahul, age 9, carried heavy bricks daily for low wages. Completely out of classes and suffering from clinical stunting.',
    'stories.rahul_intervention': 'Amra Manush intervened with Ekbelar Aahar and sponsored school fees, school bags, shoes, and uniform.',
    'stories.rahul_outcome': 'Now in Class IV, enjoys hot meals daily, and excels in math, keeping a high attendance rate.',
    'stories.prabhas_title': 'Restoring Dignity to Hindmotor’s Footpath Seniors',
    'stories.prabhas_challenge': 'Dada Prabhas, 74, lost his eyesight and begged near railway tracks, facing severe muscle decay.',
    'stories.prabhas_intervention': 'Enrolled him in daily food distribution and sponsored cataract surgery through clinical partnerships.',
    'stories.prabhas_outcome': 'Regained partial vision, relocated to safety, receiving routine medicine and warmth.',
    'stories.sunita_title': 'Wings to Sunita: A Leap in Adaptive Micro-Business',
    'stories.sunita_challenge': 'Sunita, 19, suffered spinal paralysis with zero mobility and was confined to a single room.',
    'stories.sunita_intervention': 'Sponsored custom-engineered tricycle and taught her basic digital cataloging skills.',
    'stories.sunita_outcome': 'Runs a small local center helping neighbors access digital services and state certificates.',

    // CSR Partnerships
    'partnerships.title': 'CSR Partnerships with Purpose',
    'partnerships.subtitle': 'Collaborate with Amra Manush to invest CSR portfolios securely into fully audited, compliance-guaranteed grassroots programs.',
    'partnerships.csr_proj': 'Tailored CSR Projects',
    'partnerships.csr_desc': 'Full compliance geo-tagged audit reports and 80G tax clearance certificates.',
    'partnerships.corp_vol': 'Corporate Volunteering',
    'partnerships.corp_vol_desc': 'Active hands-on bonding in central kitchens, packing, or environmental cleanup.',
    'partnerships.perp_meals': 'Perpetual Meal Sponsoring',
    'partnerships.perp_meals_desc': 'Sponsor full operations of a kitchen hub on key milestone days or corporate anniversaries.',
    'partnerships.alliance': 'Strategic Civil Alliance',
    'partnerships.alliance_desc': 'Jointly construct community water-wells, eco-toilets, and health camps.',

    // Financial Transparency
    'transparency.title': 'Sovereign Audit & Transparency',
    'transparency.subtitle': 'We run on 100% legal, financial, and moral accountability. Read and download our audited statements.',
    'transparency.gov_cert_title': 'Ministry of MSME License',
    'transparency.gov_cert_desc': 'Registered permanently as a Social Initiative under Govt of India, Hooghly registry.',
    'transparency.audit_rep': 'Annual Chartered Audit report',
    'transparency.logistics_stmt': 'Sourcing & Logistics Stmt',
    'transparency.strategic_road': 'Annual Strategic Roadmap',

    // FAQ Section
    'faq.title': 'Frequently Asked Queries',
    'faq.subtitle': 'Clear, direct answers regarding trust management, fundraising compliance, and distribution protocols.',
    'faq.q1': 'Is Amra Manush Foundation government certified?',
    'faq.a1': 'Yes, we are registered under Ministry of MSME, Government of India (Reg ID: UDYAM-WB-07-0130195) with direct Hooghly jurisdiction.',
    'faq.q2': 'Are donations eligible for tax exemptions?',
    'faq.a2': 'Yes, we are fully registered under Section 80G and 12A of the Income Tax Act, meaning all contributions receive standard tax rebates.',
    'faq.q3': 'How is financial transparency maintained?',
    'faq.a3': 'All accounts are reviewed annually by independent Chartered Accountants, and live statements are open to the public on our Google Drive.',

    // Volunteer Induction
    'volunteer.title': 'Enlist as a Civic Volunteer',
    'volunteer.subtitle': 'Be the change you seek. Join our active grassroots core group in distributing meals, kits, and disaster relief.',
    'volunteer.full_name': 'Full Name',
    'volunteer.ph_no': 'Phone Number',
    'volunteer.prev_exp': 'Previous Volunteering Experience',
    'volunteer.prev_no_exp': 'No prior experience, eager to learn',
    'volunteer.prev_some_exp': 'Some prior NGO work / college social initiatives',
    'volunteer.prev_rich_exp': 'Rich coordinator experience / disaster support',
    'volunteer.city_area': 'City / Local Area',
    'volunteer.select_interest': 'Strategic Interest Field',
    'volunteer.interest_cooking': 'Central Kitchen & Meal Packaging',
    'volunteer.interest_field': 'On-ground Distribution & Logistics',
    'volunteer.interest_admin': 'PR, Social Media, and Sponsoring Circles',
    'volunteer.interest_rehab': 'Child Education & Disability Care Assistance',
    'volunteer.interests_heading': 'Select Areas of Interest',
    'volunteer.submit': 'Submit Registration Form',
    'volunteer.success_msg': 'Thank you! Your volunteer application has been received. Our Hooghly coordinator will reach out shortly.',

    // Direct Donation
    'donate.title': 'Direct Meal Stewardship Gateway',
    'donate.subtitle': 'Every rupee feeds a real hungry human being. Calculated at standard prices, fully transparent and audited.',
    'donate.impact_header': 'Your Stewardship Level',
    'donate.sponsor_meals': 'Sponsor Meals',
    'donate.meals': 'Meals',
    'donate.feed_desc_title': 'Feed',
    'donate.feed_desc_end': 'destitute citizens',
    'donate.input_custom': 'Input Custom Amount (INR)',
    'donate.card_title': 'Direct Contribution Invoice',
    'donate.gov_rebate': 'Eligible for 80G Tax Rebates',
    'donate.upi_inst': 'Open any UPI App (GPay, PhonePe, Paytm) to scan the official Trust QR code below.',
    'donate.verify_badge': 'VERIFIED BANK TRANSFERS',

    // Contact
    'contact.title': 'Contact Our Governing Hub',
    'contact.subtitle': 'Need official credentials? Looking to propose corporate projects? Connect with our registered administrative officers.',
    'contact.reach_directly': 'Reach Us Directly',
    'contact.office_hq': 'Governing Secretariat HO',
    'contact.office_hq_desc': 'Standard office, field-substations, and coordinator hubs in Hooghly.',
    'contact.send_msg': 'Transmit Inquiry Dispatch',
    'contact.subject': 'Subject of Inquiry',
    'contact.write_msg': 'Write your message...',
    'contact.btn_send': 'Send Message',
    'contact.success_send': 'Your inquiry dispatch has been transmitted to our secretariat.',

    // Footer
    'footer.tagline': 'Building a more compassionate, equitable, and dignified human society together.',
    'footer.quick_links': 'Quick Navigation Rails',
    'footer.reg_seal': 'GOVERNMENT OF INDIA LICENSED',

    // General Words
    'general.scroll_to_top': 'Scroll to Top',
    'general.copy': 'Copy',
    'general.copied': 'Copied',
    'general.phone': 'Phone',
    'general.email': 'Email',
    'general.facebook': 'Facebook',
    'general.instagram': 'Instagram',
    'general.linkedin': 'LinkedIn',
    'general.address': 'Address',
    'general.close': 'Close',
  },
  bn: {
    // Nav Items
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.overview': 'আমরা কে',
    'nav.members': 'ট্রাস্ট মেম্বারগণ',
    'nav.flagship': 'আগামী ইভেন্টসমূহ',
    'nav.dashboard_pillars': 'ড্যাশবোর্ড ও স্তম্ভসমূহ',
    'nav.dashboard': 'প্রভাব ড্যাশবোর্ড',
    'nav.pillars': 'আমাদের স্তম্ভসমূহ',
    'nav.stories': 'সাফল্যের গল্প',
    'nav.partnerships': 'CSR পার্টনারশিপ',
    'nav.transparency': 'স্বচ্ছতা',
    'nav.media': 'মিডিয়া',
    'nav.stories_media': 'গ্যালারি',
    'nav.volunteer': 'স্বেচ্ছাসেবক',
    'nav.donate': 'দান করুন',
    'nav.contact': 'যোগাযোগ করুন',

    // Hero Section
    'hero.badge': 'সরকারি নিবন্ধিত এমএসএমই ফাউন্ডেশন',
    'hero.gov_title': 'এমএসএমই মন্ত্রক, ভারত সরকার',
    'hero.title_part1': 'সহানুভূতিকে রূপান্তর করুন',
    'hero.title_part2': 'পরিমাপযোগ্য প্রভাবে',
    'hero.description': "এমন একটি ভবিষ্যৎ গড়ে তোলা যেখানে কেউ ক্ষুধার্ত ঘুমাতে যাবে না, প্রত্যেক শিশুর বিকাশের সুযোগ থাকবে এবং যৌথ প্রচেষ্টার মাধ্যমে সমাজ ক্ষমতায়িত হবে। আসুন একসাথে দীর্ঘমেয়াদি সামাজিক মূল্য তৈরি করি।",
    'hero.action_volunteer': 'স্বেচ্ছাসেবক হোন',
    'hero.action_donate': 'এখনি দান করুন',
    'hero.explore_charter': 'আমাদের চার্টার দেখুন',

    // Notice Banner Ribbon & Modal
    'banner.title': 'আমরা মানুষ ফাউন্ডেশন: "শুধু একটা ট্রাস্ট নয়, জীবন পরিবর্তনের একটি দায়িত্ব।',
    'banner.badge': 'ট্রাস্ট চার্টার',
    'banner.sub': 'একসাথে আমরা পারি, একসাথে আমরা করব।',
    'banner.view_poster': 'অফিসিয়াল পোস্টার দেখুন',
    'banner.dismiss': 'বন্ধ করুন',
    'banner.modal_badge': 'সবার আগে মানুষ • আমরা মানুষ',
    'banner.modal_title_part1': 'শুধু একটা ট্রাস্ট নয়,',
    'banner.modal_title_part2': 'জীবন পরিবর্তনের একটি দায়িত্ব।',
    'banner.modal_desc': 'আমরা যে প্রতিটি জীবন স্পর্শ করি তা একটি সহানুভূতিশীল এবং ন্যায়সঙ্গত সমাজের জন্য যৌথ পরিবর্তনের সুতো বুনে চলে।',
    'banner.govt_certified': 'সরকারি নিবন্ধিত সংস্থা',
    'banner.sub_gold': '"একসাথে আমরা পারি, একসাথে আমরা করব"',
    'banner.red_ribbon': 'সুবিধাবঞ্চিত শিশুদের বৃদ্ধি, শিক্ষা এবং স্বপ্ন পূরণে সাহায্য করা।',
    'banner.domains_title': 'কাজের মূল কৌশলগত ক্ষেত্রসমূহ:',
    'banner.domain1_title': 'শিশু কল্যাণ',
    'banner.domain1_desc': 'একটি সুন্দর ও উজ্জ্বল ভবিষ্যতের জন্য সুবিধাবঞ্চিত শিশুদের পাশে দাঁড়ানো।',
    'banner.domain2_title': 'পরিবারকে সাহায্য',
    'banner.domain2_desc': 'জরুরি অবস্থা এবং জীবিকার সংকটে অভাবী পরিবারের পাশে দাঁড়ানো।',
    'banner.domain3_title': 'গৃহহীনদের সহায়তা',
    'banner.domain3_desc': 'গৃহহীনদের যত্ন, ঋতুভিত্তিক উষ্ণতা প্রদান এবং সম্মানজনক আশ্রয়ের ব্যবস্থা করা।',
    'banner.domain4_title': 'প্রাণীদের যত্ন',
    'banner.domain4_desc': 'ভালোবাসার সাথে পথচলতি প্রাণীদের খাবার, টিকাকরণ এবং জরুরি চিকিৎসা নিশ্চিত করা।',
    'banner.domain5_title': 'সমাজসেবা',
    'banner.domain5_desc': 'একটি সুন্দর, শক্তিশালী ও উন্নত সমাজ গঠনে ঐক্যবদ্ধভাবে কাজ করা।',
    'banner.join_us': 'আমাদের সাথে যুক্ত হোন। কারো মুখে হাসি ফোটানোর কারণ হোন।',
    'banner.serving': 'মানবতার সেবা, মুখে হাসি ফোটানো',

    // Overview Section
    'overview.title': 'ট্রাস্টের উদ্দেশ্য ও অর্জিত মাইলফলক',
    'overview.subtitle': 'আমাদের সম্পর্কে: আমরা পদ্ধতিগত সেবা এবং দীর্ঘমেয়াদি আর্থ-সামাজিক পদক্ষেপের মাধ্যমে সুবিধাবঞ্চিত ও অবহেলিত নাগরিকদের পাশে দাঁড়িয়েছি।',
    'overview.timeline_title': 'আমরা মানুষের পথচলা',
    'overview.timeline_subtitle': 'আমাদের কাজের গুরুত্বপূর্ণ মাইলফলক',

    // Members Section
    'members.title': 'একটি নিবেদিত পরিচালনা কমিটি',
    'members.subtitle': 'নিবেদিতপ্রাণ স্থানীয় নেতৃবৃন্দ, জনসংযোগ কর্মকর্তা এবং মাঠপর্যায়ের কর্মীদের দ্বারা পরিচালিত।',
    'members.role_cop': 'যোগাযোগ কর্মকর্তা',
    'members.contact_now': 'যোগাযোগ করুন',

    // Flagship Component
    'flagship.title': 'আগামী আহার বিতরণ ইভেন্টসমূহ',
    'flagship.subtitle': 'অসহায় প্রবীণ ব্যক্তি এবং বস্তির শিশুদের জন্য আমাদের প্রধান মাসিক খাদ্য বণ্টন এবং আহার অভিযানসমূহ।',
    'flagship.primary_goal': 'ক্ষুধা নির্মূল',
    'flagship.nutrition_guaranteed': 'পুষ্টিকর উপাদান ও গুণমান নিশ্চিত করা গরম খাবার।',

    // Dashboard Sections
    'dashboard.title': 'প্রভাব পরিমাপক এবং লাইভ ড্যাশবোর্ড',
    'dashboard.subtitle': 'বাস্তব সময়ের কাজের বিবরণ এবং নিরীক্ষিত তহবিল বণ্টন সংক্রান্ত প্রতিবেদন, যা আমাদের কাঠামোগত স্বচ্ছতার উদাহরণ।',
    'dashboard.meals_dist': 'বিতরণকৃত খাবার',
    'dashboard.children_supp': 'সহায়তা প্রাপ্ত শিশু',
    'dashboard.comm_drives': 'সামাজিক অভিযান',
    'dashboard.vol_hours': 'স্বেচ্ছা সেবামূলক ঘণ্টা',
    'dashboard.fam_reached': 'সাহায্যপ্রাপ্ত পরিবার',
    'dashboard.ben_served': 'মোট সুবিধাপ্রাপ্ত মানুষ',
    'dashboard.officer_signin': 'officer sign-in',
    'dashboard.officer_desc': 'গুগল ড্রাইভ থেকে সরাসরি আমাদের অফিসিয়াল এমএসএমই রেজিস্ট্রেশন, বিধিমালা এবং লাইভ আর্থিক ফাইল যাচাই করুন।',
    'dashboard.weekly_impact': 'সাপ্তাহিক পুষ্টিকর আহার বিতরণ চিত্র',
    'dashboard.resource_allocation': 'সম্পদ সোর্সিং এবং ফান্ড বণ্টন',
    'dashboard.distribution_mix': 'সুবিধাপ্রাপ্ত শ্রেণী এবং বিতরণ বিন্যাস',
    'dashboard.view_drive': 'অনুমোদিত ড্রাইভ ফোল্ডার আনলক করুন',

    // Pillars Section
    'pillars.title': 'আমাদের কাজের মূল স্তম্ভসমূহ',
    'pillars.subtitle': 'সুবিধাবঞ্চিতদের জীবনযাত্রার মানোন্নয়নে আমাদের পরিকল্পিত টেকসই এবং কল্যাণমুখী কার্যক্রম।',
    'pillars.food_title': 'খাদ্য নিরাপত্তা এবং ক্ষুধা মুক্তি',
    'pillars.food_desc': 'অসহায় মানুষদের জন্য সুস্বাদু এবং সুষম পুষ্টিগুণ সমৃদ্ধ রান্না করা গরম খাবারের ব্যবস্থা করা।',
    'pillars.child_title': 'শিশু কল্যাণ এবং সুরক্ষা',
    'pillars.child_desc': 'অপুষ্টি দূরীকরণে স্বাস্থ্য পর্যবেক্ষণ এবং শিক্ষাদানসহ বিনামূল্যে স্কুলের বই-খাতা ও পোশাক বিতরণ।',
    'pillars.comm_title': 'সামাজিক সশক্তিকরণ',
    'pillars.comm_desc': 'বিশুদ্ধ সুপেয় জল ও স্বাস্থ্যসম্মত শৌচাগার স্থাপন এবং যুবকদের কর্মমুখী বৃত্তিমূলক শিক্ষা প্রদান।',
    'pillars.dis_title': 'প্রতিবন্ধী সহায়তা এবং পুনর্বাসন',
    'pillars.dis_desc': 'শারীরিক প্রতিবন্ধকতাযুক্ত মানুষদের কৃত্রিম অঙ্গ, হুইলচেয়ার এবং বিশেষ থেরাপি সেশনের ব্যবস্থা করা।',
    'pillars.eld_title': 'সম্মানজনক বার্ধক্যকালীন সেবা',
    'pillars.eld_desc': 'স্থায়ী বা সাময়িক অসুস্থতায় বিনামূল্যে ডাক্তার ও ওষুধ প্রদান এবং একাকীত্ব নিরসনে মানসিক যত্ন।',
    'pillars.vol_title': 'স্বেচ্ছাসেবক পরিচালনা',
    'pillars.vol_desc': 'সমাজসেবা ও দুর্যোগ ব্যবস্থাপনায় স্থানীয় যুব সমাজকে প্রশিক্ষণ প্রদান ও পরিচালনা করা।',

    // Success Stories
    'stories.title': 'নতুন জীবনের রূপকথার গল্প',
    'stories.subtitle': 'আমাদের ক্ষুদ্র পদক্ষেপের মাধ্যমে ফিরে পাওয়া কিছু বাস্তব চমৎকার ও সম্মানজনক মানুষের গল্প।',
    'stories.rahul_title': 'ফিরে পাওয়া শৈশব: ইটের ভাটা থেকে শ্রীরামপুর প্রাইমারি',
    'stories.rahul_challenge': '৯ বছরের শিশু রাহুল দিনমজুর মায়ের অভাবের সংসারে দৈনিক ৮ ঘণ্টা ইটের মাথায় তোলার কাজ করত। সে শিক্ষা ও প্রয়োজনীয় পুষ্টি থেকে সম্পূর্ণ বঞ্চিত ছিল।',
    'stories.rahul_intervention': 'আমরা মানুষ ফাউন্ডেশন "একবেলার আহার" এর দায়িত্ব নেয় এবং রাহুলের স্কুল ফি, বই-ব্যাগ, জুতো ও পোশাকের সম্পূর্ণ স্পন্সর করে।',
    'stories.rahul_outcome': 'রাহুল এখন চতুর্থ শ্রেণীতে পড়ছে, প্রতিদিন পুষ্টিকর খাবার পাচ্ছে এবং গণিতে তার অসাধারণ প্রতিভা দেখিয়ে ক্লাসে ৯৪% উপস্থিতি বজায় রেখেছে।',
    'stories.prabhas_title': 'হিন্দমোটরের ফুটপাথের প্রবীণদের সম্মান পুনরুদ্ধার',
    'stories.prabhas_challenge': '৭৪ বছর বয়সী দাদা প্রভাস দৃষ্টিশক্তি হারিয়ে হিন্দমোটর রেলওয়ে স্টেশনের পাশে শুয়ে থাকতেন। অপরিচ্ছন্ন নোংরা জল এবং অবশিষ্টাংশ খেয়ে দিন কাটত।',
    'stories.prabhas_intervention': 'আমাদের আহার টিম উনাকে প্রতিদিন নিরাপদ রান্না করা খাবার পৌঁছে দিতে শুরু করে এবং চক্ষু শিবিরের মাধ্যমে উনার বিনামূল্যে ছানি অপারেশনের ব্যবস্থা করে।',
    'stories.prabhas_outcome': 'দাদা প্রভাস উনার দৃষ্টিশক্তি আংশিক ফিরে পেয়েছেন, নিরাপদ আশ্রয়ে আছেন এবং প্রতিদিন তিন বেলা পুষ্টিকর খাবার ও নিয়মিত ওষুধ পাচ্ছেন।',
    'stories.sunita_title': 'সুনীতার ডানা: আত্মনির্ভরশীলতার এক নতুন উড়ান',
    'stories.sunita_challenge': '১৯ বছর বয়সী সুনীতা নিচু অঙ্গের পক্ষাঘাতে (প্যারালাইসিস) ভুগছিলেন, সম্পূর্ণ চলাচমহীন অবস্থায় গৃহবন্দী হয়ে জীবন কাটাচ্ছিলেন।',
    'stories.sunita_intervention': 'আমরা মানুষ উনাকে একটি হস্তচালিত তিন চাকার সাইকেল প্রদান করে এবং মোবাইল ফোনে বেসিক ডেটা সেন্টারের কাজের প্রশিক্ষণ প্রদান করে।',
    'stories.sunita_outcome': 'তিনি এখন স্বাধীনভাবে ঘুরে বেড়ান এবং স্থানীয় অধিবাসীদের সরকারি ফর্ম ফিলাপ ও পরিষেবা প্রাপ্তির কাজে সাহায্য করে একটি ছোট ব্যবসা চলান।',

    // CSR Partnerships
    'partnerships.title': 'সামাজিক দায়িত্ব (CSR) পার্টনারশিপ',
    'partnerships.subtitle': 'আমরা মানুষের সাথে যুক্ত হয়ে আপনার প্রতিষ্ঠানের সিএসআর বাজেটকে সুনির্দিষ্ট, নির্ভরযোগ্য এবং সম্পূর্ণ অডিটযোগ্য সামাজিক প্রকল্পে বিনিয়োগ করুন।',
    'partnerships.csr_proj': 'কাস্টমাইজড সিএসআর প্রকল্প',
    'partnerships.csr_desc': 'সম্পূর্ণ জিও-ট্যাগড এবং কাজের প্রমাণ সহ অগ্রগতি রিপোর্ট এবং স্বচ্ছ ৮০জি আয়কর ছাড়ের রসিদ।',
    'partnerships.corp_vol': 'কর্পোরেট স্বেচ্ছাসেবা',
    'partnerships.corp_vol_desc': 'আমাদের সেন্ট্রাল কিচেনে সরাসরি খাবার প্যাকেজিং, ক্যাম্পিং বা পরিবেশ পরিষ্কার ড্রাইভে অংশগ্রহণ।',
    'partnerships.perp_meals': 'নিয়মিত আহার স্পন্সর',
    'partnerships.perp_meals_desc': 'কোনো বিশেষ স্মরণীয় দিন বা জন্মবার্ষিকী উপলক্ষে আমাদের একটি আহার কিচেন হাবের একদিনের সম্পূর্ণ খাবার বিতরণ স্পন্সর করুন।',
    'partnerships.alliance': 'সামাজিক পরিকাঠামো নির্মাণ',
    'partnerships.alliance_desc': 'যৌথভাবে সৌর-চালিত বিশুদ্ধ সুপেয় জলের পাম্প, শৌচাগার বা স্বাস্থ্য কেন্দ্রের পরিকাঠামো গড়ে তোলা।',

    // Financial Transparency
    'transparency.title': 'স্বচ্ছতা এবং নির্ভরযোগ্য অডিট রিপোর্ট',
    'transparency.subtitle': 'আমাদের প্রতিটি হিসাব ১০০% আইনি ও সামাজিক নিয়মাবলী মেনে নিয়ন্ত্রিত। আমাদের অনুমোদিত আর্থিক অডিট রিপোর্টগুলি সরাসরি দেখুন।',
    'transparency.gov_cert_title': 'ভারত সরকারের এমএসএমই লাইসেন্স',
    'transparency.gov_cert_desc': 'হুগলি জেলা এক্তিয়ারের অধীনে সমাজসেবামূলক প্রতিষ্ঠান হিসেবে ভারত সরকার দ্বারা স্থায়ীভাবে নিবন্ধিত।',
    'transparency.audit_rep': 'বার্ষিক চার্টার্ড অডিট রিপোর্ট',
    'transparency.logistics_stmt': 'খাদ্য সোর্সিংলাইভ হিসাব',
    'transparency.strategic_road': 'বার্ষিক স্ট্র্যাটেজিক পরিকল্পনা',

    // FAQ Section
    'faq.title': 'সাধারণ জিজ্ঞাস্য প্রশ্নাবলী',
    'faq.subtitle': 'আমাদের ট্রাস্টের কার্যপ্রণালী, অর্থ সংগ্রহ, সিএসআর নিয়ম এবং কাজের স্বচ্ছতা সম্পর্কে সরাসরি উত্তর।',
    'faq.q1': 'আমরা মানুষ কি একটি সরকারি নিবন্ধিত সংস্থা?',
    'faq.a1': 'হ্যাঁ, আমরা ভারত সরকারের ক্ষুদ্র ও মাঝারি শিল্প মন্ত্রকের (Reg ID: UDYAM-WB-07-0130195) অধীনে হুগলি অঞ্চলের এক্তিয়ারে নিবন্ধিত।',
    'faq.q2': 'দান করা অর্থের উপর কি আয়কর ছাড় পাওয়া যায়?',
    'faq.a2': 'হ্যাঁ, আমাদের ট্রাস্টটি আয়কর আইনের 12A এবং 80G ধারায় নিবন্ধিত, তাই সমস্ত দানের ওপর সরকারি নিয়ম অনুযায়ী ৮০জি ট্যাক্স ছাড় পাবেন।',
    'faq.q3': 'আর্থিক স্বচ্ছতা কীভাবে নিশ্চিত করা হয়?',
    'faq.a3': 'সব হিসাব প্রতি বছর রেজিস্টার্ড চার্টার্ড অ্যাকাউন্ট্যান্ট দ্বারা নিরীক্ষিত (অডিট) হয় এবং প্রতিবেদনগুলি আমাদের গুগল ড্রাইভে সকলের দেখার জন্য উন্মুক্ত রাখা হয়।',

    // Volunteer Induction
    'volunteer.title': 'স্বেচ্ছাসেবক হিসেবে যুক্ত হোন',
    'volunteer.subtitle': 'কাঙ্ক্ষিত পরিবর্তনটি নিজের মধ্যে আনুন। সুবিধাবঞ্চিতদের মুখে একবেলা আহার, শিক্ষা এবং ত্রাণ বিতরণ করতে আমাদের তরুণ সমাজের অংশ হোন।',
    'volunteer.full_name': 'আপনার নাম',
    'volunteer.ph_no': 'ফোন নম্বর',
    'volunteer.prev_exp': 'সামাজিক কাজে পূর্ব অভিজ্ঞতা',
    'volunteer.prev_no_exp': 'কোনো অভিজ্ঞতা নেই, শিখতে আগ্রহী',
    'volunteer.prev_some_exp': 'কিছুটা অভিজ্ঞতা আছে / কলেজ সোশ্যাল উইং',
    'volunteer.prev_rich_exp': 'অভিজ্ঞ সমাজকর্মী / টিম পরিচালনা করেছেন',
    'volunteer.city_area': 'শহর / স্থানীয় এলাকা',
    'volunteer.select_interest': 'কাজের পছন্দের ক্ষেত্র',
    'volunteer.interest_cooking': 'সেন্ট্রাল কিচেন এবং খাদ্য প্যাকেজিং',
    'volunteer.interest_field': 'অন-ফিল্ড খাদ্য বিতরণ এবং সাহায্য কর্মকাণ্ড',
    'volunteer.interest_admin': 'পিআর, সোশ্যাল মিডিয়া এবং স্পন্সর পরিচালনা',
    'volunteer.interest_rehab': 'শিশু শিক্ষা এবং শারীরিক অক্ষমদের পুনর্বাসন',
    'volunteer.interests_heading': 'কাজের পছন্দের ক্ষেত্র চিহ্নিত করুন',
    'volunteer.submit': 'আবেদন পত্র জমা দিন',
    'volunteer.success_msg': 'ধন্যবাদ! আপনার স্বেচ্ছাসেবকের আবেদনটি জমা হয়েছে। আমাদের হুগলি কো-অর্ডিনেটর শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',

    // Direct Donation
    'donate.title': 'ক্ষুধামুক্তির আহার স্পন্সরশিপ',
    'donate.subtitle': 'আপনার দেওয়া প্রতিটি টাকা সরাসরি একজন ক্ষুধার্ত মানুষের মুখে খাবার তুলে দিতে ব্যবহৃত হয়। সম্পূর্ণ নিখুঁত, অডিটযোগ্য এবং স্বচ্ছ।',
    'donate.impact_header': 'আপনার সাহায্যকারী স্থায়িত্ব',
    'donate.sponsor_meals': 'আহার প্রদান করুন',
    'donate.meals': 'বেলা আহার',
    'donate.feed_desc_title': 'খাওয়ান',
    'donate.feed_desc_end': 'জন অভাবী মানুষকে',
    'donate.input_custom': 'টাকার পরিমাণ লিখুন (INR)',
    'donate.card_title': 'সরাসরি আর্থিক অনুদান রসিদ',
    'donate.gov_rebate': '৮০জি আয়কর ছাড়ের যোগ্য',
    'donate.upi_inst': 'যেকোনো ইউপিআই অ্যাপ (GPay, PhonePe, Paytm) ওপেন করে নিচে দেওয়া ট্রাস্টের অফিশিয়াল কিউআর কোডটি স্ক্যান করে অনুদান ও সাহায্য পাঠান।',
    'donate.verify_badge': 'যাচাইকৃত সরাসরি ব্যাংক অ্যাকাউন্ট বদলি',

    // Contact
    'contact.title': 'পরিচালনা কমিটির সাথে যোগাযোগ করুন',
    'contact.subtitle': 'কোনো শংসাপত্র প্রয়োজন? অথবা আপনার কোম্পানির সিএসআর প্রজেক্টের প্রস্তাব পাঠাতে চান? সরাসরি আমাদের কর্মকর্তাদের সাথে যোগাযোগ করুন।',
    'contact.reach_directly': 'সরাসরি যোগাযোগ',
    'contact.office_hq': 'প্রধান কার্যালয় সেকরেটারিয়েট',
    'contact.office_hq_desc': 'হুগলি জেলায় আমাদের কোর প্রধান কার্যালয়, এবং খাদ্য বণ্টন হাবসমূহ।',
    'contact.send_msg': 'যোগাযোগ ও মেসেজ পাঠান',
    'contact.subject': 'যোগাযোগের বিষয়বস্তু',
    'contact.write_msg': 'মেসেজটি এখানে লিখুন...',
    'contact.btn_send': 'মেসেজ পাঠান',
    'contact.success_send': 'আপনার মেসেজটি সফলভাবে আমাদের সচিবালয়ে প্রেরিত হয়েছে।',

    // Footer
    'footer.tagline': 'building a more compassionate, equitable, and dignified human society together.',
    'footer.quick_links': 'Quick Navigation Rails',
    'footer.reg_seal': 'GOVERNMENT OF INDIA LICENSED',

    // General Words
    'general.scroll_to_top': 'উপরে যান',
    'general.copy': 'কপি',
    'general.copied': 'কপি হয়েছে',
    'general.phone': 'ফোন',
    'general.email': 'ইমেইল',
    'general.facebook': 'ফেসবুক',
    'general.instagram': 'ইনস্টাগ্রাম',
    'general.linkedin': 'লিঙ্কডইন',
    'general.address': 'ঠিকানা',
    'general.close': 'বন্ধ করুন',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('amf_language') as Language;
    if (savedLang === 'en' || savedLang === 'bn') {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('amf_language', lang);
  };

  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English if key missing
    if (translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
