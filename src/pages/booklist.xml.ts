import { readYamlFile, type BookListData, xmlEscape } from "@/lib/data";
import { SITE } from "@/lib/site";

function toXmlDate(value: string | undefined): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function normalizeArray(value: string[] | string | undefined): string[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

export async function GET() {
  const booklist = await readYamlFile<BookListData>("_data/booklistRead.yaml");

  const entries = (booklist.isbns ?? [])
    .map((book) => {
      const title = xmlEscape(book.title ?? "Untitled");
      const subtitle = xmlEscape(book.subtitle ?? "");
      const author = xmlEscape(normalizeArray(book.author).join(", "));
      const image = book.image ? `${SITE.url}${book.image}` : `${SITE.url}/images/LM-portrait.jpg`;
      const updated = toXmlDate(book.dateRead);
      const id = `tag:lukasmurdock.com,2020-12-19:/booklist/${encodeURIComponent((book.title ?? "untitled").toLowerCase())}`;

      return `<entry>
  <title>${title}</title>
  <id>${id}</id>
  <updated>${updated}</updated>
  <content type="html" xml:lang="en" xml:base="${SITE.url}/"><![CDATA[<h2>${title}</h2><h3>${subtitle}</h3><p>By ${author}</p><a href="${SITE.url}/booklist/"><img alt="${title}" src="${image}" /></a>]]></content>
  <category term="Books"/>
  <published>${updated}</published>
</entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <title>${xmlEscape(SITE.title)}</title>
  <link rel="alternate" type="text/html" href="${SITE.url}/" />
  <link rel="self" type="application/atom+xml" href="${SITE.url}/booklist.xml" />
  <id>${SITE.url}/</id>
  <subtitle>${xmlEscape(SITE.description)}</subtitle>
  <webfeeds:cover image="${SITE.url}/images/LM-portrait.jpg" />
  <webfeeds:icon>${SITE.url}/safari-pinned-tab.svg</webfeeds:icon>
  <webfeeds:logo>${SITE.url}/safari-pinned-tab.svg</webfeeds:logo>
  <webfeeds:accentColor>da532c</webfeeds:accentColor>
  <webfeeds:related layout="card" target="browser"/>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>Lukas Murdock</name>
    <email>Lukas@lukasmurdock.com</email>
    <uri>${SITE.url}/</uri>
  </author>
  ${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
