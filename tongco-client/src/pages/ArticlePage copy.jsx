import { useParams, useNavigate } from "react-router-dom";
import articles from "../assets/article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const article = articles.find((a) => a.name === name);

  if (!article) return <NotFoundPage />;

  return (
    <div className="px-10 py-10 max-w-3xl mx-auto space-y-6 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-0 -ml-20 text-xs bg-white text-black px-2 py-1 rounded-md hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800">
        {article.title}
      </h1>

      {/* IMAGE */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-auto max-h-[500px] object-contain rounded-xl"
      />

      {/* CONTENT */}
      {article.content.map((paragraph, index) => (
        <p key={index} className="text-gray-600 leading-relaxed">
          {paragraph}
        </p>
      ))}

    </div>
  );
};

export default ArticlePage;