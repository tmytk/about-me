import { defineCollection, z } from "astro:content";

const baseSchema = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
    }),
});

export const collections = {
    works: baseSchema,
    notes: baseSchema,
    music: baseSchema,
};
