import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";
import LogoCarouselSection from "@/components/case-studies/LogoCarouselSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import React from "react";

// Revalidate every 60 seconds
export const revalidate = 60;

const page = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <LogoCarouselSection />
      <CaseStudiesGrid />
      {/* <TestimonialsSection /> */}
      {/* <CTASection imgSrc="" /> */}
    </div>
  );
};

export default page;
