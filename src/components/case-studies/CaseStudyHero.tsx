"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  year: string;
  duration: string;
  heroImage?: string | null;
  heroImageAlt?: string | null;
  tags: string[];
}

export default function CaseStudyHero({
  title,
  subtitle,
  client,
  industry,
  year,
  duration,
  heroImage,
  heroImageAlt,
  tags,
}: CaseStudyHeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#F8F9FA] via-[#F5F7FA] to-[#F0F4F8] pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#42A5F5]/10 to-[#7E57C2]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FF6F00]/10 to-[#C33C00]/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#42A5F5] border border-[#42A5F5]/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-bold text-[40px] md:text-[56px] leading-tight text-[#1A1A1A] mb-4">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-[21px] md:text-[24px] text-[#616161] mb-8">
              {subtitle}
            </p>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-[#616161] uppercase tracking-wider mb-1">
                  Client
                </p>
                <p className="text-lg font-medium text-[#1A1A1A]">{client}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#616161] uppercase tracking-wider mb-1">
                  Industry
                </p>
                <p className="text-lg font-medium text-[#1A1A1A]">{industry}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#616161] uppercase tracking-wider mb-1">
                  Year
                </p>
                <p className="text-lg font-medium text-[#1A1A1A]">{year}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#616161] uppercase tracking-wider mb-1">
                  Duration
                </p>
                <p className="text-lg font-medium text-[#1A1A1A]">{duration}</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            {heroImage ? (
              <Image
                src={heroImage!}
                alt={heroImageAlt || ""}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                No Image Available
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
