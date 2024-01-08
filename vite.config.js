import esbuild from "esbuild";
import fs from "fs/promises";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [serviceWorkerPlugin()],
  build: {
    outDir: "public",
    rollupOptions: {
      input: {
        main: "index.html",
        404: "404.html",
      },
    },
  },
  base: "/sw-demo/",
});

/**
 * @returns {import('vite').Plugin}
 */
function serviceWorkerPlugin() {
  return {
    name: "service-worker",
    async writeBundle(_options, o2) {
      const cachableAssets = ["./", ...Object.keys(o2).map((x) => `./${x}`)];
      await esbuild.build({
        entryPoints: ["src/service-worker.ts"],
        bundle: true,
        outfile: "public/service-worker.js",
        format: "esm",
        platform: "browser",
        target: "es2020",
        plugins: [
          {
            name: "service-worker-assets",
            setup(build) {
              build.onLoad({ filter: /service-worker.ts/ }, async (args) => {
                const source = await fs.readFile(args.path, "utf-8");
                const newContents = source
                  .replace(
                    "RESOURCES = []",
                    `RESOURCES = ${JSON.stringify(cachableAssets)}`
                  )
                  .replace('CACHE_NAME = ""', `CACHE_NAME = "v${Date.now()}"`);
                return { contents: newContents, loader: "default" };
              });
            },
          },
        ],
      });
    },
  };
}
