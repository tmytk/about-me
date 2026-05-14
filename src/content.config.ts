import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const memoSchema = z.object({
    title: z.string(),
    date: z.coerce.date(),
});

const markdownCollection = (directory: string) =>
    defineCollection({
        loader: glob({
            pattern: "**/*.md",
            base: `./src/content/${directory}`,
        }),
        schema: memoSchema,
    });

export const collections = {
    works: markdownCollection("works"),
    notes: markdownCollection("notes"),
    music: markdownCollection("music"),
};
