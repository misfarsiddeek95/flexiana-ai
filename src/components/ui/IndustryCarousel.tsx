"use client"; // <-- This component must be a Client Component

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import IndustryCard from "./IndustryCard";

const industryData = [
  {
    imgSrc: "/images/healthtech.jpg",
    title: "Health-Tech",
    description: "Modelling reproductive metabolism for IVF clinics",
  },
  {
    imgSrc: "/images/fintech.jpg",
    title: "Fintech",
    description:
      "Dynamic pricing for e-commerce that goes beyond just copying your competitors",
  },
  {
    imgSrc: "/images/ecommerce.jpg",
    title: "E-Commerce",
    description:
      "Personalized recommendations that deliver win-win outcomes for retail.",
  },
];

export default function IndustryCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    // 3. The Viewport: This div has overflow-hidden
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4 md:gap-6">
        {industryData.map((item) => (
          <IndustryCard
            key={item.title}
            imgSrc={item.imgSrc}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
