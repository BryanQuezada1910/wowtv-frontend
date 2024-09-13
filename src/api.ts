import {z} from "astro:content";

const API_URL = import.meta.env.API_URL;

console.log(API_URL);

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

class Api {
    async getNews() {
        try {
            const response = await fetch(`${API_URL}/api/news`);
            if (!response.ok) {
                throw new Error(`Failed to fetch news: ${response.statusText}`);
            }
            const data = await response.json();
            return newsSchema.parse(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCategories() {
        try {
            const response = await fetch(`${API_URL}/api/categories`);
            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.statusText}`);
            }
            const data = await response.json();
            return categorySchema.parse(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new Api();