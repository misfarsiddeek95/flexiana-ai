import React, { memo } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { CarouselData } from "@/types/caseStudy";

interface CaseStudyCardProps {
  title: string;
  videoUrl?: string | null;
  imgSrc?: string | null;
  href: string;
  carouselData?: CarouselData;
}

const CaseStudyCard = memo(function CaseStudyCard({
  title,
  videoUrl,
  imgSrc,
  href,
  carouselData,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className="relative w-full h-full shrink-0 block group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1"
      style={{
        isolation: "isolate",
        transform: "translate3d(0,0,0)", // Force hardware acceleration
        backfaceVisibility: "hidden", // Fix webkit rendering bug
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Card styling - Flex col for both mobile and desktop now */}
      <div
        className="relative flex flex-col w-full h-full md:p-0"
      >
        {/* Video/Image container */}
        <div
          className="relative w-full aspect-video overflow-hidden bg-gray-100 rounded-t-2xl"
          style={{ isolation: "isolate" }}
        >
          {videoUrl ? (
            <iframe
              src={`${videoUrl}?autoplay=1&loop=1&muted=1&background=1&autopause=0&quality=720p`}
              className="absolute -top-[1px] -left-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover"
              style={{
                border: "none",
                display: "block",
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Media
            </div>
          )}
        </div>

        {/* Content Container - Below video on desktop too */}
        <div className="relative flex-1 p-4 pb-6 flex flex-col justify-start bg-white grow overflow-hidden">
          {/* Title */}
          <h3 className="text-gray-900 text-lg md:text-xl xl:text-[28px] font-bold leading-tight mb-2 md:mb-3 xl:mb-4 line-clamp-2 min-h-15 transition-transform duration-300 md:group-hover:translate-x-2">
            {carouselData?.title || title}
          </h3>

          {/* Points */}
          <div className="overflow-hidden">
            <ul className="space-y-1 md:space-y-1.5 xl:space-y-2">
              {carouselData?.points.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 transition-transform duration-300 md:group-hover:translate-x-2"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-[#51C4F6]/10 flex items-center justify-center mt-0.5 backdrop-blur-sm">
                    <Check className="w-3.5 h-3.5 text-[#0091EA] stroke-3" />
                  </div>
                  <span className="text-sm md:text-base xl:text-lg text-gray-700 font-medium leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Border Overlay - Ensures clean edges over video */}
      <div className="absolute inset-0 rounded-2xl border border-gray-200 pointer-events-none z-50" />
    </Link>
  );
});

export default CaseStudyCard;
