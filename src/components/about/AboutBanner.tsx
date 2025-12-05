import React from "react";
import TagButton from "../ui/TagButton";
import GradientText from "../ui/GradientText";
import TextType from "../ui/TextType";

// Your array of tags
const tags = [
  "Service Design",
  "Front-end",
  "Back-end",
  "AI Development",
  "Full Stack",
  "Web3",
  "Product Design",
  "Blockchain",
  "Clojure",
  "Data Science",
  "Business Analyst",
];

// This new array defines the position and z-index for each tag.
// This is how we create the "cloud" layout while still looping.
const layoutStyles = [
  // (Service Design)
  { position: "top-0 left-1/4 lg:left-32", zIndex: 10 },
  // (Front-end)
  { position: "top-[70px] left-0 lg:top-20 lg:left-0", zIndex: 12 },
  // (Back-end)
  { position: "top-[80px] left-[135px] lg:top-20 lg:left-36", zIndex: 10 },
  // (AI Development)
  { position: "top-[40px] right-0 lg:top-24 lg:right-25", zIndex: 11 },
  // (Full Stack)
  { position: "top-[140px] left-5 lg:top-40 lg:left-10", zIndex: 11 },
  // (Web3)
  { position: "top-[150px] left-[140px] lg:top-40 lg:left-48", zIndex: 13 },
  // (Product Design)
  { position: "top-[140px] right-0 lg:top-44 lg:right-20", zIndex: 10 },
  // (Blockchain)
  { position: "top-[210px] left-0 lg:top-60 lg:left-0", zIndex: 10 },
  // (Clojure)
  { position: "top-[210px] left-[140px] lg:top-60 lg:left-36", zIndex: 12 },
  // (Data Science)
  { position: "top-[210px] right-0 lg:top-64 lg:right-35", zIndex: 11 },
  // (Business Analyst)
  { position: "top-[280px] left-1/4 lg:top-80 lg:left-24", zIndex: 10 },
];

export default function AboutBanner() {
  return (
    <section className="bg-white py-28 md:py-48">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* --- Left Column (Text) --- */}
          <div className="flex flex-col">
            <GradientText
              colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
              animationSpeed={5}
              showBorder={false}
              className="ml-0"
            >
              <h1
                className="font-bold
                         text-[32px] leading-[38px]
                         lg:text-[48px] lg:leading-14"
              >
                <TextType
                  text={["What is Flexiana?", "What is Flexiana?"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </h1>
            </GradientText>
            <p
              className="font-normal text-[#1A1A1A]
                         text-lg leading-7 mt-4"
              style={{ letterSpacing: "0px" }}
            >
              Flexiana is more than a remote team—we’re a global circle of
              curious minds and passionate creators. Each of us crafts software
              with care, autonomy, and a shared belief in building things that
              matter. Across continents and time zones, we’ve shaped a home
              built on trust, collaboration, and the power of our diverse
              voices.
            </p>
          </div>

          {/* --- Right Column (Tag Cloud) --- */}
          {/* This container is now 'relative' and has a fixed height.
            This creates the "canvas" for us to 'absolute' position
            the tags inside.
          */}
          <div className="relative h-[350px] lg:h-[400px]">
            {tags.map((tag, index) => {
              // Get the layout for the current tag
              const style = layoutStyles[index] || {
                position: "top-0 left-0",
                zIndex: 10,
              };

              return (
                <TagButton
                  key={tag}
                  text={tag}
                  hasHover={true}
                  showIcon={false}
                  // We apply 'absolute', the position class, and animation
                  className={`animate-float absolute ${style.position}`}
                  // We apply the staggered delay and the z-index for overlapping
                  style={{
                    animationDelay: `${index * 200}ms`, // Staggers the animation
                    zIndex: style.zIndex, // Controls the overlapping
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
