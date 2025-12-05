"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CaseStudyCard from "./ui/CaseStudyCard";
import { CaseStudy } from "@/types/caseStudy";

interface MobileCarouselProps {
  caseStudies: CaseStudy[];
}

export default function MobileCarousel({ caseStudies }: MobileCarouselProps) {
  // Map case studies to the format expected by CaseStudyCard
  const items = caseStudies.map((cs) => ({
    title: cs.title,
    imgSrc: cs.heroImage,
    videoUrl: cs.heroVideo,
    href: `/case-studies/${cs.slug}`,
    carouselData: cs.carouselData,
  }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    // This entire component is hidden on desktop
    <div className="md:hidden">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((study, index) => (
            // Each slide
            <div className="grow-0 shrink-0 w-full min-w-0" key={index}>
              <div className="p-4">
                <div className="w-full">
                  <CaseStudyCard
                    title={study.title}
                    videoUrl={study.videoUrl}
                    imgSrc={study.imgSrc}
                    href={study.href}
                    carouselData={study.carouselData}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Dots */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`
              transition-all duration-300 rounded-full
              h-3 
              ${index === selectedIndex
                ? "w-10 bg-linear-to-r from-[#42A5F5] to-[#7E57C2]"
                : "w-3 bg-gray-300"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
