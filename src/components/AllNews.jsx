import { useEffect, useState } from "react";
import NewsCard from "@/components/NewsCard";
import fetchApi from "@/lib/strapi.ts";
import ReactLoader from "@/components/ReactLoader";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const news = await fetchApi({
          endpoint:
            "/news?populate=hero_image&sort=publishedAt:desc&populate=category",
          wrappedByKey: "data",
        });
        setNews(news);
      } catch (error) {
        setError("Hubo un error al cargar las noticias");
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <ReactLoader />;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (!loading && !news.length) {
    return (
      <div>
        <p>No hay noticias para mostrar...</p>
      </div>
    );
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
