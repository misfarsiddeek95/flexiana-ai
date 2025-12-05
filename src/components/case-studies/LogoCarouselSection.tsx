"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./LogoCarouselSection.module.css";

const logos = [
  { src: "/images/partners/kaizo.png", alt: "Kaizo" },
  { src: "/images/partners/latacora.png", alt: "Latacora" },
  {
    src: "/images/partners/deloitte-logo-png-transparent_(1).png",
    alt: "Deloitte Logo Png Transparent (1)",
  },
  { src: "/images/partners/legalmate.png", alt: "Legalmate" },
  { src: "/images/partners/lifesize-logo_(2).png", alt: "Lifesize Logo (2)" },
  { src: "/images/partners/baresq.png", alt: "Baresq" },
  { src: "/images/partners/347639_1.png", alt: "347639 1" },
  { src: "/images/partners/fold.png", alt: "Fold" },
  {
    src: "/images/partners/cloudpermit_logo_rgb_blue.png",
    alt: "Cloudpermit Logo Rgb Blue",
  },
  {
    src: "/images/partners/guarenteed-rate-seeklogo.png",
    alt: "Guarenteed Rate Seeklogo",
  },
  { src: "/images/partners/etp.png", alt: "Etp" },
  { src: "/images/partners/stili.png", alt: "Stili" },
  { src: "/images/partners/laclary.png", alt: "Laclary" },
  { src: "/images/partners/logo.png", alt: "Logo" },
  { src: "/images/partners/data42.png", alt: "Data42" },
  { src: "/images/partners/zimpler.png", alt: "Zimpler" },
  { src: "/images/partners/unnamed.png", alt: "Unnamed" },
  { src: "/images/partners/codescene_logo_1.png", alt: "Codescene Logo 1" },
  { src: "/images/partners/reifyhealth.png", alt: "Reifyhealth" },
  { src: "/images/partners/ourhub.png", alt: "Ourhub" },
  { src: "/images/partners/livesport.png", alt: "Livesport" },
  {
    src: "/images/partners/disco-melee-logo_20_no_20background.png",
    alt: "Disco Melee Logo 20 No 20Background",
  },
  {
    src: "/images/partners/crossbeam-logo-color_(1).png",
    alt: "Crossbeam Logo Color (1)",
  },
  { src: "/images/partners/radiant_lab.png", alt: "Radiant Lab" },
];

export default function LogoCarouselSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - wrapperRef.current.offsetLeft);
    setScrollLeft(wrapperRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = (x - startX) * 2.5;
    wrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 100);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => setIsPaused(false), 100);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!wrapperRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - wrapperRef.current.offsetLeft);
    setScrollLeft(wrapperRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !wrapperRef.current) return;
    const x = e.touches[0].pageX - wrapperRef.current.offsetLeft;
    const walk = (x - startX) * 2.5;
    wrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 100);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeaveContainer = () => {
    if (!isDragging) {
      setIsPaused(false);
    }
  };

  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1
            className="font-bold text-[#1A1A1A]
                       text-5xl leading-14"
            style={{ letterSpacing: "0px" }}
          >
            Our Projects
          </h1>
          <p
            className="font-semibold text-gray-600
                       text-2xl leading-8 mt-4"
            style={{ letterSpacing: "0px" }}
          >
            Smarter software. Intelligent apps. AI that feels intuitive. All
            built to elevate every moment of your digital life.
          </p>
        </div>

        <div
          className="w-full relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeaveContainer}
        >
          <div
            ref={wrapperRef}
            className={`${styles.wrapper} ${isDragging ? styles.dragging : ""}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={containerRef}
              className={`flex ${styles.scrollContainer} ${isPaused ? styles.paused : ""
                }`}
            >
              {/* Render logos 4 times for seamless loop */}
              {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="shrink-0 mx-4
                             h-20 w-20
                             md:h-[130px] md:w-[130px]"
                  draggable={false}
                >
                  <div
                    className="w-full h-full
                               flex items-center justify-center
                               border border-black rounded-lg
                               shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
                               bg-white"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={130}
                      height={130}
                      className="p-2 object-contain pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
