import Link from "next/link";
import React from "react";

interface GradientButtonProps {
  text: string;
  href: string; // Assuming this is a link
  className?: string; // For additional classes like alignment
}

export default function GradientButton({
  text,
  href,
  className,
}: GradientButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-block 
        py-[10px] px-[18px] 
        rounded-lg 
        font-semibold text-white
        transition-opacity hover:opacity-90
        
        // --- As per your styles ---
        shadow-[0px_1px_2px_0px_#0A0D120D] 
        bg-[linear-gradient(292.62deg,_#FF6F00_9.56%,_#C33C00_124.67%)]
        
        ${className}
      `}
    >
      {text}
    </Link>
  );
}
