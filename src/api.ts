import { z } from 'zod';

import type { NewsItem, Category } from './types';

const API_URL = import.meta.env.API_URL;

// Esquema de las noticias
const newsItemSchema = z.object({
    id: z.number(),
    attributes: z.object({
        title: z.string(),
        description: z.string(),
        content: z.string(),
        slug: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        publishedAt: z.string(),
        hero_image: z.object({
            data: z.object({
                attributes: z.object({
                    formats: z.object({
                        small: z.object({
                            url: z.string(),
                        }),
                        medium: z.object({
                            url: z.string(),
                        }),
                        large: z.object({
                            url: z.string(),
                        }),
                        thumbnail: z.object({
                            url: z.string(),
                        }),
                    }),
                }),
            }),
        }),
    }),
});

// Esquema para la respuesta de la lista de noticias
const newsSchema = z.object({
    data: z.array(newsItemSchema),
    meta: z.object({
        pagination: z.object({
            page: z.number(),
            pageSize: z.number(),
            pageCount: z.number(),
            total: z.number(),
        }),
    }),
});

// Esquema para las categorías
const categoryItemSchema = z.object({
    id: z.number(),
    attributes: z.object({
        name: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
        publishedAt: z.string(),
    }),
});

const categorySchema = z.object({
    data: z.array(categoryItemSchema),
    meta: z.object({
        pagination: z.object({
            page: z.number(),
            pageSize: z.number(),
            pageCount: z.number(),
            total: z.number(),
        }),
    }),
});

const api = {
    // Método para obtener las noticias
    getNews: async (): Promise<NewsItem[]> => {
        try {
            const response = await fetch(`${API_URL}/api/news?populate=hero_image`);
            if (!response.ok) {
                throw new Error(`Failed to fetch news: ${response.statusText}`);
            }
            const data = await response.json();
            const parsedData = newsSchema.parse(data);

            return parsedData.data.map(item => ({
                id: item.id,
                attributes: {
                    title: item.attributes.title,
                    description: item.attributes.description,
                    content: item.attributes.content,
                    slug: item.attributes.slug,
                    createdAt: item.attributes.createdAt,
                    updatedAt: item.attributes.updatedAt,
                    publishedAt: item.attributes.publishedAt,
                    hero_image: {
                        data: {
                            attributes: {
                                formats: {
                                    small: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.small.url}` },
                                    medium: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.medium.url}` },
                                    large: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.large.url}` },
                                    thumbnail: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.thumbnail.url}` },
                                },
                            },
                        },
                    },
                },
            }));
        } catch (error) {
            console.error('Error al obtener las noticias:', error);
            throw new Error('Error al obtener las noticias');
        }
    },
    getRecentNews: async (): Promise<NewsItem[]> => {
        try {
            const response = await fetch(`${API_URL}/api/news?sort=publishedAt:desc&pagination[pageSize]=12&pagination[page]=1&populate=hero_image`);
            if (!response.ok) {
                throw new Error(`Failed to fetch news: ${response.statusText}`);
            }
            const data = await response.json();
            const parsedData = newsSchema.parse(data);

            return parsedData.data.map(item => ({
                id: item.id,
                attributes: {
                    title: item.attributes.title,
                    description: item.attributes.description,
                    content: item.attributes.content,
                    slug: item.attributes.slug,
                    createdAt: item.attributes.createdAt,
                    updatedAt: item.attributes.updatedAt,
                    publishedAt: item.attributes.publishedAt,
                    hero_image: {
                        data: {
                            attributes: {
                                formats: {
                                    small: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.small.url}` },
                                    medium: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.medium.url}` },
                                    large: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.large.url}` },
                                    thumbnail: { url: `${API_URL}${item.attributes.hero_image.data.attributes.formats.thumbnail.url}` },
                                },
                            },
                        },
                    },
                },
            }));
        } catch (error) {
            console.error('Error al obtener las noticias:', error);
            throw new Error('Error al obtener las noticias');
        }
    },

    getNewsBySlug: async (slug: string): Promise<NewsItem | null> => {
        try {
          const response = await fetch(`${API_URL}/api/news?filters[slug][$eq]=${slug}&populate=hero_image`);
          if (!response.ok) {
            throw new Error(`Failed to fetch news item with slug: ${slug}`);
          }
          const data = await response.json();
          const parsedData = newsSchema.parse(data);
          return parsedData.data.length ? parsedData.data[0] : null;
        } catch (error) {
          console.error('Error al obtener la noticia por slug:', error);
          return null;
        }
      },

    // Método para obtener las categorías
    getCategories: async (): Promise<Category[]> => {
        try {
            const response = await fetch(`${API_URL}/api/categories`);
            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.statusText}`);
            }
            const data = await response.json();
            const parsedData = categorySchema.parse(data);

            return parsedData.data.map(item => ({
                id: item.id,
                attributes: item.attributes,
            }));
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
            throw new Error('Error al obtener las categorías');
        }
    }
};

export default api;
