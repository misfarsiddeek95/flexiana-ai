"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogMetadataProps {
  author: string;
  authorImage?: string;
  publishDate: string; // ISO 8601 format
  readTime: string | null;
}

export default function BlogMetadata({
  author,
  authorImage,
  publishDate,
  readTime,
}: BlogMetadataProps) {
  // Format the date
  const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 py-6 px-4"
    >
      {/* Author Avatar (if provided) */}
      {/* Author Avatar (if provided) or Placeholder */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 bg-gray-50 flex items-center justify-center">
        {authorImage ? (
          <Image
            src={authorImage}
            alt={`${author} avatar`}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-[#1A1A1A] font-bold text-lg">
            {author
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </span>
        )}
      </div>

      {/* Metadata Items */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[#616161] font-sans text-[16px] leading-[24px]">
        {/* Author Name */}
        <span className="font-medium">by {author}</span>

        {/* Dot Separator */}
        <span className="hidden sm:inline">•</span>

        {/* Publish Date */}
        <span>{formattedDate}</span>

        {/* Read Time */}
        {readTime && (
          <>
            <span className="hidden sm:inline">•</span>
            <span>{readTime}</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
