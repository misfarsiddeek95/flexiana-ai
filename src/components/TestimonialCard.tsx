import React from "react";
import Image from "next/image";
import SpotlightCard from "./ui/SpotlightCard";

interface TestimonialCardProps {
  company: string;
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
}

export default function TestimonialCard({
  company,
  quote,
  name,
  title,
  avatarSrc,
}: TestimonialCardProps) {
  return (
    <SpotlightCard
      className="
        custom-spotlight-card h-full
        rounded-3xl
        p-10 md:p-12 
      "
      spotlightColor="rgba(255, 138, 61, 0.22)"
    >
      {/* Make whole content a vertical layout */}
      <div className="flex flex-col h-full justify-between">
        {/* --- Top Section --- */}
        <div>
          {/* Company Name */}
          <h3 className="font-semibold text-[26px] md:text-[38px] leading-tight text-[#1A1A1A]">
            {company}
          </h3>

          {/* Quote Mark */}
          <span
            className="
            pointer-events-none select-none 
            absolute right-8 top-8 md:right-10 md:top-12
            text-[48px] md:text-[64px] text-[#1A1A1A]/70
          "
          >
            ”
          </span>

          {/* Body Text */}
          <p
            className="
            mt-6 
            text-[17px] md:text-[20px] 
            leading-[1.65] max-w-[55ch]
            text-[#3A3A3A]
          "
          >
            {quote}
          </p>
        </div>

        {/* --- Footer (Pinned to Bottom) --- */}
        <div
          className="
          mt-12 md:mt-16 
          flex items-center justify-between
        "
        >
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div
              className="
              w-14 h-14 md:w-16 md:h-16
              rounded-full overflow-hidden 
              bg-[#E3E3E3]
              flex items-center justify-center
            "
            >
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={name}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-[#6A6A6A]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.94 17.94 0 0 1 12 21.75c-2.676 0-5.216-.584-7.5-1.632Z"
                  />
                </svg>
              )}
            </div>

            <p className="font-semibold text-[20px] md:text-[21px] text-[#1A1A1A]">
              {name}
            </p>
          </div>

          {/* Title */}
          <p className="font-semibold text-[16px] md:text-[18px] text-[#5A5A5A]">
            {title}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}
