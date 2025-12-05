import IndustryCarousel from "./ui/IndustryCarousel";

export default function IndustriesSection() {
  return (
    // We use your new background color here
    <section className="bg-[#F5F5F7] py-16 md:py-24">
      {" "}
      {/* Container to control max-width and horizontal padding */}
      <div className="container mx-auto max-w-7xl pl-4 md:pl-0">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          {/* Responsive Title */}
          <h2
            className="font-bold text-[#1A1A1A]
                         text-[32px] leading-[38px]
                         md:text-[48px] md:leading-[56px] text-center"
          >
            Industries we&apos;ve Transformed
          </h2>
        </div>

        {/* The Carousel Component */}
        <IndustryCarousel />
      </div>
    </section>
  );
}
