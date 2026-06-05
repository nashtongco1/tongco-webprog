import { useEffect, useState } from "react";
import ArticleList from "../../components/ArticleList";

const API_URL = "https://tongco-server.onrender.com/api/articles";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  const loadArticles = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const formattedArticles = data.map((article) => ({
        name: article.slug,
        title: article.title,
        description: article.description,
        image: article.image,
        content: article.content || [],
      }));

      setArticles(formattedArticles);
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="px-10 py-10">
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;