import React from "react";
import BlogBanner from "@/components/blog/BlogBanner";
import BlogSection from "@/components/blog/BlogSection";
import CTASection from "@/components/CTASection";

// Revalidate every 60 seconds
export const revalidate = 60;

const page = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <BlogBanner />
      <BlogSection />
      {/* <CTASection imgSrc="" /> */}
    </div>
  );
};

export default page;
