const Footer = () => {
  return (
    <footer className="border-t mt-16 py-8 bg-purple-600 text-center space-y-4 text-white">

      <p className="text-lg font-bold text-gray-700">
        "Four Careers, One King: The Evolution of Greatness."
      </p>

      <div className="flex justify-center gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-black">Facebook</a>
        <a href="#" className="hover:text-black">X</a>
        <a href="#" className="hover:text-black">Instagram</a>
      </div>

      <div className="text-lg font-semibold text-gray-300">
        <p>📞 0908-871-0543</p>
        <p>📧 LeBronatics@gmail.com</p>
      </div>

      <p className="text-xs text-gray-400">
        © 2026 Tongco WebProg
      </p>

    </footer>
  );
};

export default Footer;