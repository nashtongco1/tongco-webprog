import { useState } from "react";
import bgImage from "../../assets/lcover.jpg";
import bgImage2 from "../../assets/lc.jpg";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserService";

const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await loginUser(formData);

      // SAVE LOGIN DATA
      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "type",
        response.data.user.type
      );

      alert("Login successful!");

      // ADMIN GOES TO USERS PAGE
      if (response.data.user.type === "admin") {
        navigate("/dashboard/users");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error.response?.data || error);

      setMessage(
        error.response?.data?.message || "Login failed."
      );
    }
  };

  const inputStyle =
    "w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-purple-400 transition";

  return (
    <div className="min-h-screen flex">

      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white/90 p-8 rounded-xl shadow-lg w-80">

          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Sign In
          </h1>

          {message && (
            <p className="text-red-500 text-sm text-center mb-3">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className={inputStyle}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className={inputStyle}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 active:scale-95 transition font-semibold">
              SIGN IN
            </button>

          </form>

        </div>
      </div>

      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        <div className="bg-black/40 p-10 rounded-xl text-center max-w-sm">

          <h1 className="text-3xl font-bold mb-4">
            New Here?
          </h1>

          <p className="mb-6 text-sm text-gray-200">
            Create an account and start managing users
          </p>

          <Link to="/signup">
            <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
              SIGN UP
            </button>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default SignInPage;