import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

const API_URL = "http://localhost:8000/api/articles";

const ArticlePage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load article");
        }

        const foundArticle = data.find((item) => item.slug === name);

        if (!foundArticle) {
          setNotFound(true);
          return;
        }

        setArticle({
          name: foundArticle.slug,
          title: foundArticle.title,
          image: foundArticle.image || "",
          description: foundArticle.description || "",
          content:
            foundArticle.content && foundArticle.content.length > 0
              ? foundArticle.content
              : [foundArticle.description],
        });
      } catch (error) {
        console.error("Failed to load article:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [name]);

  if (loading) {
    return (
      <div className="px-10 py-10 max-w-3xl mx-auto">
        <p className="text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (notFound || !article) return <NotFoundPage />;

  return (
    <div className="px-10 py-10 max-w-3xl mx-auto space-y-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-0 -ml-20 text-xs bg-white text-black px-2 py-1 rounded-md hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-auto max-h-[500px] object-contain rounded-xl"
        />
      )}

      {article.content.map((paragraph, index) => (
        <p key={index} className="text-gray-600 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default ArticlePage;