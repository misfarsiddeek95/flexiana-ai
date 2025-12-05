"use client";

import React, { useMemo } from "react";
import {
  roadmapData,
  RoadmapStep,
  PANEL_SCROLL_PAST_HEIGHT,
} from "@/constant/roadmap-data";
// import MobileStepCard from "./MobileStepCard"; // <-- No longer needed
import RoadmapPanel from "./RoadmapPanel";
import GradientText from "./ui/GradientText";
import TextType from "./ui/TextType";

// --- MAIN COMPONENT ---
export default function RoadmapSection() {
  // Get the count of "real" panels (non-empty)
  const realPanelCount = useMemo(
    () => roadmapData.filter((p) => p.number || p.title).length,
    []
  ); // This will be 5

  // (Count of REAL panels * scroll height) + (100vh buffer to scroll the stack away)
  const wrapperHeight = `calc((${realPanelCount} * ${PANEL_SCROLL_PAST_HEIGHT}) + 100vh)`;
  // This calculates: (5 * 60vh) + 100vh = 300vh + 100vh = 400vh

  return (
    <section className="bg-[linear-gradient(135deg,#fff7ed_0%,#faf5ff_50%,#f0f9ff_100%)] py-16 md:py-24 px-4 sm:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <GradientText
            colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
            animationSpeed={5}
            showBorder={false}
          >
            <h2 className="font-bold text-5xl leading-tight mb-4">
              From Idea to Ownership
            </h2>
          </GradientText>
          <TextType
            text={[
              "Our 5-step process, built for clarity and impact.",
              "Our 5-step process, built for clarity and impact.",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="⬜"
            className="font-semibold text-2xl text-gray-500 max-w-2xl"
          />
        </div>

        {/* --- UPDATED LAYOUT ---
          This is now a single-column layout for all screen sizes.
          The max-w-3xl centers it nicely on desktop.
        */}
        <div className="mx-auto">
          {/* --- STICKY VIEW (FOR ALL SCREENS) --- */}
          <div
            className="relative"
            style={{ height: wrapperHeight }} // <-- Uses the correct, fixed height
          >
            {/* We map *all* 6 items. The RoadmapPanel component */}
            {/* will now correctly handle the 6th empty item. */}
            {roadmapData.map((panel: RoadmapStep, index: number) => (
              <RoadmapPanel
                key={panel.number || `panel-${index}`}
                panel={panel}
                index={index}
                isLast={index === roadmapData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
