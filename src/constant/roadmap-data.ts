// --- TYPE DEFINITION ---
export interface RoadmapStep {
  number: string;
  title: string;
  description: string;
  quote: string;
}

// --- DATA ---
// We include all 6 items. The 6th is our "empty" anchor.
export const roadmapData: RoadmapStep[] = [
  {
    number: "01-",
    title: "Discovery & Strategy",
    description:
      "We start by listening. We ask questions. We dig deep. You share your pain, your ambition, and together we chart the path forward.",
    quote: "A roadmap built around your business story",
  },
  {
    number: "02-",
    title: "Data & Architecture Design",
    description:
      "We lay the foundation for data flows, secure infrastructure, and scalable pipelines. No smoke, no mirrors, just work that lasts.",
    quote: "The solid base your AI can grow on",
  },
  {
    number: "03-",
    title: "AI model Development",
    description:
      "We experiment, build, and improve models until they reflect your world exactly. Then, we bring that intelligence into your system.",
    quote: "A working, tested AI built for your challenge",
  },
  {
    number: "04-",
    title: "Deployment & Integration",
    description:
      "We bring intelligence into your systems so everything just works. Machines talk, processes run, and users don’t think about AI, they just feel the difference.",
    quote: "A living system delivering measurable impact",
  },
  {
    number: "05-",
    title: "Ownership Transfer & Support",
    description:
      "We train your team, hand over the keys, and stick around. You run it, you grow it, and we’re there whenever you need a hand.",
    quote: "Your AI. Your team. Your future.",
  },
];

// --- CONSTANTS FOR THE STICKY EFFECT ---
export const PANEL_HEADER_HEIGHT_PX = 120; // 120px
export const STICKY_TOP_OFFSET_PX = 20; // 20px
// export const PANEL_SCROLL_PAST_HEIGHT = "60vh"; ----> Used previousely.
export const PANEL_SCROLL_PAST_HEIGHT = "45vh"; // ----> changed according to the client's preference.
