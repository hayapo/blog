import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://hayapo.dev",
  image: {
    service: passthroughImageService()
  },

  integrations: [
		mdx(),
		preact(),
		icon({
			iconDir: "src/icons",
			include: {
				mdi: ["twitter", "github", "rss-box", "chevron-left", "chevron-right", "mastodon"],
				ri: ["bluesky-fill", "discord-fill"],
				"simple-icons": ["zenn", "hatenabookmark"]
			}
		})],
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});
