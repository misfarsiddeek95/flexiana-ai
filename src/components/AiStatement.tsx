"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AiStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const allText = [headingRef.current, paragraphRef.current];

      // --- Create the Master Timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", // Animate over 100vh of scroll
          scrub: 1,
          pin: true,
        },
      });

      // --- THIS IS THE FIX ---
      // We use .fromTo() to explicitly define the start and end states.
      // This prevents the "snap back" bug when the animation finishes.
      tl.fromTo(
        allText,
        {
          // FROM (Start State)
          scale: 0.8,
          opacity: 0,
          y: 100,
          backgroundPosition: "200% 0", // Gradient starts at the right
        },
        {
          // TO (End State)
          scale: 1,
          opacity: 1,
          y: 0,
          backgroundPosition: "0% 0", // Gradient ends at the left
          ease: "power2.out",
        }
      );
      // --- END OF FIX ---
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[linear-gradient(135deg,#fff7ed_0%,#faf5ff_50%,#f0f9ff_100%)] text-black overflow-hidden 
                 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h2
          ref={headingRef}
          // --- THIS IS THE FIX ---
          // Use the new custom class
          className="
            ai-statement-text
            text-4xl sm:text-4xl md:text-9xl font-bold mb-6
          "
        >
          Every company talks about AI.
        </h2>

        <p
          ref={paragraphRef}
          // --- THIS IS THE FIX ---
          // Use the new custom class
          className="
            ai-statement-text
            text-3xl sm:text-3xl md:text-5xl font-medium
          "
        >
          We build your AI.
        </p>
      </div>
    </section>
  );
}
