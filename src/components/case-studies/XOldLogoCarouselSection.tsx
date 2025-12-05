"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const logos = [
  { src: "/images/partners/kaizo.png", alt: "Kaizo" },
  { src: "/images/partners/latacora.png", alt: "Latacora" },
  {
    src: "/images/partners/deloitte-logo-png-transparent_(1).png",
    alt: "Deloitte Logo Png Transparent (1)",
  },
  { src: "/images/partners/legalmate.png", alt: "Legalmate" },
  { src: "/images/partners/lifesize-logo_(2).png", alt: "Lifesize Logo (2)" },
  { src: "/images/partners/baresq.png", alt: "Baresq" },
  { src: "/images/partners/347639_1.png", alt: "347639 1" },
  { src: "/images/partners/fold.png", alt: "Fold" },
  {
    src: "/images/partners/cloudpermit_logo_rgb_blue.png",
    alt: "Cloudpermit Logo Rgb Blue",
  },
  {
    src: "/images/partners/guarenteed-rate-seeklogo.png",
    alt: "Guarenteed Rate Seeklogo",
  },
  { src: "/images/partners/etp.png", alt: "Etp" },
  { src: "/images/partners/stili.png", alt: "Stili" },
  { src: "/images/partners/laclary.png", alt: "Laclary" },
  { src: "/images/partners/logo.png", alt: "Logo" },
  { src: "/images/partners/data42.png", alt: "Data42" },
  { src: "/images/partners/zimpler.png", alt: "Zimpler" },
  { src: "/images/partners/unnamed.png", alt: "Unnamed" },
  { src: "/images/partners/codescene_logo_1.png", alt: "Codescene Logo 1" },
  { src: "/images/partners/reifyhealth.png", alt: "Reifyhealth" },
  { src: "/images/partners/ourhub.png", alt: "Ourhub" },
  { src: "/images/partners/livesport.png", alt: "Livesport" },
  {
    src: "/images/partners/disco-melee-logo_20_no_20background.png",
    alt: "Disco Melee Logo 20 No 20Background",
  },
  {
    src: "/images/partners/crossbeam-logo-color_(1).png",
    alt: "Crossbeam Logo Color (1)",
  },
  { src: "/images/partners/radiant_lab.png", alt: "Radiant Lab" },
];

export default function XOldLogoCarouselSection() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="font-inter font-bold text-[#1A1A1A]
                       text-5xl leading-[56px]"
            style={{ letterSpacing: "0px" }}
          >
            Our Projects
          </h1>
          <p
            className="font-inter font-semibold text-gray-600
                       text-2xl leading-8 mt-4"
            style={{ letterSpacing: "0px" }}
          >
            Enhancing your experience with smarter faster and more reliable
            digital services.
          </p>
        </div>

        <div
          className="w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {logos.concat(logos).map((logo, index) => (
                <div
                  key={index}
                  className="flex-grow-0 flex-shrink-0 relative mx-4
                             h-[80px] basis-[80px] min-w-[80px]
                             md:h-[130px] md:basis-[130px] md:min-w-[130px]"
                >
                  <div
                    className="w-full h-full
                               flex items-center justify-center
                               border border-black rounded-lg
                               shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={130}
                      height={130}
                      objectFit="contain"
                      className="p-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
