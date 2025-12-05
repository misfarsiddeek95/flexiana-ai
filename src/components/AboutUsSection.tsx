"use client";

import TagButton from "./ui/TagButton";
import styles from "./AboutUsSection.module.css";
import { Database, Zap, ShieldCheck } from "lucide-react";

export default function AboutUsSection() {
  return (
    <>
      <div className="relative z-30 bg-[#ffffff]">
        <div className={`${styles.waveWrapper} rotate-180`}>
          <svg
            className={styles.wavesInner}
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className={styles.parallax}>
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="#fff7ed" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="#faf5ff" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="#f0f9ff" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#faf5ff" />
            </g>
          </svg>
        </div>
      </div>
      <section className="relative bg-white py-16 md:py-24 px-4 sm:px-4 overflow-hidden">
        <div className="relative bg-white rounded-xl p-10 z-10">
          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left side */}
            <div className="flex flex-col space-y-8">
              <TagButton text="What is Flexiana AI?" className="self-start" />

              <p className="text-lg leading-relaxed text-black font-normal">
                At Flexiana, we don’t hand you templates or one-size-fits-all
                solutions. We build intelligence together. AI that truly
                understands your data, your systems, and what you’re trying to
                achieve.
              </p>

              <p className="text-lg leading-relaxed text-black font-normal">
                Whether it’s anticipating customer needs, automating your
                workflows, or giving new life to your machines, we craft systems
                that are completely yours. Every model, every pipeline, every
                line of code is designed for your world and the impact you want
                to create.
              </p>

              <h3 className="text-2xl md:text-[32px] font-bold text-gray-900 mb-6 md:mb-8">
                Our DNA
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center group-hover:bg-[#FF6F00]/20 transition-colors duration-300">
                    <Database className="w-4 h-4 md:w-5 md:h-5 text-[#FF6F00]" />
                  </div>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed pt-1 md:pt-1.5">
                    You own everything — models, pipelines, data flows
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center group-hover:bg-[#FF6F00]/20 transition-colors duration-300">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#FF6F00]" />
                  </div>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed pt-1 md:pt-1.5">
                    We move fast, iterate, and keep it transparent.
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#FF6F00]/10 flex items-center justify-center group-hover:bg-[#FF6F00]/20 transition-colors duration-300">
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#FF6F00]" />
                  </div>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed pt-1 md:pt-1.5">
                    Ethical, secure, and sustainable by design.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side image placeholder (VIDEO) */}
            <div className="relative w-full md:max-w-[80%] md:mx-auto flex items-center justify-center overflow-hidden">
              <video
                src="/video/spline-video.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
