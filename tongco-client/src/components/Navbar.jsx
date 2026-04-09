import { Link, useLocation } from "react-router-dom";
import logo from "../assets/a.jpg";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "bg-white text-purple-800 px-4 py-1 rounded-full"  // active link: white bg on purple
      : "text-white hover:text-gray-300";                  // inactive links on purple

  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b bg-purple-600">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-12 h-auto" />
      </Link>

      <div className="flex gap-6 text-sm font-medium items-center">
        <Link to="/" className={linkStyle("/")}>
          HOME
        </Link>
        <Link to="/about" className={linkStyle("/about")}>
          ABOUT
        </Link>
        <Link to="/articles" className={linkStyle("/articles")}>
          ARTICLES
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;