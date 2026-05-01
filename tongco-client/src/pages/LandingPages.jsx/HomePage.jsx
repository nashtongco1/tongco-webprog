import { Link } from "react-router-dom";
import bron from "../../assets/bron.jpg";
import x from "../../assets/x.jpg";
import y from "../../assets/y.jpg";
import z from "../../assets/z.jpg";

const HomePage = () => {
  return (
    <div className="px-10 py-8 space-y-10">
      <div className="grid md:grid-cols-2 gap-6 items-center border p-6 rounded-lg bg-purple-600">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to the Kingdom
          </h1>
          <p className="text-gray-200 mb-4">
            Witness greatness of a champion ship-caliber layout, featuring a dominant hero section, triple-double statistics and All-Star Feature cards.
          </p>
        </div>
        
        <img src={bron} alt="GOAT" className="rounded-lg" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["GOAT", "HISTORY MAKER", "KING", "LEGEND"].map((item, i) => (
          <div key={i} className="border p-4 rounded-lg text-center bg-xx font-bold">
            {item}
          </div>
        ))}
      </div>purples
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-purple-600">Highlight Moments</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/"><img src={x} className="rounded-lg" /></Link>
          <Link to="/"><img src={y} className="rounded-lg" /></Link>
          <Link to="/"><img src={z} className="rounded-lg" /></Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;