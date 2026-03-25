import { readYamlFile, type LinksData, xmlEscape } from "@/lib/data";
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
  const linksData = await readYamlFile<LinksData>("_data/links.yaml");

  const items = (linksData.linkslist ?? [])
    .flatMap((group) =>
      (group.Links ?? []).map((link) => {
        const title = xmlEscape(link.Title ?? "Untitled");
        const comment = xmlEscape(link.Comment ?? "");
        const href = link.Link ? xmlEscape(link.Link) : `${SITE.url}/aroundtheweb/`;
        const pubDate = toRfc822(link.Date ?? group.Date);

        return `<item><title>${title}</title><description>${comment}</description><pubDate>${pubDate}</pubDate><link>${href}</link><guid isPermaLink="true">${href}</guid></item>`;
      }),
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>Around the Web</title>
    <description>From Lukas Murdock</description>
    <link>${SITE.url}/</link>
    <webfeeds:icon>${SITE.url}/safari-pinned-tab.svg</webfeeds:icon>
    <webfeeds:logo>${SITE.url}/safari-pinned-tab.svg</webfeeds:logo>
    <webfeeds:accentColor>F94643</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    <atom:link href="${SITE.url}/aroundtheweb.xml" rel="self" type="application/rss+xml"/>
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
