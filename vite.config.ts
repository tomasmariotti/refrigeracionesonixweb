import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tanstackRouter from "@tanstack/router-plugin/vite";

export default defineConfig({
  base: "/",
  plugins: [
    tanstackRouter(),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  resolve: {
    alias: { "@": "/src" },
  },
});
