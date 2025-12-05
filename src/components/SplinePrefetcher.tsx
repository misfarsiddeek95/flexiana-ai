"use client";

import { useSplineCache } from "@/hooks/useSplineCache";

export default function SplinePrefetcher() {
    // Trigger the cache logic immediately
    useSplineCache("https://prod.spline.design/lPFhmjX09AKt3iES/scene.splinecode");

    // Render nothing
    return null;
}
