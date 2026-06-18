export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  suffix: string;
  description: string;
  icon: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  name: string;
  age: number;
  location: string;
  challenge: string;
  intervention: string;
  outcome: string;
  image: string;
  metrics: string[];
}

export interface StrategicPillar {
  id: string;
  title: string;
  icon: string;
  objectives: string[];
  impactGoals: string[];
  beneficiaryFocus: string;
  tag: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  category: string;
  challenge: string;
  intervention: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  image: string;
  quote: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  category: 'food' | 'children' | 'volunteer' | 'community' | 'events';
  title: string;
  description: string;
}

export interface ReportItem {
  id: string;
  title: string;
  year: string;
  type: 'Financial' | 'Impact' | 'Audit' | 'Governance';
  size: string;
  date: string;
}

export interface PartnerOpportunity {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  post: string;
  roleDescription: string;
  avatarInitials: string;
  badge?: string;
  email?: string;
  linkedIn?: string;
}

