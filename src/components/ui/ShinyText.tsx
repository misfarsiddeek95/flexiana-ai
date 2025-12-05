import React from "react";

interface ShinyTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  children,
  speed = 3,
  className = "",
}) => {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      {/* Base visible text */}
      <span className="relative z-10 text-[#1A1A1A]">{children}</span>

      {/* Shine overlay */}
      <span
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          mixBlendMode: "lighten",
          animation: `shineSweep ${speed}s linear infinite`,
        }}
      />
    </span>
  );
};

export default ShinyText;
