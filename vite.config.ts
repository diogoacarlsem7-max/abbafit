// AbbaFit: app de treino cristão. Build estático (Hostinger ou qualquer hospedagem).
// PREVIA=1 gera um único HTML (prévia navegável).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const previa = process.env.PREVIA === "1";
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), ...(previa ? [viteSingleFile()] : [])],
  build: { outDir: previa ? "dist-previa" : "dist", emptyOutDir: true, assetsInlineLimit: previa ? 100_000_000 : 0 },
});
