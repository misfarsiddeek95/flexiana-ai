import React from "react";

interface CaseStudyVideoProps {
  videoUrl: string;
}

const CaseStudyVideo: React.FC<CaseStudyVideoProps> = ({ videoUrl }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Rounded background container */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
          {/* Video container with aspect ratio */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`${videoUrl}?badge=0&autopause=0&player_id=0&app_id=58479&background=1&muted=1&loop=1&autoplay=1`}
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="Case Study Video"
              style={{
                pointerEvents: "none",
                border: "none",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyVideo;
