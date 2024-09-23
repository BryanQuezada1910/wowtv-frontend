import { z } from 'zod';
import type { NewsItem, Category } from './types';

const API_URL = import.meta.env.PUBLIC_API_URL;

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
                    small: z.object({ url: z.string() }).optional(),
                    medium: z.object({ url: z.string() }).optional(),
                    large: z.object({ url: z.string() }).optional(),
                    thumbnail: z.object({ url: z.string() }).optional(),
                  })
                  .optional(),
              })
              .optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});

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
  // Method to get news
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
          hero_image: item.attributes.hero_image?.data
            ? {
                data: {
                  attributes: {
                    formats: {
                      small: item.attributes.hero_image.data.attributes?.formats?.small
                        ? { url: item.attributes.hero_image.data.attributes.formats.small.url }
                        : undefined,
                      medium: item.attributes.hero_image.data.attributes?.formats?.medium
                        ? { url: item.attributes.hero_image.data.attributes.formats.medium.url }
                        : undefined,
                      large: item.attributes.hero_image.data.attributes?.formats?.large
                        ? { url: item.attributes.hero_image.data.attributes.formats.large.url }
                        : undefined,
                      thumbnail: item.attributes.hero_image.data.attributes?.formats?.thumbnail
                        ? { url: item.attributes.hero_image.data.attributes.formats.thumbnail.url }
                        : undefined,
                    },
                  },
                },
              }
            : undefined,
        },
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Error fetching news');
    }
  },

  // Method to get recent news
  getRecentNews: async (): Promise<NewsItem[]> => {
    try {
      const response = await fetch(`${API_URL}/api/news?sort=publishedAt:desc&pagination[pageSize]=3&pagination[page]=1&populate=hero_image`);
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
          hero_image: item.attributes.hero_image?.data
            ? {
                data: {
                  attributes: {
                    formats: {
                      small: item.attributes.hero_image.data.attributes?.formats?.small
                        ? { url: item.attributes.hero_image.data.attributes.formats.small.url }
                        : undefined,
                      medium: item.attributes.hero_image.data.attributes?.formats?.medium
                        ? { url: item.attributes.hero_image.data.attributes.formats.medium.url }
                        : undefined,
                      large: item.attributes.hero_image.data.attributes?.formats?.large
                        ? { url: item.attributes.hero_image.data.attributes.formats.large.url }
                        : undefined,
                      thumbnail: item.attributes.hero_image.data.attributes?.formats?.thumbnail
                        ? { url: item.attributes.hero_image.data.attributes.formats.thumbnail.url }
                        : undefined,
                    },
                  },
                },
              }
            : undefined,
        },
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Error fetching news');
    }
  },

  // Mehotd to get news by slug
  getNewsBySlug: async (slug: string): Promise<NewsItem | undefined> => {
    try {
      const response = await fetch(`${API_URL}/api/news?filters[slug][$eq]=${slug}&populate=hero_image`);
      if (!response.ok) {
        throw new Error(`Failed to fetch news item with slug: ${slug}`);
      }
      const data = await response.json();
      const parsedData = newsSchema.parse(data);
      return parsedData.data.length ? parsedData.data[0] : undefined;
    } catch (error) {
      console.error('Error fetching news by slug:', error);
      return undefined;
    }
  },

  // Method to get categories
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
      console.error('Error fetching categories:', error);
      throw new Error('Error fetching categories');
    }
  },
};

export default api;
