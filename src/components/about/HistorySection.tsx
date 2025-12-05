"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "../ui/GradientText";

const HistorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0); // Kept for desktop animation

  const timelineData = [
    {
      year: "2016",
      description:
        "The main focus on Clojure and Clojure script projects with 10 team members",
    },
    {
      year: "2017",
      description: "20 team members, became the software polyglots",
    },
    {
      year: "2018",
      description: "The company reached profitability",
    },
    {
      year: "2019",
      description: "47 team members, US branch founded",
    },
    {
      year: "2020",
      description: "60+ team members, Service Design extension",
    },
    {
      year: "2022",
      description: "100 team members, Building our own product",
    },
    {
      year: "2023",
      description:
        "Expanding our portfolio by incorporating AI and undertaking additional internal projects.",
    },
    {
      year: "2024",
      description:
        "We focused on improving our internal projects and delivered important AI features, showing our dedication to progress and helping our clients succeed.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop <= windowHeight && sectionTop + sectionHeight >= 0) {
        const scrolled = windowHeight - sectionTop;
        const total = sectionHeight + windowHeight;
        const progress = Math.max(0, Math.min(1, scrolled / total));

        // Active index calculation with better distribution
        // Add more padding at the start to give 2016 more time to be visible
        // Increased from 0.05 to 0.15 for a longer initial delay
        const paddedProgress = Math.max(
          0,
          Math.min(1, (progress - 0.15) / 0.7)
        );
        const exactIndex = paddedProgress * (timelineData.length - 1);
        const clampedIndex = Math.max(
          0,
          Math.min(Math.round(exactIndex), timelineData.length - 1)
        );
        setActiveIndex(clampedIndex);

        // Calculate rotation to position active year at the indicator
        // Years are distributed from -45deg to 225deg (270 degree arc)
        // Indicator is at middle-left, which corresponds to 180 degrees in standard position
        const totalItems = timelineData.length;
        const startAngle = -45;
        const endAngle = 225;
        const angleRange = endAngle - startAngle;

        // The indicator position: right: 120px from a 300px container = 180px from left
        // At 50% height = center vertically
        // This is at 180 degrees (pointing left)
        const targetAngle = 180;

        // Calculate where the current active year is positioned on the arc
        const currentYearAngle =
          startAngle + (angleRange / (totalItems - 1)) * clampedIndex;

        // Rotate to bring the active year to the target position
        const newRotation = targetAngle - currentYearAngle;
        setRotation(newRotation);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [timelineData.length]);

  // Calculate dynamic scroll height based on number of years
  // Each year gets approximately 80vh of scroll space
  const scrollHeight = Math.max(300, timelineData.length * 80);

  return (
    <div
      ref={sectionRef}
      className="bg-white"
      style={{ minHeight: `${scrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* --- DESKTOP VIEW --- */}
          <div className="hidden lg:block">
            {/* Header Row - Aligned with the text column */}
            <div className="flex gap-32 mb-20">
              <div className="shrink-0 w-[300px]" />{" "}
              {/* Spacer matching circle width */}
              <div className="flex-1">
                <GradientText
                  colors={[
                    "#51C4F6",
                    "#4A66CC",
                    "#7A45C5",
                    "#FF8A3D",
                    "#FFC34A",
                  ]}
                  animationSpeed={5}
                  showBorder={false}
                  className="ml-0"
                >
                  <h1 className="text-[48px] font-bold leading-14">
                    Flexiana Throughout
                    <br />
                    the Years
                  </h1>
                </GradientText>
              </div>
            </div>

            {/* Content Row - Circle and Text aligned centrally */}
            <div className="flex items-center gap-32">
              <div
                className="shrink-0 relative overflow-hidden"
                style={{ width: "300px", height: "600px" }}
              >
                {/* Rotating circle (SVG only) */}
                <div
                  className="absolute transition-transform duration-100 ease-linear"
                  style={{
                    transform: `scaleX(-1) rotate(${rotation}deg)`,
                    right: "0",
                    top: "45%",
                    marginTop: "-275px",
                    width: "600px",
                    height: "600px",
                  }}
                >
                  <svg viewBox="0 0 550 550" className="w-full h-full">
                    <defs>
                      <linearGradient
                        id="ringGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#51C4F6", stopOpacity: 1 }}
                        />
                        <stop
                          offset="25%"
                          style={{ stopColor: "#4A66CC", stopOpacity: 1 }}
                        />
                        <stop
                          offset="50%"
                          style={{ stopColor: "#7A45C5", stopOpacity: 1 }}
                        />
                        <stop
                          offset="75%"
                          style={{ stopColor: "#FF8A3D", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#FFC34A", stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="275"
                      cy="275"
                      r="210"
                      fill="none"
                      stroke="url(#ringGradient)"
                      strokeWidth="80"
                    />

                    <circle cx="275" cy="275" r="145" fill="white" />
                  </svg>
                </div>

                {/* Years positioned on the circle arc */}
                <div
                  className="absolute transition-transform duration-100 ease-linear"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    right: "0",
                    top: "45%",
                    marginTop: "-275px",
                    width: "600px",
                    height: "600px",
                  }}
                >
                  {timelineData.map((item, index) => {
                    const totalItems = timelineData.length;
                    const startAngle = -45;
                    const endAngle = 225;
                    const angleRange = endAngle - startAngle;
                    const angle =
                      startAngle + (angleRange / (totalItems - 1)) * index;

                    const radius = 250;
                    const angleRad = (angle * Math.PI) / 180;
                    const x = 50 + (radius / 275) * 50 * Math.cos(angleRad);
                    const y = 50 + (radius / 275) * 50 * Math.sin(angleRad);

                    const isActive = index === activeIndex;

                    return (
                      <div
                        key={index}
                        className={`absolute font-semibold transition-all duration-300 whitespace-nowrap ${
                          isActive ? "text-[#1A1A1A]" : "text-[#9CA3AF] italic"
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: isActive
                            ? `translate(-50%, -50%)`
                            : `translate(-50%, -50%) rotate(${-rotation}deg)`,
                          fontSize: isActive ? "24px" : "20px",
                        }}
                      >
                        {item.year}
                      </div>
                    );
                  })}
                </div>

                {/* Active year indicator */}
                <div
                  className="absolute pointer-events-none flex items-center gap-4"
                  style={{
                    right: "60px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 20,
                  }}
                >
                  {/* Dot with pulse */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-full h-full bg-[#4A9AE8] rounded-full animate-ping opacity-20"></div>
                    <div className="w-4 h-4 rounded-full bg-[#4A9AE8] border-[3px] border-white shadow-md relative z-10"></div>
                  </div>

                  {/* Year Card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: -20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className="bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-6 py-3 rounded-xl"
                    >
                      <span className="text-4xl font-bold bg-linear-to-r from-[#51C4F6] via-[#4A66CC] to-[#7A45C5] bg-clip-text text-transparent">
                        {timelineData[activeIndex].year}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex-1">
                <div className="relative" style={{ height: "450px" }}>
                  {timelineData.map((item, index) => {
                    const isActive = index === activeIndex;
                    const isPast = index < activeIndex;

                    const topPosition = isActive ? 50 : isPast ? 0 : 100;

                    return (
                      <div
                        key={index}
                        className={`absolute transition-all duration-500 ${
                          isActive ? "opacity-100 text-[#1A1A1A]" : "opacity-0"
                        }`}
                        style={{
                          top: `${topPosition}%`,
                          transform: `translateY(-50%) ${
                            !isActive ? "rotate(-8deg)" : "rotate(0deg)"
                          }`,
                          transformOrigin: "left center",
                          width: "85%",
                          maxWidth: "600px",
                        }}
                      >
                        <p
                          className={`${
                            isActive ? "text-4xl" : "text-[24px]"
                          } font-semibold leading-10`}
                        >
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* --- MOBILE VIEW --- */}
          <div className="lg:hidden flex flex-col items-center space-y-10">
            <GradientText
              colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
              animationSpeed={5}
              showBorder={false}
            >
              <h1 className="text-[32px] sm:text-[40px] font-bold leading-10 sm:leading-12 text-center px-4">
                Flexiana Throughout
                <br />
                the Years
              </h1>
            </GradientText>

            {/* --- THIS IS THE MODIFIED SECTION --- */}
            <div className="relative w-full max-w-sm h-[200px]">
              <div className="absolute inset-0">
                <svg viewBox="0 0 360 200" className="w-full h-full">
                  <defs>
                    {/* <linearGradient
                      id="arcGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#6B5FE8", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#4A9AE8", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#6B5FE8", stopOpacity: 1 }}
                      />
                    </linearGradient> */}
                    <linearGradient
                      id="arcGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#51C4F6", stopOpacity: 1 }}
                      />
                      <stop
                        offset="25%"
                        style={{ stopColor: "#4A66CC", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "#7A45C5", stopOpacity: 1 }}
                      />
                      <stop
                        offset="75%"
                        style={{ stopColor: "#FF8A3D", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#FFC34A", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>

                  {/* 1. This path is now flipped to draw at the top (y=0) */}
                  <path
                    d="M 30 0 A 150 150 0 0 0 330 0"
                    fill="none"
                    stroke="url(#arcGradient)"
                    strokeWidth="50"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* 2. This container is moved from 'bottom-0' to 'top-0'
                   and the dot/year are re-ordered.
              */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm px-4 py-2 rounded-lg -rotate-90 origin-center"
                  >
                    <span className="text-2xl font-bold bg-linear-to-r from-[#51C4F6] to-[#7A45C5] bg-clip-text text-transparent">
                      {timelineData[activeIndex].year}
                    </span>
                  </motion.div>
                </AnimatePresence>
                <div className="w-3 h-3 rounded-full bg-[#4A9AE8] border-2 border-white shadow-sm z-10"></div>
              </div>
            </div>
            {/* --- END OF MODIFIED SECTION --- */}

            <div className="px-8 text-center max-w-lg min-h-[120px] flex items-start justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-[20px] sm:text-[24px] font-semibold leading-7 sm:leading-8 text-[#1A1A1A]"
                >
                  {timelineData[activeIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
