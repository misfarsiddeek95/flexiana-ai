"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CaseStudyCard from "./ui/CaseStudyCard";
import { CaseStudy } from "@/types/caseStudy";

interface DesktopCarouselProps {
  caseStudies: CaseStudy[];
}

export default function DesktopCarousel({ caseStudies }: DesktopCarouselProps) {
  // Map case studies to the format expected by CaseStudyCard if needed
  // But CaseStudyCard likely expects specific props.
  // Let's check CaseStudyCard props usage in the original file.
  // Original usage:
  // title={study.title}
  // videoUrl={study.videoSrc} (mapped from heroVideo)
  // href={study.href} (mapped from slug)
  // carouselData={study.carouselData}

  const items = caseStudies.map((cs) => ({
    title: cs.title,
    imgSrc: cs.heroImage,
    videoSrc: cs.heroVideo,
    href: `/case-studies/${cs.slug}`,
    carouselData: cs.carouselData,
  }));

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll to horizontal movement
  // We want to move from 0% to -(total width - viewport width)
  // With 40% width cards + gap, we need to calculate roughly how far to scroll
  // A safe bet for "end to end" is usually around -((N-1) * cardWidth)% or similar
  // Let's try -45% for now and adjust if needed based on item count
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  return (
    // This entire component is hidden on mobile
    <div className="hidden md:block relative">
      {/* Scroll Track - Height determines scroll duration */}
      <section ref={targetRef} className="relative h-[250vh]">
        {/* Sticky Container */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Horizontal Moving Track */}
          <motion.div style={{ x }} className="flex gap-8">
            <div className="w-12 shrink-0" />
            {items.map((study, index) => (
              // Each slide
              <div className="relative h-[80vh] w-[40vw] shrink-0" key={index}>
                <div className="h-full w-full transition-transform duration-500">
                  <CaseStudyCard
                    title={study.title}
                    videoUrl={study.videoSrc}
                    imgSrc={study.imgSrc}
                    href={study.href}
                    carouselData={study.carouselData}
                  />
                </div>
              </div>
            ))}
            <div className="w-12 shrink-0" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
