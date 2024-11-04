import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: ".",
    rollupOptions: {
      input: {
        index: "./index.html", // Main entry point (your existing one)
        secondary: "./popup.html", // New HTML entry point
        background: "./src/services/index.ts",
        setup: "./src/services/setup.ts",
        presetService: "./src/services/presetService.ts",
        dataService: "./src/services/dataService.ts",
      },
      output: {
        entryFileNames: `[name].js`, // Keep existing naming
      },
    },
  },
});
