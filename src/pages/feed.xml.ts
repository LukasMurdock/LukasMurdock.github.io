import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import {
  createExcerpt,
  getPageSlug,
  getPostDate,
  getPostSlug,
  getPostTags,
  isPublishablePost,
  sortPostsByDateDesc,
} from "@/lib/content";
import { SITE } from "@/lib/site";

export async function GET(context: { site?: URL }) {
  const posts = sortPostsByDateDesc((await getCollection("posts")).filter((post) => isPublishablePost(post)));
  const pages = await getCollection("pages");

  const postItems = posts.map((post) => ({
    title: post.data.title ?? getPostSlug(post),
    description: post.data.description || createExcerpt(post.body ?? "", 60),
    pubDate: getPostDate(post),
    link: `/${getPostSlug(post)}/`,
    customData: getPostTags(post).length
      ? `<category>${getPostTags(post)
          .map((tag) => tag.label)
          .join("</category><category>")}</category>`
      : undefined,
    content: post.body ?? "",
  }));

  const pageItems = pages
    .filter((page) => getPageSlug(page) !== "404")
    .map((page) => ({
      title: page.data.title ?? getPageSlug(page),
      description: page.data.description || createExcerpt(page.body ?? "", 40),
      link: `/${getPageSlug(page)}/`,
      content: page.body ?? "",
    }));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? new URL(SITE.url),
    items: [...postItems, ...pageItems],
    customData: [
      '<webfeeds:icon>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:icon>',
      '<webfeeds:logo>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:logo>',
      "<webfeeds:accentColor>F94643</webfeeds:accentColor>",
      '<webfeeds:related layout="card" target="browser"/>',
    ].join(""),
    xmlns: {
      webfeeds: "http://webfeeds.org/rss/1.0",
      atom: "http://www.w3.org/2005/Atom",
    },
  });
}
