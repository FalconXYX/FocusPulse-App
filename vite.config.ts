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
        index: "./index.html",
        background: "./src/services/index.ts",
        setup: "./src/services/setup.ts",
        presetService: "./src/services/presetService.ts",
        dataService: "./src/services/dataService.ts",
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
});
