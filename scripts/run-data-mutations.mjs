import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import { formatInTimeZone } from "date-fns-tz";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "_data");
const booksImageDir = path.join(root, "images", "books");

const noteLogPath = path.join(dataDir, "noteLog.yaml");
const readBookPath = path.join(dataDir, "booklistRead.yaml");
const wantBookPath = path.join(dataDir, "booklistWant.yaml");

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

async function readYaml(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  return yaml.load(source);
}

async function writeYamlIfChanged(filePath, data) {
  const nextSource = yaml.dump(data, {
    lineWidth: -1,
    noRefs: true,
  });

  const currentSource = await fs.readFile(filePath, "utf8");
  if (currentSource === nextSource) {
    return false;
  }

  await fs.writeFile(filePath, nextSource, "utf8");
  return true;
}

function isBlank(value) {
  return value === undefined || value === null || String(value).trim().length === 0;
}

function formatToday() {
  return formatInTimeZone(new Date(), "America/New_York", "MMMM dd, yyyy");
}

function formatPrettyTime(value) {
  return formatInTimeZone(new Date(value), "America/New_York", "hh:mm a · MMM dd, yyyy");
}

async function mutateNotes() {
  const noteLog = await readYaml(noteLogPath);
  if (!Array.isArray(noteLog)) {
    return;
  }

  let updated = false;

  for (const note of noteLog) {
    if (!note || note.prettyTime || !note.initialTimestamp) {
      continue;
    }

    const parsed = new Date(note.initialTimestamp);
    if (Number.isNaN(parsed.valueOf())) {
      continue;
    }

    note.prettyTime = formatPrettyTime(note.initialTimestamp);
    updated = true;
  }

  if (updated) {
    await writeYamlIfChanged(noteLogPath, noteLog);
  }
}

function mapVolumeInfoToBook(book, volumeInfo, dateKey) {
  if (!book[dateKey] || isBlank(book[dateKey])) {
    book[dateKey] = formatToday();
  }

  book.title = volumeInfo.title ?? book.title;
  book.subtitle = volumeInfo.subtitle ?? book.subtitle;
  book.author = volumeInfo.authors ?? book.author;
  book.publishedDate = volumeInfo.publishedDate ?? book.publishedDate;
  book.pageCount = volumeInfo.pageCount ?? book.pageCount;
  book.categories = volumeInfo.categories ?? book.categories;

  const apiImage = volumeInfo.imageLinks?.thumbnail?.replace("&edge=curl", "");
  if (apiImage) {
    book.image = apiImage;
  }

  book.notFound = false;
}

async function fetchGoogleVolume(isbn) {
  const isbnValue = String(isbn ?? "").trim();
  if (!isbnValue) {
    return undefined;
  }

  const query = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(
    isbnValue,
  )}+&fields=items(volumeInfo/description,volumeInfo/title,volumeInfo/subtitle,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/publishedDate,volumeInfo/pageCount,volumeInfo/categories)+&maxResults=40`;

  const response = await fetch(query);
  if (!response.ok) {
    return undefined;
  }

  const payload = await response.json();
  return payload?.items?.[0]?.volumeInfo;
}

async function resolveImageExtension(response, sourceUrl) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("image/")) {
    const mediaType = contentType.split(";")[0].split("/")[1];
    if (mediaType) {
      return `.${mediaType.replace("jpeg", "jpg")}`;
    }
  }

  const parsed = new URL(sourceUrl);
  const ext = path.extname(parsed.pathname);
  return ext || ".jpg";
}

async function localizeBookImage(book) {
  if (typeof book.image !== "string" || !book.image.startsWith("http")) {
    return false;
  }

  const imageUrl = book.image;
  const response = await fetch(imageUrl);
  if (!response.ok) {
    return false;
  }

  const extension = await resolveImageExtension(response, imageUrl);
  const title = slugifySegment(book.title ?? String(book.isbn ?? "book")) || "book";
  const fileName = `${title}${extension}`;
  const localPath = path.join(booksImageDir, fileName);

  await fs.mkdir(booksImageDir, { recursive: true });
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(localPath, buffer);

  book.image = `/images/books/${fileName}`;
  return true;
}

async function mutateBooklists() {
  const readBookList = await readYaml(readBookPath);
  const wantBookList = await readYaml(wantBookPath);

  const readBooks = Array.isArray(readBookList?.isbns) ? readBookList.isbns : [];
  const wantBooks = Array.isArray(wantBookList?.isbns) ? wantBookList.isbns : [];

  let readUpdated = false;
  let wantUpdated = false;

  for (const readBook of readBooks) {
    if (!readBook) {
      continue;
    }

    if (readBook.notFound !== false) {
      const indexInWant = wantBooks.findIndex(
        (candidate) => String(candidate?.isbn ?? "") === String(readBook?.isbn ?? ""),
      );

      if (indexInWant >= 0) {
        const wantedBook = wantBooks[indexInWant];
        if (!readBook.dateRead || isBlank(readBook.dateRead)) {
          readBook.dateRead = formatToday();
        }

        readBook.title = wantedBook.title;
        readBook.subtitle = wantedBook.subtitle;
        readBook.author = wantedBook.author;
        readBook.dateWanted = wantedBook.dateWanted;
        readBook.publishedDate = wantedBook.publishedDate;
        readBook.pageCount = wantedBook.pageCount;
        readBook.categories = wantedBook.categories;
        readBook.image = wantedBook.image;
        readBook.notFound = false;

        wantBooks.splice(indexInWant, 1);
        readUpdated = true;
        wantUpdated = true;
      } else {
        const volumeInfo = await fetchGoogleVolume(readBook.isbn);
        if (volumeInfo) {
          mapVolumeInfoToBook(readBook, volumeInfo, "dateRead");
          readUpdated = true;
        }
      }
    }

    if (await localizeBookImage(readBook)) {
      readUpdated = true;
    }
  }

  for (const wantBook of wantBooks) {
    if (!wantBook) {
      continue;
    }

    if (wantBook.notFound !== false) {
      const volumeInfo = await fetchGoogleVolume(wantBook.isbn);
      if (volumeInfo) {
        mapVolumeInfoToBook(wantBook, volumeInfo, "dateWanted");
        wantUpdated = true;
      }
    }

    if (await localizeBookImage(wantBook)) {
      wantUpdated = true;
    }
  }

  if (readUpdated) {
    await writeYamlIfChanged(readBookPath, {
      ...readBookList,
      isbns: readBooks,
    });
  }

  if (wantUpdated) {
    await writeYamlIfChanged(wantBookPath, {
      ...wantBookList,
      isbns: wantBooks,
    });
  }
}

async function main() {
  await mutateNotes();
  await mutateBooklists();
  console.log("Data mutation scripts completed");
}

await main();
