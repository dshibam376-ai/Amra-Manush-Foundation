import { 
  ImpactMetric, 
  ImpactStory, 
  StrategicPillar, 
  SuccessStory, 
  GalleryItem, 
  ReportItem,
  PartnerOpportunity,
  TeamMember
} from './types';

// Large Impact Indicators for the counters
export const IMPACT_COUNTERS = [
  { id: 'meals', value: 1540, suffix: '+', label: 'Nutritious Meals Served', description: 'Assuring daily nutrition via Ekbelar Aahar Abhiyan' },
  { id: 'children', value: 125, suffix: '+', label: 'Children Supported', description: 'Nourished, educated, and protected under our wing' },
  { id: 'volunteers', value: 16, suffix: '+', label: 'Active Volunteers', description: 'Driving grassroots level positive change daily' },
  { id: 'programs', value: 6, suffix: '+', label: 'Community Drives Conducted', description: 'Health camps, disaster relief, and dignity campaigns' }
];

export const GEOGRAPHIC_FOCUS = {
  region: "West Bengal & Eastern India Focus",
  districts: ["Hooghly", "Sreerampore", "Hindmotor", "Kolkata Slums", "Sundarbans Delta Border communities"],
  centers: 3,
  description: "Operating with structural accountability from our headquarters in Hindmotor, Hooghly, we coordinate local hubs and direct field-distribution nodes throughout suburban and urban West Bengal."
};

// Strategic Pillars of the Foundation
export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    id: 'food',
    title: 'Food Security & Hunger Relief',
    icon: 'Utensils',
    tag: 'EKBELAR AAHAR',
    objectives: [
      'Eliminating basic food insecurity among distressed street dwellers.',
      'Sustaining hot, nutritious meals loaded with balanced micro-nutrients.',
      'Ensuring food redundancy systems for extreme crisis zones.'
    ],
    impactGoals: [
      'Serve 50,000 meals annually by 2028.',
      'Establish 2 centralized sub-district kitchens.'
    ],
    beneficiaryFocus: 'Homeless individuals, destitute children, elderly abandoned citizens.'
  },
  {
    id: 'children',
    title: 'Child Welfare & Protection',
    icon: 'HeartHandshake',
    tag: 'SABYASACHI',
    objectives: [
      'Halting childhood stunting and nutritional decay through health-monitoring.',
      'Sponsoring elementary education and essential school-kit accessories.',
      'Establishing child safe-zones and psychological wellness guidance.'
    ],
    impactGoals: [
      'Transition 150 children into formal learning pathways.',
      'Supply monthly nutritional supplements to 250 rural mothers.'
    ],
    beneficiaryFocus: 'Slum-dwelling kids, child laborers in rehabilitation, brick kiln working-nest families.'
  },
  {
    id: 'community',
    title: 'Community Empowerment',
    icon: 'Users',
    tag: 'PAGARSTHA',
    objectives: [
      'Establishing water purification structures and immediate basic sanitation centers.',
      'Conducting digital skill-building and vocational workshops for youths.',
      'Disseminating awareness regarding government pension programs and social entitlements.'
    ],
    impactGoals: [
      'Equip 100 people with employable retail and handicraft skills.',
      'Bring clean running drinking water to 2 isolated habitats.'
    ],
    beneficiaryFocus: 'Underemployed youth, marginalized social category individuals.'
  },
  {
    id: 'disability',
    title: 'Disability & Rehab Assistance',
    icon: 'Sparkles',
    tag: 'SAMARTHAN',
    objectives: [
      'Offering prosthetic support, assistive tricycles, and customized wheelchairs.',
      'Formulating adaptive sensory classrooms for neurodivergent children.',
      'Creating inclusive employment-readiness training camps.'
    ],
    impactGoals: [
      'Deliver crucial mobility aids to 50 individuals on waitlists.',
      'Sponsor reconstructive therapeutic consultations'
    ],
    beneficiaryFocus: 'Visually/physically challenged youths, underprivileged patients with spinal distress.'
  },
  {
    id: 'elderly',
    title: 'Dignified Elderly Care',
    icon: 'ShieldAlert',
    tag: 'PROTIK',
    objectives: [
      'Organizing physical therapy and diagnostic health checkups.',
      'Fulfilling vital monthly pharmaceutical regimens for chronic ailments.',
      'Fostering companionship and counseling against domestic alienation.'
    ],
    impactGoals: [
      'Support 80 senior citizens with uninterrupted medicine supplies.',
      'Construct a daytime modern medical sanctuary for geriatric clients.'
    ],
    beneficiaryFocus: 'Indigent, abandoned senior citizens without family support structures.'
  },
  {
    id: 'volunteering',
    title: 'Volunteer Mobilization',
    icon: 'Activity',
    tag: 'AMRA SHENANI',
    objectives: [
      'Training community youth leaders in immediate disaster response.',
      'Mobilizing civic cohorts for neighborhood sanitation and mass-kitchen operations.',
      'Providing certificate-backed social leadership developmental exercises.'
    ],
    impactGoals: [
      'Activate a 150-strong regional volunteer reserve.',
      'Engage 5 top universities in structured field service programs.'
    ],
    beneficiaryFocus: 'College students, corporate working professionals, rural youth champions.'
  }
];

// Success stories (Case studies)
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    title: 'Reclaiming Childhood: From Brick Kiln to Hindmotor Primary',
    category: 'Child Welfare',
    challenge: 'Rahul, age 9, worked 8 hours daily carrying bricks to aid his mother’s low budget daily earning in Sreerampore. He was completely out of the school framework and suffered chronic malnutrition.',
    intervention: 'Amra Manush Foundation intervened via Ekbelar Aahar Abhiyan, guaranteeing nutritional security to the family. We then sponsored Rahul’s school enrollment fees, uniform, and mental rehabilitation guidance.',
    outcome: 'Rahul is currently in Class IV, enjoying regular meals and showcasing an exceptional talent for geometry, maintaining 94% classroom attendance.',
    metrics: [
      { label: 'Nutritional Boost', value: '100% stable' },
      { label: 'Weekly School Hours', value: '35 hours' }
    ],
    image: 'rahul.jpg',
    quote: "With Amra Manush safeguarding our meals, I finally stopped worrying about empty stoves and saw my son pick up a textbook instead of a brick.",
    author: "Latika Bauri (Rahul's Mother)"
  },
  {
    id: 'story-2',
    title: 'Restoring Dignity to Sreerampore’s Footpath Seniors',
    category: 'Geriatric Care',
    challenge: 'Dada Prabhas, 74, lost his eyesight and was abandoned near the railway tracks in Hindmotor. For days, he subsisted on dirty track-side water and random scraps.',
    intervention: 'Our Ekbelar Aahar team integrated Dada Prabhas into our daily door-to-door fresh meal distribution network. Additionally, we coordinated with an ophthalmic ally to sponsor his cataract surgery.',
    outcome: 'Prabhas has regained partial vision, lives in a secure shelter, and receives warm daily food and routine medicines.',
    metrics: [
      { label: 'Vision Restored', value: '75%' },
      { label: 'Daily Meals Guaranteed', value: '3 times' }
    ],
    image: 'prabhas.jpg',
    quote: "I thought my closing years would end in absolute darkness. Amra Manush brought both literal light to my eyes and physical food to my frail hands.",
    author: "Prabhas Roy (Beneficiary)"
  },
  {
    id: 'story-3',
    title: 'Providing Wings to Sunita: A Leap in Adaptive Living',
    category: 'Disability Support',
    challenge: 'Sunita, an aspirational 19-year-old with bilateral lower-limb paralysis, faced absolute isolation. She had no mobility aid and was confined to a single room in Hooghly.',
    intervention: 'Amra Manush sponsored a custom-engineered hand-cranked tricycle and equipped her with smartphone-based basic digital cataloging skills.',
    outcome: 'She now travels independently and runs a small micro-business helping neighbors register local grievances and access state certificates online.',
    metrics: [
      { label: 'Independent Travel Radius', value: '5 km' },
      { label: 'Monthly Household Income', value: '₹4,500+' }
    ],
    image: 'sunita.jpg',
    quote: "The tricycle isn't just a vehicle—it's my freedom. I no longer call myself a burden; I am a local digital facilitator.",
    author: "Sunita Das (Micro-Entrepreneur)"
  }
];

// Human-centered Flagship Narratives
export const FLAGSHIP_STORIES: ImpactStory[] = [
  {
    id: 'aahar-story-1',
    title: 'Empowering Widows Through Centralized Kitchen Employment',
    name: 'Anjali Mondal',
    age: 42,
    location: 'Hindmotor, Hooghly',
    challenge: 'Widowed at 39, Anjali had no formal training or literacy, which made her highly vulnerable to exploitative daily labor contracts.',
    intervention: 'Recruited as a lead chef in the Ekbelar Aahar administrative dining hub, receiving high fair-wage compensation, nutritional sanitization education, and financial savings planning assistance.',
    outcome: 'Anjali supervises a team preparing 150 clean, healthy meals daily. She sends her elder daughter to a prestigious local Nursing Academy.',
    image: 'anjali.jpg',
    metrics: ['Stable Monthly Salary', 'Lead Kitchen Inspector', 'Certified HACCP Hygienist']
  }
];

// Photo & Media Gallery items
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'food',
    src: '/notice_banner_bn_final.jpg',
    title: 'Ekbelar Aahar Abhiyan (Bengali Poster)',
    description: 'The official campaign flyer in Bengali outlining the core goals, credentials, and contact details of the Ekbelar Aahar Abhiyan.'
  },
  {
    id: 'gal-2',
    category: 'children',
    src: 'https://images.unsplash.com/photo-1544027751-2df8d0ea6c0f?auto=format&fit=crop&q=80&w=800',
    title: 'Sponsorship Kit Distribution',
    description: 'Providing premium bags, drawing notebooks, geometry sets, and winter uniforms.'
  },
  {
    id: 'gal-3',
    category: 'volunteer',
    src: 'https://images.unsplash.com/photo-1559027615-cd9466897052?auto=format&fit=crop&q=80&w=800',
    title: 'Volunteers Packaging Food',
    description: 'Our youth warriors inspecting thermal boxes to assure warmth and absolute hygiene during transit.'
  },
  {
    id: 'gal-4',
    category: 'community',
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    title: 'Grassroots Community Meeting',
    description: 'Discussing local drainage issues and installing primary bio-toilets for healthy living.'
  },
  {
    id: 'gal-5',
    category: 'events',
    src: 'https://images.unsplash.com/photo-1469571486040-0b6b1143a533?auto=format&fit=crop&q=80&w=800',
    title: 'Annual Social Impact Summit',
    description: 'Honoring key CSR sponsors, local authorities, and grassroots community organizers.'
  },
  {
    id: 'gal-6',
    category: 'food',
    src: '/notice_banner_en_final.jpg',
    title: 'Ekbelar Aahar Abhiyan (English Flyer)',
    description: 'The official campaign flyer in English details showing standard compliance, government registration details, and direct support opportunities.'
  },
  {
    id: 'gal-7',
    category: 'children',
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    title: 'Primary Education Sanctuary',
    description: 'Classroom sessions focusing on basic spelling, mathematics, and environmental consciousness.'
  },
  {
    id: 'gal-8',
    category: 'volunteer',
    src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
    title: 'Relief Distribution Team',
    description: 'Disaster management cohort delivering dry ration packs during cyclone emergencies.'
  },
  {
    id: 'gal-9',
    category: 'food',
    src: '/notice_banner_bn_rural.jpg',
    title: 'Campaign Announcement (Bangla Version)',
    description: 'Promotional bulletin for our grassroots network announcing local hub kitchen extensions and schedule maps.'
  },
  {
    id: 'gal-10',
    category: 'food',
    src: '/notice_banner_standard.jpg',
    title: 'Ekbelar Aahar Standard Notice',
    description: 'The primary offline banner utilized throughout target sub-kitchens and centers across Sreerampore and Hindmotor.'
  },
  {
    id: 'gal-11',
    category: 'food',
    src: '/anjali.jpg',
    title: 'Lead Chef Anjali Mondal (Ekbelar Aahar)',
    description: 'Anjali Mondal, lead chef under our Ekbelar Aahar Abhiyan, preparing highly nutritious, balanced micro-nutrient heavy meals daily in Hindmotor.'
  },
  {
    id: 'gal-12',
    category: 'food',
    src: '/prabhas.jpg',
    title: 'Health and Nutrition for Dada Prabhas Roy',
    description: 'Dada Prabhas, 74, receiving standard medical supervision and warm daily meals at our Sreerampore distribution center.'
  },
  {
    id: 'gal-13',
    category: 'children',
    src: '/rahul.jpg',
    title: 'Education Integration for Rahul Bauri',
    description: 'Rahul, 9, smiling with his sponsored school-kit, uniform, and books at Hindmotor Primary after transitioning from hard brick-kiln labor.'
  },
  {
    id: 'gal-14',
    category: 'community',
    src: '/sunita.jpg',
    title: 'Micro-Enterprise Setup for Sunita',
    description: 'Sunita Das, 19, riding her custom-engineered hand-cranked tricycle which has enabled her path to economic dignity and independence.'
  }
];

// Governance & Transparency files
export const TRANSPARENCY_REPORTS: ReportItem[] = [
  { id: 'rep-1', title: 'Audit Report FY 2025-26 - S.B. Sen & Co Chartered Accountants', year: '2025-26', type: 'Audit', size: '2.4 MB', date: '30 May 2026' },
  { id: 'rep-2', title: 'Ekbelar Aahar Detailed Meal Sourcing and Logistics Statement', year: '2025', type: 'Financial', size: '1.8 MB', date: '12 January 2026' },
  { id: 'rep-3', title: 'Amra Manush Foundation - Annual Strategic Roadmap & Transparency Report', year: '2026', type: 'Impact', size: '4.1 MB', date: '10 June 2026' },
  { id: 'rep-4', title: 'UDYAM Certificate and Bylaws and Incorporation Manifest', year: '2026', type: 'Governance', size: '1.1 MB', date: '12 June 2026' },
];

export const PARTNERSHIP_OPPORTUNITIES: PartnerOpportunity[] = [
  {
    id: 'csr',
    title: 'Tailored CSR Projects',
    description: 'Align corporate CSR mandates with our fully audited micro-initiatives. We supply complete geo-tagged compliance reports and transparent 80G tax benefit manifests.',
    benefits: ['Bespoke sub-program branding', 'Live progress panels / dashboard access', 'Quarterly carbon & social footprint assessments', 'Direct alignment with UN Sustainable Development Goals (SDGs)'],
    icon: 'Briefcase'
  },
  {
    id: 'employee-volunteer',
    title: 'Corporate Volunteering Retreats',
    description: 'Boost employee empathy and alignment by volunteering in our central kitchens, food camps, or youth mentorship hubs.',
    benefits: ['Facilitated icebreaking and safety protocols', 'Documented high-definition photo/video recap kits', 'Interactive group food-distribution drives', 'Leadership development hours certification'],
    icon: 'GraduationCap'
  },
  {
    id: 'meal-sponsor',
    title: 'Perpetual Meal Sponsorships',
    description: 'Adopt kitchen operations for key corporate landmarks or employee birthdays. Fund meals in high-poverty centers.',
    benefits: ['Real-time photo streams during delivery days', 'Honorable mention on central distribution units', 'Direct physical audit invites for stakeholders', 'Detailed macro-nutrient quality reports'],
    icon: 'Apple'
  },
  {
    id: 'community-dev',
    title: 'Strategic Civic Alliances',
    description: 'Work with us to establish solar-powered community wells or construct high-quality, durable public bio-toilets.',
    benefits: ['Joint municipal project approvals', 'Permanent brand plaque placement', 'Sustainable 10-year asset care covenants', 'Transparent third-party engineering audits'],
    icon: 'Milestone'
  }
];

export const FOUNDATION_MEMBERS: TeamMember[] = [
  {
    id: 'member-sanjit',
    name: 'Sanjit Hazra',
    post: 'Board of President (BOP)',
    roleDescription: 'Chairs governance convocations, sanctions high-level policy frameworks, and guarantees statutory fiduciary compliance.',
    avatarInitials: 'SH',
    badge: 'Governing Body',
    email: 'hazrasanjit170@gmail.com'
  },
  {
    id: 'member-sreejit',
    name: 'Sreejit Dasgupta',
    post: 'General Secretary (GS)',
    roleDescription: 'Coordinates overall administrative flow, public secretariats, and handles official correspondences and governance audits.',
    avatarInitials: 'SD',
    badge: 'Governing Body',
    email: 'sreejit9804@gmail.com'
  },
  {
    id: 'member-bijay',
    name: 'Bijay Das',
    post: 'Financial Officer (FO)',
    roleDescription: 'Enforces double-signature expenditure approvals, manages bank relationships, and oversees official accounting balance sheets.',
    avatarInitials: 'BD',
    badge: 'Governing Body',
    email: 'bijay89891@gmail.com'
  },
  {
    id: 'member-shibraj',
    name: 'Shibraj Das',
    post: 'Assistant FO',
    roleDescription: 'Supports financial ledger entries, monitors field cash flows, and coordinates voucher verification mechanisms.',
    avatarInitials: 'SD',
    badge: 'Governing Body'
  },
  {
    id: 'member-abhay',
    name: 'Abhay Mahato',
    post: 'Executive Director (ED)',
    roleDescription: 'Directs on-ground execution of the Ekbelar Aahar Abhiyan campaign, sub-kitchen schedules, and vendor relations.',
    avatarInitials: 'AM',
    badge: 'Executive Team',
    email: 'abhaymahato2006@gmail.com'
  },
  {
    id: 'member-nitish',
    name: 'Nitish Shaw',
    post: 'Co ED',
    roleDescription: 'Assists with structural field planning, transport safety operations, and community kitchen hygiene metrics.',
    avatarInitials: 'NS',
    badge: 'Executive Team',
    email: 'shawnitish01122005@gmail.com'
  },
  {
    id: 'member-indrajit',
    name: 'Indrajit Pal',
    post: 'Programme Manager (PM)',
    roleDescription: 'Supervises active campaign layouts, designs volunteer shifts, and coordinates nutritional target metrics.',
    avatarInitials: 'IP',
    badge: 'Executive Team',
    email: 'iindrajitpal07@gmail.com'
  },
  {
    id: 'member-debjit',
    name: 'Debjit Raha',
    post: 'Co PM',
    roleDescription: 'Supports program execution, oversees daily food distribution logistics, and manages data logs.',
    avatarInitials: 'DR',
    badge: 'Executive Team',
    email: 'debojit.raha.2706@gmail.com'
  },
  {
    id: 'member-pr-manojit',
    name: 'Manojit Chakraborty',
    post: 'PR Team',
    roleDescription: 'Engages with community allies, handles media reports, and shares transparent audits with corporate sponsors.',
    avatarInitials: 'MC',
    badge: 'PR Team',
    email: 'chakrabortymanojit516@gmail.com'
  },
  {
    id: 'member-pr-shibam',
    name: 'Shibam Das',
    post: 'PR Team',
    roleDescription: 'Coordinates online transparent communications, campaign announcements, and donor outreach circles.',
    avatarInitials: 'SD',
    badge: 'PR Team',
    email: 'dshibam376@gmail.com'
  },
  {
    id: 'member-pr-paras',
    name: 'Paras Dey Sarkar',
    post: 'PR Team',
    roleDescription: 'Facilitates community trust building, manages digital notice boards, and records beneficiary success archives.',
    avatarInitials: 'PS',
    badge: 'PR Team',
    email: 'parasdeysarkar63@gmail.com'
  },
  {
    id: 'member-pr-subha',
    name: 'Subha Das',
    post: 'PR Team',
    roleDescription: 'Supports local civic engagement, arranges donation receipt deliveries, and handles public queries.',
    avatarInitials: 'SD',
    badge: 'PR Team',
    email: 'subhadas0412@gmail.com'
  },
  {
    id: 'member-pr-soham',
    name: 'Soham Ghosh',
    post: 'PR Team',
    roleDescription: 'Directs digital visibility projects, manages official photography compliance, and drafts monthly reports.',
    avatarInitials: 'SG',
    badge: 'PR Team',
    email: 'ghoshsoham181@gmail.com'
  },
  {
    id: 'member-pr-sirshendu',
    name: 'Sirshendu Roy',
    post: 'PR Team',
    roleDescription: 'Supports external networking projects, coordinates corporate partner orientations, and delivers newsletters.',
    avatarInitials: 'SR',
    badge: 'PR Team',
    email: 'rickshirsendu@gmail.com'
  },
  {
    id: 'member-fw-samu',
    name: 'Samu Das',
    post: 'FW Team',
    roleDescription: 'Drives physical meal delivery logistics, coordinates active distribution camps, and inspects quality controls.',
    avatarInitials: 'SD',
    badge: 'FW Team',
    email: 'Dsamu2905@gmail.com'
  },
  {
    id: 'member-fw-soumodeep',
    name: 'Soumodeep Biswas',
    post: 'FW Team',
    roleDescription: 'Handles direct field communication, guides local youth volunteers, and organizes sub-kitchen cleanliness drives.',
    avatarInitials: 'SB',
    badge: 'FW Team',
    email: 'biswassoumyadeep08@gmail.com'
  },
  {
    id: 'member-fw-deb',
    name: 'Deb Das',
    post: 'FW Team',
    roleDescription: 'Manages physical safety at transit distribution nodes and conducts inventory reviews for grains and groceries.',
    avatarInitials: 'DD',
    badge: 'FW Team'
  },
  {
    id: 'member-fw-suvonkar',
    name: 'Suvonkar Goswami',
    post: 'FW Team',
    roleDescription: 'Facilitates door-to-door distribution logistics for isolated vulnerable elderly groups.',
    avatarInitials: 'SG',
    badge: 'FW Team',
    email: 'suvankargoswami82@gmail.com'
  },
  {
    id: 'member-fw-sadhitra',
    name: 'Sadhitra Bhattacharya',
    post: 'FW Team',
    roleDescription: 'Formulates micro-route maps for thermal transit vehicle paths to deliver hot food under one hour.',
    avatarInitials: 'SB',
    badge: 'FW Team',
    email: 'sadhitrabhattacharya57@gmail.com'
  },
  {
    id: 'member-fw-subhodeep',
    name: 'Subhodeep Mitra',
    post: 'FW Team',
    roleDescription: 'Conducts daily kitchen thermal checks and verifies sub-kitchen dual-signature inventory spreadsheets.',
    avatarInitials: 'SM',
    badge: 'FW Team',
    email: 'svdpmtr@gmail.com'
  }
];

