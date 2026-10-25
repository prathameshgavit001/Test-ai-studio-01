export type PageId = 'home' | 'profile' | 'gallery' | 'pricing' | 'contact';

export type BillingCycle = 'monthly' | 'annual';

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlighted?: boolean;
  features: string[];
  deliverables: string;
  turnaround: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'architecture' | 'brand' | 'digital' | 'editorial';
  categoryLabel: string;
  year: string;
  client: string;
  summary: string;
  description: string;
  aspectRatio: string;
  primaryColor: string;
  secondaryColor: string;
  accentPattern: 'grid' | 'waves' | 'isometric' | 'circles' | 'minimal-arch';
  tags: string[];
}

export interface ContactFormData {
  fullName: string;
  email: string;
  projectCategory: string;
  budgetRange: string;
  message: string;
}

export interface ContactFormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

export interface EstimatorOptions {
  tierBase: number;
  includeDesignSystem: boolean;
  include3DRendering: boolean;
  includeRapidPrototyping: boolean;
  turnaroundRush: boolean;
}
