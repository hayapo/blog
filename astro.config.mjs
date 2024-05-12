import { defineConfig, passthroughImageService } from "astro/config";

import mdx from "@astrojs/mdx";
import pandacss from "@pandacss/astro";
import preact from "@astrojs/preact";
import { SITE_URL } from "./src/consts";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
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
