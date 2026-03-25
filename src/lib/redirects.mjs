import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");

function slugifySegment(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function ensurePath(value) {
  if (!value) {
    return "";
  }

  let normalized = String(value).trim();
  if (!normalized) {
    return "";
  }

  if (/^https?:\/\//i.test(normalized)) {
    return "";
  }

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  const hasExtension = /\/[^/]+\.[a-z0-9]+$/i.test(normalized);
  if (!hasExtension && !normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }

  return normalized.toLowerCase();
}

function getPostSlug(fileName, title) {
  const stem = path
    .basename(fileName)
    .replace(/\.[^.]+$/, "")
    .replace(/^\d{4}-\d{2}-\d{1,2}[\s._-]*/, "");

  const fromFile = slugifySegment(stem);
  if (fromFile) {
    return fromFile;
  }

  const fromTitle = slugifySegment(title ?? "");
  if (fromTitle) {
    return fromTitle;
  }

  return slugifySegment(path.basename(fileName).replace(/\.[^.]+$/, ""));
}

function extractFrontmatter(source) {
  if (!source.startsWith("---")) {
    return "";
  }

  const lines = source.split(/\r?\n/);
  if (lines.length <= 2) {
    return "";
  }

  const contentLines = [];
  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === "---") {
      break;
    }

    contentLines.push(line);
  }

  return contentLines.join("\n");
}

function stripQuotes(value) {
  const cleaned = String(value).trim();
  if (
    (cleaned.startsWith("\"") && cleaned.endsWith("\"")) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    return cleaned.slice(1, -1);
  }

  return cleaned;
}

function parseInlineArray(value) {
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

function parseFrontmatterFields(frontmatter) {
  const state = {
    title: undefined,
    tags: undefined,
    redirectFrom: [],
  };

  const lines = frontmatter.split(/\r?\n/);
  let captureKey = undefined;

  for (const line of lines) {
    const topLevelMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (topLevelMatch && !line.startsWith("  ") && !line.startsWith("\t")) {
      const [, key, rawValue] = topLevelMatch;
      const value = rawValue.trim();
      captureKey = undefined;

      if (key === "title") {
        state.title = stripQuotes(value);
        continue;
      }

      if (key === "tags") {
        if (!value) {
          state.tags = [];
          captureKey = "tags";
          continue;
        }

        const inlineArray = parseInlineArray(value);
        state.tags = inlineArray.length > 0 ? inlineArray : stripQuotes(value);
        continue;
      }

      if (key === "redirect_from") {
        if (!value) {
          captureKey = "redirect_from";
          continue;
        }

        const inlineArray = parseInlineArray(value);
        if (inlineArray.length > 0) {
          state.redirectFrom.push(...inlineArray);
        } else {
          state.redirectFrom.push(stripQuotes(value));
        }

        continue;
      }

      continue;
    }

    if (!captureKey) {
      continue;
    }

    const listItemMatch = line.match(/^\s*-\s*(.+)$/);
    if (!listItemMatch) {
      if (line.trim().length > 0) {
        captureKey = undefined;
      }

      continue;
    }

    const listValue = stripQuotes(listItemMatch[1]);
    if (!listValue) {
      continue;
    }

    if (captureKey === "redirect_from") {
      state.redirectFrom.push(listValue);
      continue;
    }

    if (captureKey === "tags") {
      if (!Array.isArray(state.tags)) {
        state.tags = [];
      }

      state.tags.push(listValue);
    }
  }

  return state;
}

function splitTags(rawTags) {
  const canonical = [];
  const legacy = [];

  const addFromString = (value) => {
    const cleaned = value.trim();
    if (!cleaned) {
      return;
    }

    legacy.push(...cleaned.split(/\s+/).map((tag) => tag.trim()).filter(Boolean));

    const pieces = cleaned.includes(",") ? cleaned.split(",") : cleaned.split(/\s+/);
    canonical.push(...pieces.map((tag) => tag.trim()).filter(Boolean));
  };

  if (Array.isArray(rawTags)) {
    for (const value of rawTags) {
      if (typeof value === "string") {
        addFromString(value);
      }
    }
  } else if (typeof rawTags === "string") {
    addFromString(rawTags);
  }

  return { canonical, legacy };
}

function addRedirect(redirects, fromPath, toPath) {
  const from = ensurePath(fromPath);
  const to = ensurePath(toPath);

  if (!from || !to || from === to) {
    return;
  }

  redirects.set(from, to);
}

async function addTagFolderRedirects(redirects) {
  const tagDir = path.join(projectRoot, "_site", "tag");

  let entries = [];
  try {
    entries = await fs.readdir(tagDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const slug = slugifySegment(entry.name);
    if (!slug) {
      continue;
    }

    addRedirect(redirects, `/tag/${entry.name}/`, `/tag/${slug}/`);
  }
}


export async function buildRedirects() {
  const redirects = new Map();
  const postFiles = await fg("_posts/*.md", {
    cwd: projectRoot,
    onlyFiles: true,
  });

  for (const relativeFile of postFiles) {
    const absoluteFile = path.join(projectRoot, relativeFile);
    const source = await fs.readFile(absoluteFile, "utf8");
    const frontmatter = extractFrontmatter(source);
    const data = parseFrontmatterFields(frontmatter);

    const postSlug = getPostSlug(relativeFile, data.title);
    if (!postSlug) {
      continue;
    }

    const canonicalPath = `/${postSlug}/`;
    const redirectFrom = data.redirectFrom;

    if (typeof redirectFrom === "string") {
      addRedirect(redirects, redirectFrom, canonicalPath);
    } else if (Array.isArray(redirectFrom)) {
      for (const pathValue of redirectFrom) {
        addRedirect(redirects, pathValue, canonicalPath);
      }
    }

    const { legacy } = splitTags(data.tags);
    for (const rawTag of legacy) {
      const normalizedTag = slugifySegment(rawTag);
      if (!normalizedTag) {
        continue;
      }

      addRedirect(redirects, `/tag/${rawTag}/`, `/tag/${normalizedTag}/`);
    }
  }

  await addTagFolderRedirects(redirects);
  return Object.fromEntries(redirects.entries());
}
