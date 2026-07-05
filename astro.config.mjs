import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { rehypeLinkIcons } from "./src/lib/rehype-link-icons.ts";
import { buildRedirects } from "./src/lib/redirects.mjs";

const redirects = await buildRedirects();
const sitemapExcludedPaths = new Set(["/on-this-day/", "/video/", "/thoughtsroom/"]);

export default defineConfig({
  site: "https://lukasmurdock.com",
  outDir: "./_site",
  trailingSlash: "always",
  redirects,
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = typeof page === "string" ? new URL(page).pathname : page.pathname;
        return !sitemapExcludedPaths.has(pathname);
      },
    }),
  ],
  markdown: unified({
    rehypePlugins: [rehypeLinkIcons],
  }),
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
