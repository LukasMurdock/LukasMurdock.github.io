import { readYamlFile, type NoteLogItem, xmlEscape } from "@/lib/data";
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

function truncate(value: string, count: number): string {
  if (value.length <= count) {
    return value;
  }

  return `${value.slice(0, count).trim()}...`;
}

export async function GET() {
  const noteLog = await readYamlFile<NoteLogItem[]>("_data/noteLog.yaml");

  const items = noteLog
    .map((entry) => {
      const note = entry.note ?? "";
      const timestamp = entry.initialTimestamp ?? "";
      const title = xmlEscape(truncate(note.replace(/\s+/g, " "), 20));
      const description = xmlEscape(note);
      const pubDate = toRfc822(timestamp);
      const link = `${SITE.url}/notes/#${encodeURIComponent(timestamp)}`;

      return `<item><title>${title}</title><description>${description}</description><pubDate>${pubDate}</pubDate><link>${link}</link><guid isPermaLink="true">${xmlEscape(timestamp)}</guid></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>Notes</title>
    <description>From Lukas Murdock</description>
    <link>${SITE.url}/</link>
    <webfeeds:icon>${SITE.url}/safari-pinned-tab.svg</webfeeds:icon>
    <webfeeds:logo>${SITE.url}/safari-pinned-tab.svg</webfeeds:logo>
    <webfeeds:accentColor>F94643</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    <atom:link href="${SITE.url}/notes.xml" rel="self" type="application/rss+xml"/>
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
