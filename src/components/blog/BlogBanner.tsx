"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogBanner() {
  return (
    <div className="relative w-full overflow-hidden h-[500px] max-h-[40vh] md:max-h-[60vh] min-h-[250px]">
      <Image
        src="/images/blog_banner.jpg"
        alt="Abstract white flowing lines"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Gradient Overlay for better text contrast */}
      <div className="absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-white/10 z-0" />

      <div className="absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-center p-4 gap-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/30 backdrop-blur-sm border border-white/40 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-3 md:gap-4"
        >
          <h1
            className="font-inter font-bold text-[#1A1A1A] text-center md:text-left
                       text-[32px] leading-[38px]
                       md:text-[48px] md:leading-14 drop-shadow-sm"
            style={{ letterSpacing: "-0.02em" }}
          >
            What&apos;s new at
          </h1>

          <div className="relative h-10 md:h-14 w-40 md:w-[220px]">
            <Image
              src="/logo.svg"
              alt="Flexiana AI Logo"
              layout="fill"
              objectFit="contain"
              priority
              className="drop-shadow-sm"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
