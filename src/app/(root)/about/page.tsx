import React from "react";
import AboutBanner from "@/components/about/AboutBanner";
import HistorySection from "@/components/about/HistorySection";
import MeetFounder from "@/components/about/MeetFounder";
import OurStory from "@/components/about/OurStory";
import CTASection from "@/components/CTASection";

const About = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <AboutBanner />
      <OurStory />
      <HistorySection />
      <MeetFounder />
      {/* <CTASection imgSrc="" /> */}
    </div>
  );
};

export default About;
