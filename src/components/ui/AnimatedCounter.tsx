"use client";

import { useRef } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

interface AnimatedCounterProps {
  targetValue: number;
  precision?: number;
  prefix?: string;
  suffix?: string;
  className?: string; // To pass text styling
  style?: React.CSSProperties;
}

export default function AnimatedCounter({
  targetValue,
  precision = 0,
  prefix = "",
  suffix = "",
  className = "",
  style,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  // Trigger animation only when it's 100px from the bottom of the viewport
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  // Create a springy animation
  const spring = useSpring(0, {
    damping: 50,
    stiffness: 200,
    mass: 1,
  });

  // When in view, update the spring to the target value
  if (isInView) {
    spring.set(targetValue);
  }

  // Transform the spring value into a formatted string
  const displayValue = useTransform(spring, (v) => {
    return v.toFixed(precision);
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span style={{ ...style }}>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
