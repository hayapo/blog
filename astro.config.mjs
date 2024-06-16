import { defineConfig, passthroughImageService } from "astro/config";

import mdx from "@astrojs/mdx";
import pandacss from "@pandacss/astro";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://blog.hayapo.dev/blog",
  base: "/blog/",
  trailingSlash: "never",
  outDir: "./dist/blog",
  image: {
    service: passthroughImageService(),
  },
  integrations: [mdx(), pandacss(), preact()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
  vite: { optimizeDeps: { exclude: ['@resvg/resvg-js'] } }
});
