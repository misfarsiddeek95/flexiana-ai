import React from "react";

interface StepItemProps {
  number: string;
  title: string;
  description: string;
  quote: string;
}

export default function StepItem({
  number,
  title,
  description,
  quote,
}: StepItemProps) {
  return (
    // Main container with hover effect and responsive padding
    // 'relative' is needed for the mobile gradient border
    <div className="group transition-colors duration-200 hover:bg-[#F5F5F7] relative pt-8 pb-8 md:py-8 md:px-1 rounded-lg">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 items-start">
        {/* Left Part (Number, Title, Description) */}
        <div className="md:col-span-2 flex flex-col space-y-3">
          {/* Number and Title */}
          <div className="items-baseline">
            <h3 className="font-bold text-[32px] leading-[38px] text-[#1A1A1A]">
              {number}
            </h3>
            {/* Updated Title Styles */}
            <h3 className="font-bold text-[32px] leading-[38px] text-[#1A1A1A]">
              {title}
            </h3>
          </div>

          {/* Description */}
          {/* Updated Paragraph Styles */}
          <p className="font-normal text-lg leading-6 text-[#1A1A1A] my-2">
            {description}
          </p>
        </div>

        {/* Right Part (Quote) */}
        <div className="md:col-span-1 md:pt-2">
          {/* Updated Quote Styles */}
          <p className="font-semibold text-[21px] leading-7 text-[#1A1A1A] md:text-right">
            &quot;{quote}&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
