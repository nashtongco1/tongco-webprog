import { Link } from "react-router-dom";
import assets from "../assets/Le.png";

const NotFoundPage = () => {
  return (
    <div className="relative h-screen w-full">

      <img
        src={assets}
        alt="Not Found"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="border px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition bg-white/80 text-black"
        >
          Go Home
        </Link>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="text-lg mt-2">You're not supposed to be here man</p>
      </div>

    </div>
  );
};

export default NotFoundPage;