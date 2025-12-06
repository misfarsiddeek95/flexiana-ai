import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import TagButton from "./TagButton";

interface DisplayCardProps {
  title: string;
  imageUrl?: string | null;
  href: string;
  author?: string;
  readTime?: string | null;
  tags?: string[];
  imageHeightClass?: string; // <-- NEW PROP: for flexible image height
  hasVideoThumbnail?: boolean;
  videoUrl?: string;
  clientLogo?: string | null;
}

const DisplayCard = memo(function DisplayCard({
  title,
  author,
  readTime,
  imageUrl,
  href,
  tags,
  imageHeightClass = "h-[200px]", // <-- Default for blogs
  hasVideoThumbnail = false,
  videoUrl,
  clientLogo,
}: DisplayCardProps) {
  return (
    <Link
      href={href}
      className="block w-full max-w-sm lg:max-w-none
                 transition-transform duration-300 ease-out hover:scale-[1.02]"
    >
      <div
        className="font-inter bg-[#FAFAFA] rounded-2xl overflow-hidden h-full flex flex-col
                   shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      >
        <div className={`relative w-full shrink-0 ${imageHeightClass}`}>
          {hasVideoThumbnail && videoUrl ? (
            <iframe
              src={`${videoUrl}?autoplay=1&loop=1&muted=1&background=1&autopause=0&controls=0&title=0&byline=0&portrait=0&transparent=0`}
              className="absolute inset-0 w-full h-full scale-130 sm:scale-y-100 sm:scale-x-125 pointer-events-none"
              style={{
                border: "none",
                display: "block",
                pointerEvents: "none",
              }}
              allow="autoplay"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  className="z-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                  No Image
                </div>
              )}

              {readTime && (
                <div className="absolute bottom-3 right-3 bg-white/70 rounded-full px-3 py-1 backdrop-blur-sm">
                  <span
                    className="font-inter font-normal text-base 
                         bg-linear-to-r from-[#FF6F00] to-[#C33C00] 
                         bg-clip-text text-transparent"
                    style={{ letterSpacing: "0px" }}
                  >
                    {readTime} &gt;
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* --- Text Section --- */}
        <div
          className="p-4 flex flex-col grow"
          style={{ gap: "10px", paddingBottom: "12px" }}
        >
          <div className="flex justify-between items-start gap-3">
            <h3
              className="font-semibold text-[#1A1A1A]
                        text-[21px] leading-7"
              style={{ letterSpacing: "0px" }}
            >
              {title}
            </h3>
            {clientLogo && (
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <Image
                  src={clientLogo}
                  alt={`${title} client logo`}
                  fill
                  className="object-contain p-2"
                  sizes="(min-width: 1024px) 96px, 80px"
                />
              </div>
            )}
          </div>

          {tags && (
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag) => (
                <TagButton
                  key={tag}
                  text={tag}
                  showIcon={false}
                  hasHover={false}
                  size="small"
                />
              ))}
            </div>
          )}

          {author && (
            <p
              className="font-normal text-[#616161]
                         text-[16px] leading-6"
              style={{ letterSpacing: "0px" }}
            >
              by {author}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
});

export default DisplayCard;
