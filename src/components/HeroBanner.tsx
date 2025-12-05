import TextType from "./ui/TextType";

export default function HeroBanner() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center text-center px-4 sm:px-8 overflow-hidden justify-end">
      <video
        src="/video/hero_video.mp4" // <-- UPDATE THIS PATH
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
      />

      {/* This dark overlay makes the white text easier to read. */}
      {/* <div className="absolute inset-0 bg-black/50 z-1"></div> */}

      {/* 2. ADDED pb-24 md:pb-32 to the text wrapper */}
      {/* <div className="relative z-10 pb-24 md:pb-32">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
          <TextType
            text={[
              "Where Custom Intelligence Delivers Real Impact",
              "Where Custom Intelligence Delivers Real Impact",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </h1>
        <p className="text-white text-lg md:text-xl font-medium opacity-90">
          From Vision to Reality. Custom AI That&apos;s Truly Yours
        </p>
      </div> */}
    </div>
  );
}
