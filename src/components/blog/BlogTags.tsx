"use client";

import React from "react";
import { motion } from "framer-motion";
import TagButton from "@/components/ui/TagButton";

interface BlogTagsProps {
  tags: string[];
}

export default function BlogTags({ tags }: BlogTagsProps) {
  // Limit to maximum 10 tags
  const displayTags = tags.slice(0, 10);

  return (
    <div className="flex flex-wrap justify-center gap-2 py-6 px-4">
      {displayTags.map((tag, index) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: 0.4 + index * 0.1, // Staggered animation with 100ms delay
          }}
        >
          <TagButton
            text={tag}
            showIcon={false}
            hasHover={false}
            size="small"
          />
        </motion.div>
      ))}
    </div>
  );
}
