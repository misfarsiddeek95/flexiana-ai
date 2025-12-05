"use client";

import Image from "next/image";
import GradientText from "./ui/GradientText";
import TextType from "./ui/TextType";
import { useContactModal } from "@/contexts/ContactModalContext";

interface CTASectionProps {
  imgSrc: string; // <-- Add prop to accept the image path
}

export default function CTASection({ imgSrc = "" }: CTASectionProps) {
  const { openModal } = useContactModal();

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Responsive Grid: 1-col on mobile, 2-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* 1. Image Column */}
          {/* Replaced the placeholder SVG with next/image */}
          {imgSrc !== "" ? (
            <div className="w-full aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={imgSrc}
                alt="Book a consultation"
                layout="fill"
                objectFit="cover" // Use 'cover' to fill the square
              />
            </div>
          ) : (
            <div className="w-full aspect-square bg-gray-300 rounded-lg flex items-center justify-center">
              <svg
                className="w-1/3 h-1/3 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4zM9.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}

          {/* 2. Text Content Column */}
          <div className="flex flex-col text-center md:text-left items-center md:items-start space-y-8">
            {/* Desktop-only Title */}

            <GradientText
              colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
              animationSpeed={5}
              showBorder={false}
            >
              <h2 className="hidden md:block font-bold text-[48px] leading-14">
                Book a free consultation meeting with us
              </h2>
            </GradientText>

            {/* Mobile-only Title */}

            <GradientText
              colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
              animationSpeed={5}
              showBorder={false}
            >
              <h2 className="md:hidden font-bold text-[48px] leading-14">
                Let&apos;s build your AI story
              </h2>
            </GradientText>

            {/* Mobile-only Subtitle */}

            <TextType
              text={[
                "Every great transformation starts with a conversation.",
                "Every great transformation starts with a conversation.",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="⬜"
              className="md:hidden font-semibold text-[21px] leading-7 max-w-md"
            />

            {/* Button */}
            <button
              onClick={openModal}
              className="
                self-center md:self-start
                inline-block 
                py-[10px] px-[18px] 
                rounded-lg 
                font-semibold text-white
                transition-opacity hover:opacity-90
                shadow-[0px_1px_2px_0px_#0A0D120D] 
                bg-[linear-gradient(292.62deg,_#FF6F00_9.56%,_#C33C00_124.67%)]
              "
            >
              Talk to Our AI Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
