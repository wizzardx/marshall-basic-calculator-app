import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/marshall-basic-calculator-app/" : "/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
