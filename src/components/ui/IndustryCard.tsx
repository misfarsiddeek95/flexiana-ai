import Image from "next/image";

interface IndustryCardProps {
  imgSrc: string;
  title: string;
  description: string;
}

export default function IndustryCard({
  imgSrc,
  title,
  description,
}: IndustryCardProps) {
  return (
    <div className="relative flex-shrink-0 flex-grow-0 w-[342px] h-[364.5px]  md:w-[456px] md:h-[486px]">
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="z-0"
        />

        {/* Gradient Overlay & Text Container */}
        {/* Starts dark at the bottom and fades to transparent at the top */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="font-bold text-white text-[32px] leading-[38px]">
            {title}
          </h3>

          <p className="font-semibold text-white text-[21px] leading-[28px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
