import bgImage from "../../assets/lcover.jpg";
import bgImage2 from "../../assets/lc.jpg";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex">

      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-2xl mb-4">Create Account</h1>

        <div className="flex gap-3 mb-4">
          <span className="border px-3 py-1 bg-[#1877F2] text-white rounded">f</span>
          <span className="border px-3 py-1 bg-[#DB4437] text-white rounded">Gmail</span>
        </div>

        <p className="font-bold text-black text-lg mb-4">
          Or use your email for registration
        </p>

        <form className="flex flex-col gap-3 w-64" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Name"
            className="w-full border border-black text-black placeholder-black p-2 mb-3 font-bold"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-black text-black placeholder-black p-2 mb-3 font-bold"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-black text-black placeholder-black p-2 mb-3 font-bold"
          />

          <button className="bg-purple-500 text-white py-2">
            SIGN UP
          </button>

        </form>

      </div>

      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        <h1 className="text-2xl mb-4">Welcome Back!</h1>

        <p className="font-bold text-center mb-6">
          To keep connected, please login with your personal info
        </p>

        <Link to="/signin">
          <button className="border px-6 py-2 rounded bg-purple-500 text-white">
            SIGN IN
          </button>
        </Link>
      </div>

    </div>
  );
};

export default SignUpPage;