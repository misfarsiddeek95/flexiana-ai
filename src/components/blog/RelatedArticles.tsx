"use client";

import React from "react";
import { motion } from "framer-motion";
import DisplayCard from "@/components/ui/DisplayCard";
import { RelatedArticle } from "@/types/blog";

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-satoshi font-bold text-center text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#1A1A1A] mb-12"
        >
          Related Articles
        </motion.h2>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15, // Staggered animation with 150ms delay
              }}
              className="w-full max-w-sm"
            >
              <DisplayCard
                title={article.title}
                author={article.author}
                readTime={article.readTime}
                imageUrl={article.imageUrl}
                href={`/blog/${article.slug}`}
                tags={article.tags}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
