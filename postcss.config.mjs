// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // This is the correct plugin for your setup
    autoprefixer: {}, // Add autoprefixer for best practice
  },
};

export default config;
