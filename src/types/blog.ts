/**
 * Blog Post Data Models
 * TypeScript interfaces for blog detail page components
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  authorImage?: string;
  publishDate: string; // ISO 8601 format
  readTime: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  tags: string[];
  content: string; // HTML string from rich text editor
  metaDescription?: string;
  metaKeywords?: string[];
  showInHome?: boolean;
}

export interface BlogMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogUrl: string;
  publishedTime: string;
  author: string;
}

export interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  author: string;
  readTime: string | null;
  imageUrl?: string | null;
  tags: string[];
}
