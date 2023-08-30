import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import pandacss from "@pandacss/astro";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  site: "https://example.com",
  integrations: [mdx(), pandacss(), preact()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
