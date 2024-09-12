import z from "astro:content";

const newsSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    image: z.string(),
    slug: z.string(),
    category_id: z.number(),
});

const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
});