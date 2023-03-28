import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-electron-plugin";
import { loadViteEnv } from "vite-electron-plugin/plugin";
import renderer from "vite-plugin-electron-renderer";

export default defineConfig(({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });

  const sourcemap = command === "serve" || !!process.env.VSCODE_DEBUG;

  return {
    resolve: { alias: { "@": path.join(__dirname, "src") } },
    plugins: [
      react(),
      electron({
        include: ["electron"],
        transformOptions: { sourcemap },
        plugins: [loadViteEnv()],
      }),
      renderer(),
    ],
    clearScreen: false,
  };
});
