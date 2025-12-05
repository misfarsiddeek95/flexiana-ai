"use client";

import React from "react";
import { motion } from "framer-motion";

interface CaseStudyChallengeProps {
  challenge: {
    description: string;
    points: string[];
  };
}

export default function CaseStudyChallenge({
  challenge,
}: CaseStudyChallengeProps) {
  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-[32px] md:text-[40px] text-[#1A1A1A] mb-6">
            The Challenge
          </h2>
          <p className="text-[18px] md:text-[21px] leading-relaxed text-[#616161] mb-8">
            {challenge.description}
          </p>

          <div className="space-y-4">
            {challenge.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#FF6F00] to-[#C33C00] flex items-center justify-center mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <p className="text-[16px] md:text-[18px] text-[#1A1A1A] flex-1">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
