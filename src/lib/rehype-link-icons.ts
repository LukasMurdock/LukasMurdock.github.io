import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

type Rule = {
  startsWith?: string;
  includes?: string;
  icon: string;
  type: string;
};

const rules: Rule[] = [
  { startsWith: "/", icon: "𝔏", type: "text" },
  ...[
    "wikipedia",
    "wikimedia",
    "wiktionary",
    "wikisource",
    "wikimediafoundation",
    "wikibooks",
    "mediawiki",
  ].map((value) => ({ includes: value, icon: "wikipedia", type: "svg" })),
  { includes: "github.com", icon: "github", type: "svg" },
  { includes: "lesswrong.com", icon: "LW", type: "text,sans" },
  { includes: "youtu.be", icon: "youtube", type: "svg" },
  { includes: "youtube.com", icon: "youtube", type: "svg" },
  { includes: "news.ycombinator.com", icon: "HN", type: "text,sans" },
  { includes: "seths.blog", icon: "SETH", type: "text,quad" },
  { includes: "paulgraham.com", icon: "PG", type: "text,sans" },
];

function getHref(node: Element): string {
  const href = node.properties?.href;

  if (typeof href === "string") {
    return href;
  }

  if (Array.isArray(href)) {
    const candidate = href.find((value): value is string => typeof value === "string");
    return candidate ?? "";
  }

  return "";
}

export function rehypeLinkIcons() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") {
        return;
      }

      const href = getHref(node);
      if (!href) {
        return;
      }

      for (const rule of rules) {
        const matchesRule =
          (rule.startsWith && href.startsWith(rule.startsWith)) ||
          (rule.includes && href.includes(rule.includes));

        if (!matchesRule) {
          continue;
        }

        node.properties = node.properties ?? {};

        if (!node.properties["data-link-icon"]) {
          node.properties["data-link-icon"] = rule.icon;
        }

        if (!node.properties["data-link-icon-type"]) {
          node.properties["data-link-icon-type"] = rule.type;
        }

        break;
      }
    });
  };
}
