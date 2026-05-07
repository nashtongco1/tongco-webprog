import ArticleList from "../../components/ArticleList";
import articles from "../../data/article-content";

const ArticleListPage = () => {
  return (
    <div className="px-10 py-10">
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;