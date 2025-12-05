import MobileCarousel from "./MobileCarousel";
import DesktopCarousel from "./DesktopCarousel";
import TagButton from "./ui/TagButton";
import GradientText from "./ui/GradientText";
import { getFeaturedCaseStudies } from "@/app/actions/case-study";

export default async function CaseStudySection() {
  const caseStudies = await getFeaturedCaseStudies();

  return (
    <section className="bg-white py-16 md:pt-24 md:pb-0">
      {/* Header & Mobile Carousel Container */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex mb-12 md:mb-16 flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <TagButton text="Case Studies" />

          <GradientText
            colors={["#51C4F6", "#4A66CC", "#7A45C5", "#FF8A3D", "#FFC34A"]}
            animationSpeed={5}
            showBorder={false}
          >
            <h2 className="font-bold text-[32px] leading-[38px] md:text-[48px] md:leading-14">
              Real Results, Real Ownership
            </h2>
          </GradientText>
        </div>

        <MobileCarousel caseStudies={caseStudies} />
      </div>

      <div className="hidden md:block pl-4 sm:pl-8">
        <DesktopCarousel caseStudies={caseStudies} />
      </div>
    </section>
  );
}
