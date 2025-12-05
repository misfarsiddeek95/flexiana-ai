import React from "react";
import { getBlogs } from "@/app/actions/blog";
import BlogList from "./BlogList";

export default async function BlogSection() {
  const { blogs, total, hasMore } = await getBlogs(1, 6);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BlogList
          initialBlogs={blogs}
          initialTotal={total}
          initialHasMore={hasMore}
        />
      </div>
    </section>
  );
}
