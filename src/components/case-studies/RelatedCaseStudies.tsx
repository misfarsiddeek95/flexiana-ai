"use client";

import React from "react";
import { motion } from "framer-motion";
import DisplayCard from "@/components/ui/DisplayCard";
import { RelatedCaseStudy } from "@/types/caseStudy";

interface RelatedCaseStudiesProps {
  caseStudies: RelatedCaseStudy[];
}

export default function RelatedCaseStudies({
  caseStudies,
}: RelatedCaseStudiesProps) {
  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-bold text-center text-[32px] md:text-[40px] text-[#1A1A1A] mb-12"
        >
          More Case Studies
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
              }}
              className="w-full max-w-sm"
            >
              <DisplayCard
                title={caseStudy.title}
                imageUrl={caseStudy.imageUrl}
                href={`/case-studies/${caseStudy.slug}`}
                tags={caseStudy.tags}
                imageHeightClass="h-[280px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
