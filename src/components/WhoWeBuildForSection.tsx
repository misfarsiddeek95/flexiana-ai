"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
// 1. Import 'next/dynamic' for lazy-loading the code
import dynamic from "next/dynamic";
// 2. Import 'useInView' to detect when the component is on-screen
import { useInView } from "react-intersection-observer";

import TagButton from "./ui/TagButton";
import WhoWeBuildForCard from "./ui/WhoWeBuildForCard";
import GradientText from "./ui/GradientText";
// 3. Dynamically import Spline
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false, // Spline needs the 'window' object, so disable SSR
});

// Card data
const cardData = [
  {
    title: "Health-Tech",
    description:
      "We help hospitals and clinics understand patient needs and make workflows easier and safer.",
  },
  {
    title: "FinTech / Banking / Insurance",
    description:
      "We help teams spot fraud, assess risks, and get useful customer insights without extra hassle.",
  },
  {
    title: "E-commerce & Retail",
    description:
      "We make recommendations and pricing smarter so customers are happier and businesses sell more.",
  },
  {
    title: "Manufacturing / Industry 4.0",
    description:
      "We help factories use machines better, find small problems quickly, and keep things running smoothly.",
  },
  {
    title: "Marketing Teams",
    description:
      "We help marketers test ideas, discover what messages work, know who to target, and track performance so campaigns keep getting better.",
  },
  {
    title: "Enterprise / SaaS",
    description:
      "We help IT teams track productivity, support new employees, and make work simpler for everyone.",
  },
];

// Helper arrays
const leftCards = cardData.filter((_, i) => i % 2 === 0);
const rightCards = cardData.filter((_, i) => i % 2 !== 0);
const allCards = [
  leftCards[0], // Health-tech
  rightCards[0], // Financial
  leftCards[1], // E-Commerce
  rightCards[1], // Manufacturers
  leftCards[2], // Marketing
  rightCards[2], // Enterprises
];

import { useSplineCache } from "@/hooks/useSplineCache";

export default function WhoWeBuildForSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredCardRef = useRef<string | null>(null);

  // 4. Set up the 'useInView' hook
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true, // Key: Loads once, never unmounts
    threshold: 0.1, // Trigger when 10% is visible
  });

  useEffect(() => {
    hoveredCardRef.current = hoveredCard;
  }, [hoveredCard]);

  const [isMobile, setIsMobile] = useState(true);
  const { sceneUrl } = useSplineCache(
    "https://prod.spline.design/lPFhmjX09AKt3iES/scene.splinecode"
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    let foundCard: string | null = null;

    for (const [index, ref] of cardRefs.current.entries()) {
      if (!ref) continue;

      const rect = ref.getBoundingClientRect();
      const card = allCards[index];

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        foundCard = card.title;
        break;
      }
    }

    if (foundCard !== hoveredCardRef.current) {
      setHoveredCard(foundCard);
    }
  };

  return (
    // 5. Attach the 'sectionRef' here
    <section ref={sectionRef} className="relative bg-[#F5F5F7] overflow-hidden">
      {/* Spline canvas (Event layer) */}
      <div
        className="absolute hidden md:block inset-0 z-10 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* 6. Only render Spline IF 'inView' is true AND not mobile AND we have a URL */}
        <div className="relative w-full h-full overflow-hidden">
          {inView && !isMobile && sceneUrl && (
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  Loading Robot...
                </div>
              }
            >
              <Spline
                // 💡 THE FIX: Force wide canvas (1600px) to ensure hands are rendered (FOV).
                // Then scale down responsively to fit the viewport.
                // incase if needed add 0.10 to scale.
                className="w-full h-full min-w-[1600px] absolute left-1/2 -translate-x-1/2 origin-bottom md:scale-[0.45] lg:scale-[0.55] xl:scale-[0.65] 2xl:scale-[0.75]"
                scene={sceneUrl}
              />
            </Suspense>
          )}
          {/* CSS cover hack: Pseudo-element to hide watermark in bottom-right */}
          <style jsx>{`
            .relative::after {
              content: "";
              position: absolute;
              bottom: 0;
              right: 0;
              width: 25%; /* Adjust based on logo size; test and increase if needed */
              height: 60px; /* Adjust based on logo size */
              background-color: #f5f5f7; /* Matches your section background */
              z-index: 20; /* Ensure it's above the Spline content */
            }
          `}</style>
        </div>
      </div>

      {/* Content layer (z-30 per your fix) */}
      <div className="relative z-30 container mx-auto max-w-7xl py-16 md:py-24 px-4 sm:P-8 pointer-events-none">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <TagButton text="Who we build for?" className="mb-8" />
          <GradientText
            colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
            animationSpeed={5}
            showBorder={false}
          >
            <h2 className="font-semibold text-center text-[24px] leading-8 md:font-bold md:text-[38px] md:leading-[46px] mb-8">
              Every industry has its own challenges and stories waiting to be
              transformed by AI.
            </h2>
          </GradientText>
          <p className="font-semibold text-[20px] md:text-[22px] leading-7">
            You might be:
          </p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-y-12 md:gap-x-8 lg:gap-x-12 place-items-center md:place-items-start">
          {/* === Column 1: Left Cards === */}
          <div className="w-full flex flex-col gap-y-6 md:gap-y-12">
            {leftCards.map((card) => (
              <WhoWeBuildForCard
                key={card.title}
                title={card.title}
                description={card.description}
                isHovered={hoveredCard === card.title}
                ref={(el) => {
                  cardRefs.current[
                    allCards.findIndex((c) => c.title === card.title)
                  ] = el;
                }}
              />
            ))}
          </div>

          {/* === Column 2: Empty Spacer === */}
          <div className="hidden md:block w-full min-h-[700px]"></div>

          {/* === Column 3: Right Cards === */}
          <div className="w-full flex flex-col gap-y-6 md:gap-y-12">
            {rightCards.map((card) => (
              <WhoWeBuildForCard
                key={card.title}
                title={card.title}
                description={card.description}
                isHovered={hoveredCard === card.title}
                ref={(el) => {
                  cardRefs.current[
                    allCards.findIndex((c) => c.title === card.title)
                  ] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
