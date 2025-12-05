import React from "react";

interface FeatureItemProps {
  title: string;
  content: React.ReactNode; // Accept JSX for the complex stats
}

export default function FeatureItem({ title, content }: FeatureItemProps) {
  return (
    // Responsive grid: 1 column on mobile, 2 columns on desktop
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center py-8">
      {/* Left Side: Title */}
      <div>
        <h3
          className="font-semibold text-[24px] leading-8 
                       md:font-bold md:text-[32px] md:leading-[38px] text-[#1A1A1A]"
        >
          {title}
        </h3>
      </div>

      {/* Right Side: Content */}
      <div className="md:text-left">
        {" "}
        {/* Aligns content */}
        {content}
      </div>
    </div>
  );
}
