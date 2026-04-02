import { LucideIcon } from 'lucide-react';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CaseStudy {
  id: number;
  title: string;
  category: string;
  image: string;
  link?: string;
  description?: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
}