import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const baseSchema = z.looseObject({
    layout: z.any().optional(),
    title: z.any().optional(),
    subtitle: z.any().optional(),
    description: z.any().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    last_modified_at: z.union([z.string(), z.date()]).optional(),
    image: z.any().optional(),
    caption: z.any().optional(),
    tags: z.any().optional(),
    redirect_from: z.any().optional(),
    permalink: z.any().optional(),
    icons: z.any().optional(),
    index: z.any().optional(),
    code: z.any().optional(),
    sitemap: z.any().optional(),
    published: z.any().optional(),
  });

const posts = defineCollection({
  loader: glob({ pattern: "_posts/*.md", base: "." }),
  schema: baseSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: "_pages/*.md", base: "." }),
  schema: baseSchema,
});

const workpages = defineCollection({
  loader: glob({ pattern: "_workpages/*.md", base: "." }),
  schema: baseSchema,
});

export const collections = {
  posts,
  pages,
  workpages,
};
