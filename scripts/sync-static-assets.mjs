import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

const staticPaths = [
  "css",
  "js",
  "images",
  "data",
  "walksoflife",
  ".well-known",
  "CNAME",
  "robots.txt",
  "blogroll.xml",
  "blogroll.xsl",
  "resources2.xml",
  "mkt315.html",
  "booklist.json",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "apple-touch-icon.png",
  "browserconfig.xml",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon.ico",
  "manifest.json",
  "mstile-150x150.png",
  "pacman.svg",
  "safari-pinned-tab.svg",
  "site.webmanifest",
];

const legacyHtmlRedirects = {
  "writing.html": "/writing/",
  "resources.html": "/resources/",
  "knowledge.html": "/knowledge/",
  "aroundtheweb.html": "/aroundtheweb/",
  "booklist.html": "/booklist/",
  "wanttoread.html": "/wanttoread/",
  "notes.html": "/notes/",
  "principles.html": "/principles/",
  "video.html": "/video/",
  "on-this-day.html": "/on-this-day/",
  "thoughtsroom.html": "/thoughtsroom/",
  "contact.html": "/contact/",
};

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.rm(publicDir, { recursive: true, force: true });
  await fs.mkdir(publicDir, { recursive: true });

  for (const relativePath of staticPaths) {
    const sourcePath = path.join(root, relativePath);
    const destinationPath = path.join(publicDir, relativePath);

    if (!(await exists(sourcePath))) {
      continue;
    }

    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      await fs.cp(sourcePath, destinationPath, { recursive: true });
      continue;
    }

    await fs.mkdir(path.dirname(destinationPath), { recursive: true });
    await fs.copyFile(sourcePath, destinationPath);
  }

  for (const [fromPath, toPath] of Object.entries(legacyHtmlRedirects)) {
    const destinationPath = path.join(publicDir, fromPath);
    const redirectMarkup = `<!doctype html><meta charset="utf-8"><title>Redirecting to ${toPath}</title><meta http-equiv="refresh" content="0;url=${toPath}"><meta name="robots" content="noindex"><link rel="canonical" href="https://lukasmurdock.com${toPath}"><a href="${toPath}">Go to ${toPath}</a>`;
    await fs.mkdir(path.dirname(destinationPath), { recursive: true });
    await fs.writeFile(destinationPath, redirectMarkup, "utf8");
  }

  console.log("Static assets synced to public/");
}

await main();
