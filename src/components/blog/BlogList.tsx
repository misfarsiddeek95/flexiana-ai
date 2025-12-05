"use client";

import React, { useState } from "react";
import DisplayCard from "../ui/DisplayCard";
import { BlogPost } from "@/types/blog";
import { getBlogs } from "@/app/actions/blog";
import { Loader2 } from "lucide-react";

interface BlogListProps {
    initialBlogs: BlogPost[];
    initialTotal: number;
    initialHasMore: boolean;
}

export default function BlogList({
    initialBlogs,
    initialTotal,
    initialHasMore,
}: BlogListProps) {
    const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const { blogs: newBlogs, hasMore: moreAvailable } = await getBlogs(
                nextPage,
                6
            );

            setBlogs((prev) => [...prev, ...newBlogs]);
            setPage(nextPage);
            setHasMore(moreAvailable);
        } catch (error) {
            console.error("Failed to load more blogs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full">
                {blogs.map((post) => (
                    <DisplayCard
                        key={post.id}
                        title={post.title}
                        imageUrl={post.imageUrl}
                        href={`/blog/${post.slug}`}
                        tags={post.tags}
                        author={post.author}
                        readTime={post.readTime}
                        imageHeightClass="h-[240px]"
                    />
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="px-8 py-3 bg-white border border-gray-200 text-gray-900 font-medium rounded-full 
                     hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Load More Articles"
                    )}
                </button>
            )}
        </div>
    );
}
