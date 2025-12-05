import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'sans' is now your body font (Helvetica)
        sans: ["var(--font-helvetica)", ...defaultTheme.fontFamily.sans],
        // 'satoshi' was your heading font, now mapped to Helvetica
        satoshi: ["var(--font-helvetica)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
