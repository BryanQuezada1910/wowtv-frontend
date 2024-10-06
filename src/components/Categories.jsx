import { useEffect, useState, useRef } from "react";
import fetchApi from "@/lib/strapi.ts";
import CategoriesLoader from "@/components/CategoriesLoader";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categories = await fetchApi({
          endpoint: "/categories",
          wrappedByKey: "data",
        });
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleOverflowCheck = () => {
      const nav = navRef.current;
      if (nav) {
        setIsOverflowing(nav.scrollWidth > nav.clientWidth);
        setAtEnd(nav.scrollWidth === nav.scrollLeft + nav.clientWidth);
      }
    };

    handleOverflowCheck();
    navRef.current?.addEventListener("scroll", handleOverflowCheck);
    window.addEventListener("resize", handleOverflowCheck);

    return () => {
      navRef.current?.removeEventListener("scroll", handleOverflowCheck);
      window.removeEventListener("resize", handleOverflowCheck);
    };
  }, [categories]);

  if (loading) {
    return <CategoriesLoader />;
  }

  if (!categories.length) {
    return null;
  }

  return (
    <div className="relative bg-base-300 mb-2">
      <nav ref={navRef} className="flex max-w-[1280px] mx-auto overflow-x-auto">
        <ul className="flex space-x-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="whitespace-nowrap font-bold text-primary cursor-pointer p-5"
            >
              {category.attributes.name}
            </li>
          ))}
        </ul>
      </nav>

      {isOverflowing && !atEnd && (
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 pointer-events-none bg-base-200 h-full w-8 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=""
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="m13.061 4.939-2.122 2.122L15.879 12l-4.94 4.939 2.122 2.122L20.121 12z"></path>
            <path d="M6.061 19.061 13.121 12l-7.06-7.061-2.122 2.122L8.879 12l-4.94 4.939z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Categories;
