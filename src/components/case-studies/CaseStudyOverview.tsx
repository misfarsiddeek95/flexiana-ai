"use client";

import React from "react";
import { motion } from "framer-motion";
import RichTextRenderer from "../blog/RichTextRenderer";

interface CaseStudyOverviewProps {
  overview: string;
}

export default function CaseStudyOverview({
  overview,
}: CaseStudyOverviewProps) {
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
            Overview
          </h2>
          <RichTextRenderer htmlContent={overview} enableMediaProcessing={false} />
        </motion.div>
      </div>
    </section>
  );
}
