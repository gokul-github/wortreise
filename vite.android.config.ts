import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Static bundle consumed by the Capacitor Android WebView. */
export default defineConfig({
  root: fileURLToPath(new URL("./src/android", import.meta.url)),
  plugins: [tailwindcss(), viteReact()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  build: {
    outDir: fileURLToPath(new URL("./dist/android", import.meta.url)),
    emptyOutDir: true,
  },
  cacheDir: fileURLToPath(new URL("./node_modules/.vite-android", import.meta.url)),
});
