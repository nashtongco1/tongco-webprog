import { Link } from "react-router-dom";
import bron from "../assets/bron.jpg";
import x from "../assets/x.jpg";
import y from "../assets/y.jpg";
import z from "../assets/z.jpg";


const HomePage = () => {
  return (
    <div className="px-10 py-8 space-y-10">

      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-6 items-center border p-6 rounded-lg">
        
        {/* LEFT */}
        <div>

          <h1 className="text-3xl font-bold mb-3">
            Welcome to the Kingdom 
          </h1>

          <p className="text-gray-600 mb-4">
            Witness the greatness of a championship-caliber layout, featuring a dominant hero section, triple-double statistics, and All-Star feature cards.
          </p>
        </div>

        {/* RIGHT IMAGE PLACEHOLDER */}
       <Link to="/">
        <img src={bron} alt="GOAT" className="w-full h-auto" />
      </Link>
              </div>


      {/* KPI SECTION */}
      <div className="space-y-4">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border p-4 rounded-lg bg-yellow-300">
            <p className="text-xs text-black 500 font-bold">GOAT</p>
          </div>

          <div className="border p-4 rounded-lg bg-yellow-300">
            <p className="text-xs text-black 500 font-bold">HISTORY MAKER</p>
          </div>

          <div className="border p-4 rounded-lg bg-yellow-300">
            <p className="text-xs text-black 500 font-bold">KING</p>
          </div>

          <div className="border p-4 rounded-lg bg-yellow-300">
            <p className="text-xs text-black 500 font-bold">LEGEND</p>  
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="space-y-4">

        <h2 className="text-lg font-bold text-purple-600">
          Simple wireframe cards
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          
          <Link to="/">
        <img src={x} alt="x" className="w-full h-auto" />
      </Link>
      <Link to="/">
        <img src={y} alt="y" className="w-full h-auto" />
      </Link>
      <Link to="/">
        <img src={z} alt="z" className="w-full h-auto" />
      </Link>

        </div>
      </div>
    </div>
  );
};

export default HomePage;