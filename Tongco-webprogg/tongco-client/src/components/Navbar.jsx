import { Link } from "react-router-dom";
import logo from "../assets/a.jpg"; 

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b bg-purple-500">
      
      {/* LOGO */}
      <Link to="/"> 
        <img src={logo} alt="Logo" className="w-12 h-auto" />
      </Link>

      {/* MENU */}
      <div className="flex gap-6 text-sm font-medium">
        <Link to="/" className="bg-black text-white px-4 py-1 rounded-full">
          HOME
        </Link>
        <Link to="/about" className="bg-black text-white px-4 py-1 rounded-full">
          ABOUT
        </Link>
        <Link to="/articles" className="bg-black text-white px-4 py-1 rounded-full">
          ARTICLES
        </Link> 
      </div>
    </nav>
  );
};

export default Navbar;
