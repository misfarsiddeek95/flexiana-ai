import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CaseStudyHero from "@/components/case-studies/CaseStudyHero";
import CaseStudyOverview from "@/components/case-studies/CaseStudyOverview";
import CaseStudyVideo from "@/components/case-studies/CaseStudyVideo";
import CaseStudyChallenge from "@/components/case-studies/CaseStudyChallenge";
import CaseStudySolution from "@/components/case-studies/CaseStudySolution";
import CaseStudyTechStack from "@/components/case-studies/CaseStudyTechStack";
import CaseStudyResults from "@/components/case-studies/CaseStudyResults";
import RelatedCaseStudies from "@/components/case-studies/RelatedCaseStudies";
import CTASection from "@/components/CTASection";
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getCaseStudies,
} from "@/app/actions/case-study";

interface CaseStudyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all case studies at build time
export async function generateStaticParams() {
  // Fetch all case studies for static generation (using a large limit)
  const { caseStudies } = await getCaseStudies(1, 1000);
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flexiana.com";
  const canonicalUrl = `${siteUrl}/case-studies/${slug}`;

  return {
    title: `${caseStudy.title} - ${caseStudy.subtitle} | Flexiana AI Case Studies`,
    description: caseStudy.metaDescription || caseStudy.overview,
    keywords: caseStudy.metaKeywords?.join(", "),
    openGraph: {
      title: `${caseStudy.title} - ${caseStudy.subtitle}`,
      description: caseStudy.metaDescription || caseStudy.overview,
      url: canonicalUrl,
      siteName: "Flexiana AI",
      ...(caseStudy.heroImage && {
        images: [
          {
            url: caseStudy.heroImage,
            width: 1200,
            height: 630,
            alt: caseStudy.heroImageAlt || caseStudy.title,
          },
        ],
      }),
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} - ${caseStudy.subtitle}`,
      description: caseStudy.metaDescription || caseStudy.overview,
      ...(caseStudy.heroImage && { images: [caseStudy.heroImage] }),
      creator: "@flexiana",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = await getRelatedCaseStudies(slug, 3);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseStudy.title} - ${caseStudy.subtitle}`,
    image: caseStudy.heroImage,
    author: {
      "@type": "Organization",
      name: "Flexiana AI",
    },
    publisher: {
      "@type": "Organization",
      name: "Flexiana AI",
      logo: {
        "@type": "ImageObject",
        url: "https://flexiana.com/logo.svg",
      },
    },
    description: caseStudy.metaDescription || caseStudy.overview,
    keywords: caseStudy.tags.join(", "),
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <CaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        client={caseStudy.client}
        industry={caseStudy.industry}
        year={caseStudy.year}
        duration={caseStudy.duration}
        heroImage={caseStudy.heroImage}
        heroImageAlt={caseStudy.heroImageAlt}
        tags={caseStudy.tags}
      />

      {/* Overview Section */}
      <CaseStudyOverview overview={caseStudy.overview} />

      {/* Video Section */}
      {caseStudy.heroVideo && <CaseStudyVideo videoUrl={caseStudy.heroVideo} />}

      {/* Challenge Section */}
      <CaseStudyChallenge challenge={caseStudy.challenge} />

      {/* Solution Section */}
      <CaseStudySolution solution={caseStudy.solution} />

      {/* Tech Stack Section */}
      <CaseStudyTechStack techStack={caseStudy.techStack} />

      {/* Results Section */}
      <CaseStudyResults results={caseStudy.results} />

      {/* Related Case Studies */}
      <RelatedCaseStudies caseStudies={relatedCaseStudies} />

      {/* CTA Section */}
      {/* <CTASection imgSrc="" /> */}
    </div>
  );
}
