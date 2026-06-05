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
      const user = response.data.user;

      if (user.type === "viewer") {
        setMessage("Viewers are not allowed to log in.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("type", user.type);

      alert("Login successful!");

      if (user.type === "admin") {
        navigate("/dashboard/users");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response?.data || error);
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  const inputStyle =
    "w-full border border-white/40 p-3 rounded-xl text-black bg-white/75 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      <div
        className="w-full md:w-1/2 relative flex flex-col justify-center items-center p-6 md:p-10 min-h-screen bg-cover bg-top"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/15"></div>

        <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-[420px] border border-white/30">
          <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
            Sign In
          </h1>

          {message && (
            <p className="text-red-200 text-sm text-center mb-4 font-medium bg-red-500/40 rounded-lg py-2 px-3">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

            <button className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 active:scale-95 transition font-semibold shadow-lg">
              SIGN IN
            </button>
          </form>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 relative flex flex-col justify-center items-center p-6 md:p-10 min-h-screen bg-cover bg-top text-white"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative bg-black/45 backdrop-blur-sm p-10 rounded-3xl text-center w-full max-w-[420px] shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold mb-4 text-white">
            New Here?
          </h1>

          <p className="mb-6 text-sm text-gray-100">
            Create an account and start managing users
          </p>

          <Link to="/signup">
            <button className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-black transition font-semibold">
              SIGN UP
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;