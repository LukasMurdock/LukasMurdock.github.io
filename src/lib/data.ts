import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

const projectRoot = process.cwd();

function filePath(relativePath: string): string {
  return path.join(projectRoot, relativePath);
}

export async function readYamlFile<T>(relativePath: string): Promise<T> {
  const source = await fs.readFile(filePath(relativePath), "utf8");
  return yaml.load(source) as T;
}

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  const source = await fs.readFile(filePath(relativePath), "utf8");
  return JSON.parse(source) as T;
}

export type ResourceItem = {
  Title?: string;
  Link?: string;
  Comment?: string;
  Date?: string;
  Media?: string;
};

export type ResourceGroup = {
  Type?: string;
  List?: ResourceItem[];
};

export type ResourcesData = {
  fulldata?: ResourceGroup[];
};

export type AroundTheWebLink = {
  Title?: string;
  Link?: string;
  Comment?: string;
  Date?: string;
  Media?: string;
};

export type AroundTheWebGroup = {
  Date?: string;
  Links?: AroundTheWebLink[];
};

export type LinksData = {
  linkslist?: AroundTheWebGroup[];
};

export type NoteLogItem = {
  initialTimestamp?: string;
  note?: string;
  prettyTime?: string;
};

export type BookEntry = {
  isbn?: string | number;
  dateRead?: string;
  dateWanted?: string;
  title?: string;
  subtitle?: string;
  author?: string[] | string;
  publishedDate?: string | number;
  pageCount?: number;
  categories?: string[] | string;
  image?: string;
  link?: string;
  notFound?: boolean;
};

export type BookListData = {
  isbns: BookEntry[];
};

export function xmlEscape(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
