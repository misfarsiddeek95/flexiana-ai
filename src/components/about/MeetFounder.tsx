import React from "react";
import Image from "next/image";
import Link from "next/link"; // Use Next.js Link for the CTA
import GradientText from "../ui/GradientText";
import TextType from "../ui/TextType";

export default function MeetFounder() {
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/*
          This grid handles both layouts:
          - Mobile: 1 column (default)
          - Desktop: 2 columns (lg:grid-cols-2)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* --- Left Column (Text) --- */}
          <div className="flex flex-col">
            {/* Title with responsive font styles */}

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
                  text={["Meet Jiri Knesl", "Meet Jiri Knesl"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                />
              </h1>
            </GradientText>

            {/* Paragraph with responsive font styles */}
            <p
              className="text-[#616161] mt-4
                         text-[16px] leading-6 font-normal
                         lg:text-[21px] lg:leading-7 lg:font-semibold"
            >
              Jiri has spent almost 30 years building software, but what drives
              him isn’t just code, it’s creating things that truly make a
              difference.
            </p>
            <p
              className="text-[#616161] mt-4
                         text-[16px] leading-6 font-normal
                         lg:text-[21px] lg:leading-7 lg:font-semibold"
            >
              He loves spending time with his family, and his passion for
              Clojure keeps him curious and excited every day. At Flexiana, he
              brings that same care and dedication to everything the team
              builds, shaping a place where people and ideas come first.
            </p>

            {/* CTA Link */}
            {/* <Link
              href="/about" // Change this to the correct link
              className="font-semibold text-[21px] leading-7
                         mt-6 inline-block w-fit
                         bg-linear-to-r from-[#FF6F00] to-[#C33C00]
                         bg-clip-text text-transparent
                         transition-opacity hover:opacity-80"
              style={{ letterSpacing: "0px" }}
            >
              Read more &gt;
            </Link> */}
          </div>

          {/* --- Right Column (Image) --- */}
          {/*
            - On mobile, this div is below the text.
            - On desktop, it's the second column.
          */}
          <div className="w-full">
            <Image
              src="/images/founder.png" // Assumed path, update as needed
              alt="Jiri Knesl, founder of Flexiana"
              width={500}
              height={500}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
