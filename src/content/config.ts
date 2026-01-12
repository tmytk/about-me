import { defineCollection, z } from "astro:content";

const baseSchema = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
    }),
});

export const collections = {
    tech: baseSchema,
    random: baseSchema,
    music: baseSchema,
};
