import { Link, useLocation } from "react-router-dom";
import logo from "../assets/a.jpg";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) =>
    location.pathname === path
      ? "bg-white text-purple-800 px-4 py-1 rounded-full"
      : "text-white hover:text-gray-300";

  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-purple-600">

      <Link to="/">
        <img src={logo} alt="Logo" className="w-12" />
      </Link>

      <div className="flex gap-6 items-center text-white">

        <Link to="/" className={linkStyle("/")}>HOME</Link>
        <Link to="/about" className={linkStyle("/about")}>ABOUT</Link>
        <Link to="/articles" className={linkStyle("/articles")}>ARTICLES</Link>
        <Link to="/signin" className={linkStyle("/signin")}>LogIn/SignUp</Link>

      </div>
    </nav>
  );
};

export default Navbar;