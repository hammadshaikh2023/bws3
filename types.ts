import { ReactNode } from 'react';

export interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  type?: 'website' | 'article' | 'service';
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  process: { step: number; title: string; desc: string }[];
  techStack: string[];
  benefits: string[];
  meta: MetaTags;
  faq?: FAQItem[];
  relatedServices?: string[]; // IDs or Slugs
  stats?: { label: string; value: string }[];
}

export interface IndustryData {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  color: string;
  stats: { label: string; value: string }[];
  challenges: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  meta: MetaTags;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  title: string;
  category: string;
  image: string;
  stats: { label: string; value: string }[];
  summary: string;
  meta: MetaTags;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

export interface NavLink {
  label: string;
  path: string;
  subLinks?: { label: string; path: string }[];
}