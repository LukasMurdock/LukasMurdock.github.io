import type { CollectionEntry } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import { NEW_YORK_TIMEZONE } from "./site";

export type PostEntry = CollectionEntry<"posts">;
export type PageEntry = CollectionEntry<"pages">;
export type WorkEntry = CollectionEntry<"workpages">;

export type TagInfo = {
  slug: string;
  label: string;
};

const wordRegex = /[\p{L}\p{N}_'-]+/gu;
const projectRoot = process.cwd();
const postTagCache = new Map<string, unknown>();

export function slugifySegment(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function stripExtension(fileName: string): string {
  return path.basename(fileName).replace(/\.[^.]+$/, "");
}

function stripPostDatePrefix(fileName: string): string {
  const withoutPrefix = stripExtension(fileName).replace(/^_?posts[-/]/, "");
  return withoutPrefix.replace(/^\d{4}-\d{2}-\d{1,2}[\s._-]*/, "");
}

export function getPostSlug(post: PostEntry): string {
  const fromFile = slugifySegment(stripPostDatePrefix(post.id));
  if (fromFile.length > 0) {
    return fromFile;
  }

  const fromTitle = typeof post.data.title === "string" ? slugifySegment(post.data.title) : "";
  if (fromTitle.length > 0) {
    return fromTitle;
  }

  return slugifySegment(stripExtension(post.id));
}

export function getPageSlug(page: PageEntry): string {
  const normalized = stripExtension(page.id).replace(/^_?pages-/, "");
  return slugifySegment(normalized);
}

export function getWorkSlug(work: WorkEntry): string {
  const normalized = stripExtension(work.id).replace(/^_?workpages-/, "");
  return slugifySegment(normalized);
}

export function parseDate(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.valueOf())) {
      return parsed;
    }
  }

  return undefined;
}

function dateFromPostFileName(fileName: string): Date | undefined {
  const match = fileName.match(/^(\d{4})-(\d{2})-(\d{1,2})/);
  if (!match) {
    return undefined;
  }

  const [, year, month, day] = match;
  return parseDate(`${year}-${month}-${day}`);
}

export function getPostDate(post: PostEntry): Date {
  return (
    parseDate(post.data.date) ??
    dateFromPostFileName(post.id) ??
    new Date("1970-01-01T00:00:00.000Z")
  );
}

export function isPublishablePost(post: PostEntry, now = new Date()): boolean {
  if (post.data.published === false) {
    return false;
  }

  return getPostDate(post) <= now;
}

export function sortPostsByDateDesc(posts: PostEntry[]): PostEntry[] {
  return [...posts].sort((left, right) => getPostDate(right).getTime() - getPostDate(left).getTime());
}

function cleanTagToken(token: string): string {
  return token.trim().replace(/^[-,\s]+|[-,\s]+$/g, "");
}

function splitTagString(value: string): { canonical: string[]; legacy: string[] } {
  const cleaned = value.trim();
  if (cleaned.length === 0) {
    return { canonical: [], legacy: [] };
  }

  const legacy = cleaned.split(/\s+/).map(cleanTagToken).filter(Boolean);
  const canonical = (cleaned.includes(",") ? cleaned.split(",") : cleaned.split(/\s+/))
    .map(cleanTagToken)
    .filter(Boolean);

  return { canonical, legacy };
}

function extractFrontmatter(source: string): string {
  if (!source.startsWith("---")) {
    return "";
  }

  const lines = source.split(/\r?\n/);
  const frontmatterLines: string[] = [];

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === "---") {
      break;
    }

    frontmatterLines.push(line);
  }

  return frontmatterLines.join("\n");
}

function stripQuotes(value: string): string {
  const cleaned = value.trim();
  if (
    (cleaned.startsWith("\"") && cleaned.endsWith("\"")) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    return cleaned.slice(1, -1);
  }

  return cleaned;
}

function parseInlineArray(value: string): string[] {
  const trimmed = value.trim();
  if (!(trimmed.startsWith("[") && trimmed.endsWith("]"))) {
    return [];
  }

  return trimmed
    .slice(1, -1)
    .split(",")
    .map((item) => stripQuotes(item))
    .filter(Boolean);
}

function parseTagsFromFrontmatter(frontmatter: string): unknown {
  const lines = frontmatter.split(/\r?\n/);
  let captureArray = false;
  const captured: string[] = [];

  for (const line of lines) {
    const topLevelMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (topLevelMatch && !line.startsWith("  ") && !line.startsWith("\t")) {
      const [, key, rawValue] = topLevelMatch;
      if (key !== "tags") {
        captureArray = false;
        continue;
      }

      const value = rawValue.trim();
      if (!value) {
        captureArray = true;
        continue;
      }

      const inlineArray = parseInlineArray(value);
      if (inlineArray.length > 0) {
        return inlineArray;
      }

      return stripQuotes(value);
    }

    if (!captureArray) {
      continue;
    }

    const listItemMatch = line.match(/^\s*-\s*(.+)$/);
    if (!listItemMatch) {
      if (line.trim().length > 0) {
        break;
      }

      continue;
    }

    captured.push(stripQuotes(listItemMatch[1]));
  }

  return captured;
}

function readPostTagsFromSource(post: PostEntry): unknown {
  if (postTagCache.has(post.id)) {
    return postTagCache.get(post.id);
  }

  try {
    const baseId = path.basename(post.id);
    const dePrefixedId = baseId.replace(/^_?posts-/, "");
    const candidatePaths = [
      path.join(projectRoot, "_posts", post.id),
      path.join(projectRoot, "_posts", `${post.id}.md`),
      path.join(projectRoot, "_posts", baseId),
      path.join(projectRoot, "_posts", `${baseId}.md`),
      path.join(projectRoot, "_posts", dePrefixedId),
      path.join(projectRoot, "_posts", `${dePrefixedId}.md`),
    ];

    const sourcePath = candidatePaths.find((candidatePath) => fs.existsSync(candidatePath));
    if (!sourcePath) {
      postTagCache.set(post.id, undefined);
      return undefined;
    }

    const source = fs.readFileSync(sourcePath, "utf8");
    const frontmatter = extractFrontmatter(source);
    const parsedTags = parseTagsFromFrontmatter(frontmatter);
    postTagCache.set(post.id, parsedTags);
    return parsedTags;
  } catch {
    postTagCache.set(post.id, undefined);
    return undefined;
  }
}

export function normalizeTags(rawTags: unknown): TagInfo[] {
  const canonical: string[] = [];

  if (Array.isArray(rawTags)) {
    for (const rawTag of rawTags) {
      if (typeof rawTag !== "string") {
        continue;
      }

      const parsed = splitTagString(rawTag);
      canonical.push(...parsed.canonical);
    }
  } else if (typeof rawTags === "string") {
    canonical.push(...splitTagString(rawTags).canonical);
  }

  const seen = new Set<string>();
  const normalized: TagInfo[] = [];

  for (const tag of canonical) {
    const slug = slugifySegment(tag);
    if (!slug || seen.has(slug)) {
      continue;
    }

    seen.add(slug);
    normalized.push({
      slug,
      label: tag,
    });
  }

  return normalized;
}

export function getPostTags(post: PostEntry): TagInfo[] {
  const fromData = normalizeTags(post.data.tags);
  if (fromData.length > 0) {
    return fromData;
  }

  return normalizeTags(readPostTagsFromSource(post));
}

export function hasTag(post: PostEntry, targetTag: string): boolean {
  const target = slugifySegment(targetTag);
  if (!target) {
    return false;
  }

  return getPostTags(post).some((tag) => tag.slug === target);
}

export function resolvePostImagePath(image: string | undefined): string | undefined {
  if (!image) {
    return undefined;
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `/images/posts/${image}`;
}

export function stripMarkup(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countWords(content: string): number {
  return stripMarkup(content).match(wordRegex)?.length ?? 0;
}

export function createExcerpt(content: string, maxWords = 16): string {
  const words = stripMarkup(content).split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return words.join(" ");
  }

  return `${words.slice(0, maxWords).join(" ")}...`;
}

const cardDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "2-digit",
  year: "numeric",
  timeZone: NEW_YORK_TIMEZONE,
});

const postIsoFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: NEW_YORK_TIMEZONE,
});

export function formatLongNowDate(date: Date): string {
  return cardDateFormatter.format(date).replace(/, (\d{4})$/, ", 0$1");
}

export function formatLongNowIsoDate(date: Date): string {
  const parts = postIsoFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return `0${year}-${month}-${day}`;
}

export function toRfc822Date(date: Date): string {
  return date.toUTCString();
}

export function toXmlDate(date: Date): string {
  return date.toISOString();
}
