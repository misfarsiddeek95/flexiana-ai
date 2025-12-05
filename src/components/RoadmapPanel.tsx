"use client";

import React from "react";
import {
  RoadmapStep,
  PANEL_HEADER_HEIGHT_PX,
  STICKY_TOP_OFFSET_PX,
  PANEL_SCROLL_PAST_HEIGHT,
} from "@/constant/roadmap-data";

interface RoadmapPanelProps {
  panel: RoadmapStep;
  index: number;
  isLast: boolean;
}

const RoadmapPanel: React.FC<RoadmapPanelProps> = ({
  panel,
  index,
  isLast,
}) => {
  if (!panel) return null;

  const isEmpty = !panel.number && !panel.title;
  const stickyTop = STICKY_TOP_OFFSET_PX + index * PANEL_HEADER_HEIGHT_PX;
  const zIndex = 10 + index;

  const height = isEmpty ? "0px" : PANEL_SCROLL_PAST_HEIGHT;
  const minHeight = isEmpty ? "0px" : "30vh";

  const panelShadow =
    index > 0 && !isEmpty
      ? "0 -10px 20px -10px rgba(0, 0, 0, 0.15)"
      : undefined;

  return (
    <div
      id={`roadmap-panel-${index}`}
      className="sticky rounded-2xl"
      style={{
        top: `${stickyTop}px`,
        zIndex,
        height,
        minHeight,
        boxShadow: panelShadow,
        overflow: "hidden",
      }}
    >
      {!isEmpty && (
        <div
          className="relative w-full h-full text-gray-800"
          style={{
            background:
              "linear-gradient(135deg, rgba(81,196,246,0.10), rgba(74,102,204,0.10), rgba(122,69,197,0.10), rgba(255,138,61,0.10), rgba(255,195,74,0.10))",
          }}
        >
          {/* HEADER */}
          <div
            className="w-full flex items-baseline p-6 md:p-8 bg-white/60 backdrop-blur-sm"
            style={{
              height: `${PANEL_HEADER_HEIGHT_PX}px`,
              position: "relative",
              zIndex: 1,
            }}
          >
            <h3 className="font-bold text-3xl leading-tight mr-2 text-gray-900">
              {panel.number}
            </h3>
            <h3 className="font-bold text-3xl leading-tight text-gray-900">
              {panel.title}
            </h3>
          </div>

          {/* BODY */}
          <div
            className="relative w-full overflow-y-auto p-6 md:p-8 bg-white/50 backdrop-blur-md"
            style={{
              height: `calc(100% - ${PANEL_HEADER_HEIGHT_PX}px)`,
              zIndex: 0,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-4 items-start">
              <div className="md:col-span-3">
                <p className="font-normal text-xl md:text-3xl leading-6 md:leading-10 text-gray-800">
                  {panel.description}
                </p>
              </div>
              {/* <div className="md:col-span-1">
                <p className="font-semibold text-xl leading-7 md:text-right italic text-gray-700">
                  &quot;{panel.quote}&quot;
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPanel;
