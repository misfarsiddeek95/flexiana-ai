"use client";

import React, { useState } from "react";
import DisplayCard from "../ui/DisplayCard";
import { CaseStudy } from "@/types/caseStudy";
import { getCaseStudies } from "@/app/actions/case-study";
import { Loader2 } from "lucide-react";

interface CaseStudyListProps {
    initialCaseStudies: CaseStudy[];
    initialTotal: number;
    initialHasMore: boolean;
}

export default function CaseStudyList({
    initialCaseStudies,
    initialTotal,
    initialHasMore,
}: CaseStudyListProps) {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(
        initialCaseStudies
    );
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const { caseStudies: newCaseStudies, hasMore: moreAvailable } =
                await getCaseStudies(nextPage, 6);

            setCaseStudies((prev) => [...prev, ...newCaseStudies]);
            setPage(nextPage);
            setHasMore(moreAvailable);
        } catch (error) {
            console.error("Failed to load more case studies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center mb-12 w-full">
                {caseStudies.map((caseStudy) => (
                    <DisplayCard
                        key={caseStudy.slug}
                        title={caseStudy.title}
                        imageUrl={caseStudy.heroImage}
                        href={`/case-studies/${caseStudy.slug}`}
                        tags={caseStudy.tags}
                        imageHeightClass="h-[280px]"
                        hasVideoThumbnail={false}
                        clientLogo={caseStudy.clientLogo}
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
                        "Load More Case Studies"
                    )}
                </button>
            )}
        </div>
    );
}
