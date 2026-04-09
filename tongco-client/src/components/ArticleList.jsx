import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => {
  return (
    <div className="space-y-8">

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-widest">
          Featured Articles of LeBron James
        </p>
        <h2 className="text-xl font-semibold">Article Card Grid</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {articles.map((article, index) => (
          <div
            key={article.name}
            className="border rounded-2xl p-4 bg-purple-600 text-white hover:bg-yellow-400 hover:text-black hover:shadow-2xl transition duration-300"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-40 w-full object-cover rounded-xl mb-4"
            />

            <p className="text-xs uppercase font-medium">
              Article {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="font-bold mt-1 mb-2">
              {article.title}
            </h3>

            <p className="text-sm mb-4">
              {article.description}
            </p>

            <Link
              to={`/articles/${article.name}`}
              className="inline-block border border-current px-4 py-1 rounded-full text-xs hover:bg-black hover:text-white transition"
            >
              READ MORE
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;