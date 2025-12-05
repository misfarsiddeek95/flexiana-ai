import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetailBanner from "@/components/blog/BlogDetailBanner";
import BlogMetadata from "@/components/blog/BlogMetadata";
import BlogTags from "@/components/blog/BlogTags";
import BlogContent from "@/components/blog/BlogContent";
import RelatedArticles from "@/components/blog/RelatedArticles";
import CTASection from "@/components/CTASection";
import {
  getBlogBySlug,
  getRelatedArticles,
  getBlogs,
} from "@/app/actions/blog";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flexiana.com";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: `${post.title} | Flexiana AI Blog`,
    description: post.metaDescription || post.subtitle || post.title,
    keywords: post.metaKeywords?.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.subtitle || post.title,
      url: canonicalUrl,
      siteName: "Flexiana AI",
      ...(post.imageUrl && {
        images: [
          {
            url: post.imageUrl,
            width: 1200,
            height: 630,
            alt: post.imageAlt || post.title,
          },
        ],
      }),
      locale: "en_US",
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription || post.subtitle || post.title,
      ...(post.imageUrl && { images: [post.imageUrl] }),
      creator: "@flexiana",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  // Fetch all blogs for static generation (using a large limit)
  const { blogs } = await getBlogs(1, 1000);
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  // If post not found, trigger 404
  if (!post) {
    notFound();
  }

  // Get related articles
  const relatedArticles = await getRelatedArticles(slug, 4);

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.imageUrl && { image: post.imageUrl }),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Flexiana AI",
      logo: {
        "@type": "ImageObject",
        url: "https://flexiana.com/logo.svg",
      },
    },
    datePublished: post.publishDate,
    description: post.metaDescription || post.subtitle || post.title,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen relative bg-white">
        {/* Banner Section */}
        <BlogDetailBanner
          title={post.title}
          subtitle={post.subtitle}
          imageUrl={post.imageUrl}
          imageAlt={post.imageAlt}
        />

        {/* Metadata Section */}
        <BlogMetadata
          author={post.author}
          authorImage={post.authorImage}
          publishDate={post.publishDate}
          readTime={post.readTime}
        />

        {/* Tags Section */}
        <BlogTags tags={post.tags} />

        {/* Content Section */}
        <BlogContent content={post.content} />

        {/* Related Articles Section */}
        <RelatedArticles articles={relatedArticles} />

        {/* CTA Section */}
        {/* <CTASection imgSrc="" /> */}
      </div>
    </>
  );
}
