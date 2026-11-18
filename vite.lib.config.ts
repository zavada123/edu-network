import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// The package build: two ES entries and one CSS file in lib/. The demo build (vite.config.ts) goes to dist/.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "lib",
    emptyOutDir: true,
    // The page that uses the package minifies it with its own build.
    minify: false,
    lib: {
      entry: { core: "src/core.ts", react: "src/react.ts" },
      formats: ["es"],
      cssFileName: "style"
    },
    rollupOptions: {
      // React stays with the host page; the rest (React Flow, xterm, zustand) is bundled in.
      external: ["react", "react-dom", "react/jsx-runtime"]
    }
  }
})
