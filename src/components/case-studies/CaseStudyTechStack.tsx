"use client";

import React from "react";
import { motion } from "framer-motion";
import { TechCategory } from "@/types/caseStudy";

interface CaseStudyTechStackProps {
  techStack: {
    categories: TechCategory[];
  };
}

export default function CaseStudyTechStack({
  techStack,
}: CaseStudyTechStackProps) {
  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-[32px] md:text-[40px] text-[#1A1A1A] mb-12 text-center">
            Technology Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="font-bold text-[20px] text-[#1A1A1A] mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-linear-to-r from-[#42A5F5]/10 to-[#7E57C2]/10 text-[#42A5F5] rounded-lg text-sm font-medium border border-[#42A5F5]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
