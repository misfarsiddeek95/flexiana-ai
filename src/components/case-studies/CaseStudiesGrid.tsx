import React from "react";
import { getCaseStudies } from "@/app/actions/case-study";
import CaseStudyList from "./CaseStudyList";

export default async function CaseStudiesGrid() {
  const { caseStudies, total, hasMore } = await getCaseStudies(1, 6);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CaseStudyList
          initialCaseStudies={caseStudies}
          initialTotal={total}
          initialHasMore={hasMore}
        />
      </div>
    </section>
  );
}
