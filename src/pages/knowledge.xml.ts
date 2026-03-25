import { readYamlFile, type ResourceItem, type ResourcesData, xmlEscape } from "@/lib/data";
import { SITE } from "@/lib/site";

function toRfc822(dateLike: string | undefined): string {
  if (!dateLike) {
    return new Date().toUTCString();
  }

  const parsed = new Date(dateLike);
  if (Number.isNaN(parsed.valueOf())) {
    return new Date().toUTCString();
  }

  return parsed.toUTCString();
}

export async function GET() {
  const resources = await readYamlFile<ResourcesData>("_data/resources.yaml");
  const entries: ResourceItem[] = [];

  for (const group of resources.fulldata ?? []) {
    for (const item of group.List ?? []) {
      entries.push(item);
    }
  }

  const items = entries
    .map((item) => {
      const link = item.Link ? xmlEscape(item.Link) : `${SITE.url}/knowledge/`;
      const title = xmlEscape(item.Title ?? "Untitled");
      const description = xmlEscape(item.Comment ?? "");
      const pubDate = toRfc822(item.Date);

      return `<item><title>${title}</title><description>${description}</description><pubDate>${pubDate}</pubDate><link>${link}</link><guid isPermaLink="true">${link}</guid></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>Resources</title>
    <description>From Lukas Murdock</description>
    <link>${SITE.url}/</link>
    <webfeeds:icon>${SITE.url}/safari-pinned-tab.svg</webfeeds:icon>
    <webfeeds:logo>${SITE.url}/safari-pinned-tab.svg</webfeeds:logo>
    <webfeeds:accentColor>F94643</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    <atom:link href="${SITE.url}/knowledge.xml" rel="self" type="application/rss+xml"/>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
