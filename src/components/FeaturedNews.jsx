import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard";
import api from "@/api";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const recentNews = await api.getRecentNews();
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
        />
      ))}
    </>
  );
};

export default NewsList;
