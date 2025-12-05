import React from "react";
import Link from "next/link";
import GradientButton from "@/components/ui/GradientButton";

export default function BlogNotFound() {
  return (
    <main className="min-h-screen relative bg-white flex items-center justify-center px-4">
      <div className="container mx-auto max-w-2xl text-center">
        {/* 404 Heading */}
        <h1 className="font-satoshi font-bold text-[72px] md:text-[96px] leading-tight text-[#1A1A1A] mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="font-satoshi font-bold text-[32px] md:text-[40px] leading-tight text-[#1A1A1A] mb-6">
          Blog Post Not Found
        </h2>

        <p className="font-sans text-[18px] md:text-[21px] leading-relaxed text-[#616161] mb-12 max-w-lg mx-auto">
          Sorry, we couldn&apos;t find the blog post you&apos;re looking for. It
          may have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GradientButton text="Back to Blog" href="/blog" />

          <Link
            href="/"
            className="font-sans font-semibold text-[18px] text-[#1A1A1A] hover:opacity-70 transition-opacity"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
