"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from "@/components/TestimonialCard";
import TagButton from "./ui/TagButton";

// Data for the testimonials
const testimonialData = [
  {
    company: "Innovative Technologies Inc.",
    quote:
      "Flexiana helped us build an AI recommendation engine that truly belongs to us. The uplift in conversion was immediate — but what we value most is the control.",
    name: "Michael Thompson",
    title: "CTO",
    avatarSrc: "", // <-- Add avatar image path here
  },
  {
    company: "MarginBoost",
    quote:
      "With MarginBoost, pricing became dynamic, precise, and profitable. And we own the stack — no dependencies, just results.",
    name: "Michael Thompson",
    title: "CTO",
    avatarSrc: "", // Example: same avatar
  },
  {
    company: "Health-Forward",
    quote:
      "They didn't just give us a model; they taught us how to own it. That's the real transformation.",
    name: "Dr. Elena Rodriguez",
    title: "Head of R&D",
    avatarSrc: "",
  },
  {
    company: "E-Commerce Brands",
    quote:
      "Our personalization feels human now, not robotic. Flexiana's team was key to this shift.",
    name: "Sarah Jenkins",
    title: "CMO",
    avatarSrc: "",
  },
];

export default function TestimonialsSection() {
  // We pass all responsive logic directly to the hooks
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      breakpoints: {
        "(min-width: 768px)": {
          align: "start",
        },
      },
    },
    [
      Autoplay({
        playOnInit: true,
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        breakpoints: {
          "(min-width: 768px)": {
            delay: 5000,
          },
        },
      }),
    ]
  );

  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-12 md:mb-16">
          <TagButton text="What our clients say" />
        </div>
        <div className="overflow-hidden -mx-3" ref={emblaRef}>
          <div className="flex">
            {testimonialData.map((item, index) => (
              <div
                className="shrink-0 
                           basis-11/12 
                           md:basis-1/2 
                           px-3 mb-6 md:mb-8"
                key={index}
              >
                <TestimonialCard
                  company={item.company}
                  quote={item.quote}
                  name={item.name}
                  title={item.title}
                  avatarSrc={item.avatarSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
