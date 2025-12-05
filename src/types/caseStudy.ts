/**
 * Case Study Data Models
 * TypeScript interfaces for case study detail page components
 */

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  year: string;
  duration: string;
  heroImage?: string | null;
  heroVideo?: string | null;
  heroImageAlt?: string | null;
  tags: string[];

  // Overview
  overview: string;

  // Challenge
  challenge: {
    description: string;
    points: string[];
  };

  // Solution
  solution: {
    description: string;
    approach: SolutionApproach[];
  };

  // Tech Stack
  techStack: {
    categories: TechCategory[];
  };

  // Results
  results: {
    description: string;
    metrics: Metric[];
    outcomes: string[];
  };

  // SEO
  metaDescription?: string;
  metaKeywords?: string[];

  // Carousel Data (New)
  carouselData?: CarouselData;
}

export interface CarouselData {
  title: string;
  points: string[];
}

export interface SolutionApproach {
  title: string;
  description: string;
  details?: string[];
}

export interface TechCategory {
  name: string;
  technologies: string[];
}

export interface Metric {
  value: string;
  label: string;
  icon?: string;
}

export interface RelatedCaseStudy {
  id: string;
  slug: string;
  title: string;
  imageUrl?: string | null;
  tags: string[];
}
