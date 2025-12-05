"use client";

import React from "react";

import RichTextRenderer from "./RichTextRenderer";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <section className="bg-[#F5F5F7] py-8 md:py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-[800px]">
        <RichTextRenderer htmlContent={content} enableMediaProcessing={false} />
      </div>
    </section>
  );
}
