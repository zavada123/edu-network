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
      // React and the runtime dependencies stay with the host page: the host installs them from `dependencies`, and
      // its bundler resolves their CommonJS parts (zustand and React Flow require "react"). Their CSS is bundled in.
      external: (id) => !id.endsWith(".css") && (/^(react|react-dom|zustand|fflate|lz-string)(\/|$)/.test(id) || /^@(xyflow|xterm)\//.test(id))
    }
  }
})
