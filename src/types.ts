// types.ts
export type NewsItem = {
    id: number;
    attributes: {
        title: string;
        description: string;
        content: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        hero_image: {
            data: {
                attributes: {
                    formats: {
                        large: { url: string };
                        small: { url: string };
                        medium: { url: string };
                        thumbnail: { url: string };
                    };
                };
            };
        };
    };
};

export type Category = {
    id: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};

export type NewsApiResponse = {
    data: NewsItem[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export type CategoryApiResponse = {
    data: Category[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};
