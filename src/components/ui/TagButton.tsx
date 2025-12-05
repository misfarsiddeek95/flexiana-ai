import React from "react";

interface TagButtonProps {
  text: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  hasHover?: boolean;
  style?: React.CSSProperties;
  size?: "small" | "large";
}

const GradientDot = () => (
  <span className="w-3.5 h-3.5 bg-gradient-to-br from-[#4A86F7] to-[#A055F7] rounded-full"></span>
);

export default function TagButton({
  text,
  icon,
  className,
  showIcon = true,
  hasHover = false,
  style,
  size = "large",
}: TagButtonProps) {
  const displayIcon = icon ? icon : <GradientDot />;

  // --- Size-specific classes ---
  const paddingClasses = size === "large" ? "py-2 px-5" : "py-1 px-3";
  const textClasses =
    size === "large" ? "text-lg font-bold" : "text-sm font-semibold";
  // ---

  return (
    <div
      className={`group inline-block bg-gradient-to-r from-[#4A86F7] to-[#A055F7] rounded-full p-[1px] ${className}`} // 1px border
      style={style}
    >
      <div
        className={`flex items-center space-x-2 bg-white rounded-full ${paddingClasses} ${
          hasHover
            ? "group-hover:bg-gradient-to-r from-[#42A5F5] to-[#7E57C2]"
            : ""
        }`}
      >
        {showIcon && displayIcon}
        <span
          className={`${textClasses} text-gray-900 ${
            hasHover ? "group-hover:text-white" : ""
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
