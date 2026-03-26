import rook from "../assets/rook.jpg";
import la from "../assets/la.jpg";
import James from "../assets/James.jpg";

const ArticlePage = () => {
  return (
    <div className="image-center p-10 space-y-6">
      <h1 className="text-2xl font-bold">Articles</h1>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="border p-4 rounded-lg w-fit">
          <img src={rook} alt="Rook" className="w-80 h-auto mb-2 rounded" />
          <h2 className="font-bold text-purple-600"> Rookie Bron </h2>
          <p className="text-sm text-gray-600">
            A high-flying, "prep-to-pro" sensation burdened with the title of "The Chosen One
          </p>
        </div>


        <div className="border p-4 rounded-lg w-fit">
          <img src={la} alt="la" className="w-80 h-auto mb-2 rounded" />
          <h2 className="font-semibold">LaBron</h2>
          <p className="text-sm text-gray-600">
            The "Elder Statesman" and mentor who reinvented himself as a primary playmaker in Hollywood.          </p>
        </div>

        <div className="border p-4 rounded-lg w-fit">
          <img src={James} alt="James" className="w-80 h-auto mb-2 rounded" />
          <h2 className="font-semibold">LeThanos</h2>
          <p className="text-sm text-gray-600">
            A one-man army at the absolute peak of his basketball IQ and physical durability.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ArticlePage;