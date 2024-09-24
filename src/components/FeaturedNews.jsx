import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard";
import fetchApi from "@/lib/strapi.ts";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const recentNews = await fetchApi({
          endpoint: "/news?sort=publishedAt:desc&pagination[pageSize]=3&pagination[page]=1&populate=hero_image&populate=category",
          wrappedByKey: "data",
        });
        setNews(recentNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  if (!news.length) {
    return null;
  }

  return (
    <>
      {news.map((item) => (
        <NewsCard
          key={item.id}
          image={
            item.attributes.hero_image?.data?.attributes?.formats?.large?.url ??
            item.attributes.hero_image?.data?.attributes?.formats?.medium?.url ??
            item.attributes.hero_image?.data?.attributes?.formats?.small?.url ??
            item.attributes.hero_image?.data?.attributes?.formats?.thumbnail?.url ??
            "/image-not-found.png"
          }
          title={item.attributes.title}
          description={item.attributes.description}
          href={`/news/${item.attributes.slug}`}
          category={item.attributes.category.data.attributes.name}
        />
      ))}
    </>
  );
};

export default NewsList;
