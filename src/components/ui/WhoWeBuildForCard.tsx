import React, { forwardRef } from "react";

interface WhoWeBuildForCardProps {
  title: string;
  description: string;
  isHovered: boolean; // Receives hover state as a prop
}

// Wrap in 'forwardRef' to accept the ref from the parent
const WhoWeBuildForCard = forwardRef<HTMLDivElement, WhoWeBuildForCardProps>(
  ({ title, description, isHovered }, ref) => {
    return (
      // Attach the 'ref' to this element
      <div className="w-full max-w-[520px] perspective-[1000px]" ref={ref}>
        <div
          className={`
            relative w-full transition-all duration-500
            md:transform-3d
            ${isHovered ? "md:transform-[rotateY(180deg)]" : ""}
          `}
        >
          {/* FRONT FACE (Desktop) / NORMAL VIEW (Mobile) */}
          <div
            className={`
            relative
            md:absolute md:inset-0 md:backface-hidden safari-transform-fix
            p-px rounded-2xl
            bg-linear-to-r from-[#51C4F6] via-[#7A45C5] to-[#FF8A3D]
            transition-all duration-300
            
            /* Mobile: Default styles */
            opacity-90
            md:bg-none
            
            /* Desktop Hover Logic (Applied to Front Face too for smooth transition) */
            ${isHovered
                ? "md:bg-linear-to-r opacity-100"
                : "md:bg-none opacity-90"
              }
          `}
          >
            {/* Soft glowing aura (Front) */}
            <div
              className={`
              absolute inset-0 rounded-2xl
              blur-xl transition-all duration-500
              bg-linear-to-r from-[#51C4F6] via-[#7A45C5] to-[#FF8A3D]
              ${isHovered ? "opacity-60" : "opacity-0"}
            `}
            />

            {/* Content Box (Front) */}
            <div
              className="
              relative z-2
              bg-white rounded-[15px]
              px-6 py-5 md:px-7 md:py-6
              flex flex-col
              justify-center
              min-h-[150px] md:min-h-40 md:h-full
              transition-all duration-300
            "
            >
              <h3
                className="
                font-bold
                text-[24px] md:text-[32px]
                leading-8 md:leading-[38px]
              "
              >
                {title}
              </h3>
              {/* Mobile: Show Description. Desktop: Hide Description on Front Face */}
              <p
                className="
                font-normal
                text-xl
                leading-6
                mt-2
                md:hidden
              "
              >
                {description}
              </p>
            </div>
          </div>

          {/* BACK FACE (Desktop Only) */}
          <div
            className={`
            hidden md:block
            relative
            md:transform-[rotateY(180deg)] md:backface-hidden
            p-px rounded-2xl
            bg-linear-to-r from-[#51C4F6] via-[#7A45C5] to-[#FF8A3D]
            transition-all duration-300
            
            /* Back face always has the 'active' hover style when visible */
            ${isHovered ? "bg-linear-to-r opacity-100" : "bg-none opacity-90"}
          `}
          >
            {/* Soft glowing aura (Back) */}
            <div
              className={`
              absolute inset-0 rounded-2xl
              blur-xl transition-all duration-500
              bg-linear-to-r from-[#51C4F6] via-[#7A45C5] to-[#FF8A3D]
              ${isHovered ? "opacity-60" : "opacity-0"}
            `}
            />

            {/* Content Box (Back) */}
            <div
              className="
              relative z-2
              bg-white rounded-[15px]
              px-6 py-5 md:px-7 md:py-6
              flex flex-col
              justify-center items-center
              min-h-[150px] md:min-h-40 md:h-full
              transition-all duration-300
            "
            >
              <p
                className="
                font-normal
                text-xl
                leading-6
                text-center
              "
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Set display name for React DevTools
WhoWeBuildForCard.displayName = "WhoWeBuildForCard";

export default WhoWeBuildForCard;
