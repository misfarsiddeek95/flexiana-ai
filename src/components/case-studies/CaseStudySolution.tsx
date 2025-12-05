"use client";

import React from "react";
import { motion } from "framer-motion";
import { SolutionApproach } from "@/types/caseStudy";

interface CaseStudySolutionProps {
  solution: {
    description: string;
    approach: SolutionApproach[];
  };
}

export default function CaseStudySolution({
  solution,
}: CaseStudySolutionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-[32px] md:text-[40px] text-[#1A1A1A] mb-6">
            Our Solution
          </h2>
          <p className="text-[18px] md:text-[21px] leading-relaxed text-[#616161] mb-12">
            {solution.description}
          </p>

          <div className="space-y-8">
            {solution.approach.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-linear-to-br from-white to-[#F8F9FA] p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-r from-[#42A5F5] to-[#7E57C2] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[24px] text-[#1A1A1A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[16px] md:text-[18px] text-[#616161]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {item.details && item.details.length > 0 && (
                  <ul className="ml-14 space-y-2">
                    {item.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start gap-3 text-[15px] md:text-[16px] text-[#616161]"
                      >
                        <span className="text-[#42A5F5] mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
