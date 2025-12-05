"use client";

import React from "react";
import { motion } from "framer-motion";
import { Metric } from "@/types/caseStudy";

interface CaseStudyResultsProps {
  results: {
    description: string;
    metrics: Metric[];
    outcomes: string[];
  };
}

export default function CaseStudyResults({ results }: CaseStudyResultsProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-[32px] md:text-[40px] text-[#1A1A1A] mb-6 text-center">
            Results & Impact
          </h2>
          <p className="text-[18px] md:text-[21px] leading-relaxed text-[#616161] mb-12 text-center max-w-3xl mx-auto">
            {results.description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {results.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-linear-to-br from-[#F8F9FA] to-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-[40px] md:text-[48px] font-bold bg-linear-to-r from-[#42A5F5] to-[#7E57C2] bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-[14px] md:text-[16px] text-[#616161] font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Outcomes List */}
          <div className="bg-linear-to-br from-[#F8F9FA] to-white p-8 md:p-12 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-[24px] text-[#1A1A1A] mb-6">
              Key Outcomes
            </h3>
            <div className="space-y-4">
              {results.outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-linear-to-r from-[#42A5F5] to-[#7E57C2] flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-[16px] md:text-[18px] text-[#1A1A1A] flex-1">
                    {outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
