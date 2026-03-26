const Button = ({ text }) => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
      {text}
    </button>
  );
};

export default Button;