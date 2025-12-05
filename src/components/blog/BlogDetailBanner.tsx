"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogDetailBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
}

export default function BlogDetailBanner({
  title,
  subtitle,
  imageUrl,
  imageAlt,
}: BlogDetailBannerProps) {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image or Fallback */}
      {imageUrl ? (
        <Image
          src={imageUrl!}
          alt={imageAlt || ""}
          fill
          className="object-contain z-0"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 z-0" />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Title with Animation */}
          {/* <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-satoshi font-bold text-white
                       text-[32px] leading-[38px]
                       md:text-[40px] md:leading-[48px]
                       lg:text-[48px] lg:leading-[56px]
                       mb-4"
            style={{ letterSpacing: "0px" }}
          >
            {title}
          </motion.h1> */}

          {/* Subtitle with Animation */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="font-sans text-white/90
                         text-[18px] leading-[28px]
                         md:text-[21px] md:leading-[32px]
                         max-w-2xl mx-auto"
              style={{ letterSpacing: "0px" }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
