import React from "react";
import AnimatedCounter from "./ui/AnimatedCounter";
import TagButton from "./ui/TagButton";
import FeatureItem from "./ui/FeatureItem";
import GradientText from "./ui/GradientText";

// We define the data here to keep the component clean
const featureData = [
  {
    title: "We've built it before.",
    content: (
      // This is the complex JSX for the animated stats
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8 md:items-center">
        {/* Stat 1: 12+ */}
        <div className="flex items-center space-x-2">
          <AnimatedCounter
            targetValue={12}
            suffix="+"
            className="font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-[linear-gradient(100.7deg,#42A5F5_5.16%,#7E57C2_100%)]"
          />
          <span className="font-normal text-lg leading-6 text-[#1A1A1A]">
            years of software
            <br />& AI work
          </span>
        </div>

        {/* Stat 2: $1.2B+ */}
        <div className="flex items-center space-x-2">
          <AnimatedCounter
            targetValue={1.2}
            precision={1}
            prefix="$"
            suffix="B+"
            className="font-bold text-4xl md:text-5xl text-transparent bg-clip-text bg-[linear-gradient(100.7deg,#42A5F5_5.16%,#7E57C2_100%)]"
          />
          <span className="font-normal text-lg leading-6 text-[#1A1A1A]">
            in client value
            <br />
            delivered
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "You own it completely.",
    content: (
      <p
        className="font-normal text-base leading-6 
                    md:font-semibold md:text-[21px] md:leading-7 text-[#1A1A1A]"
      >
        Not just the result, every part of it
      </p>
    ),
  },
  {
    title: "We speak your domain.",
    content: (
      <p
        className="font-normal text-base leading-6 
                    md:font-semibold md:text-[21px] md:leading-7 text-[#1A1A1A]"
      >
        Experts in ML, CV, data systems.
      </p>
    ),
  },
  {
    title: "We don't force you into molds.",
    content: (
      <p
        className="font-normal text-base leading-6 
                    md:font-semibold md:text-[21px] md:leading-7 text-[#1A1A1A]"
      >
        No templates, no lock-ins, no regrets.
      </p>
    ),
  },
  {
    title: "We scale with you.",
    content: (
      <p
        className="font-normal text-base leading-6 
                    md:font-semibold md:text-[21px] md:leading-7 text-[#1A1A1A]"
      >
        We don&apos;t walk away after &quot;go-live.&quot; We empower you to
        grow.
      </p>
    ),
  },
];

// Reusable Gradient Divider
const GradientDivider = () => (
  <div
    className="h-px w-full"
    style={{
      background: "linear-gradient(100.7deg, #42A5F5 5.16%, #7E57C2 100%)",
    }}
  ></div>
);

export default function WhyFlexianaSection() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8 md:mb-12">
          <TagButton text="Why Flexiana AI?" className="mb-8" />

          <GradientText
            colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
            animationSpeed={5}
            showBorder={false}
          >
            <h2 className="font-semibold text-center text-[24px] leading-8 md:font-bold md:text-[38px] md:leading-[46px]">
              Because when you build AI with us, you don&apos;t just get
              algorithms. You get a long-term advantage.
            </h2>
          </GradientText>
        </div>

        {/* Feature List */}
        <div className="flex flex-col">
          {featureData.map((feature) => (
            <React.Fragment key={feature.title}>
              <FeatureItem title={feature.title} content={feature.content} />
              {/* Add divider after every item */}
              <GradientDivider />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
