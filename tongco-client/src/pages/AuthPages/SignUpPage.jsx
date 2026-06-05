import { useState } from "react";
import bgImage from "../../assets/lcover.jpg";
import bgImage2 from "../../assets/lc.jpg";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/UserService";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    contactNumber: "",
    gender: "Male",
    email: "",
    password: "",
    address: "N/A",
    type: "editor",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (formData.password.length < 8) {
      newErrors.password = "Password minimum 8 characters";
    }

    if (!/^\d{11}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact must be 11 digits";
    }

    if (isNaN(formData.age)) {
      newErrors.age = "Age must be numbers only";
    }

    if (formData.username.includes(" ")) {
      newErrors.username = "No spaces allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      await createUser(formData);

      alert("Registration successful!");
      navigate("/signin");
    } catch (error) {
      console.log(error.response?.data || error);
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  const inputStyle =
    "w-full border border-white/40 p-3 rounded-xl text-black bg-white/75 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition";

  const errorStyle = "text-red-500 text-xs min-h-[14px] -mt-3";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      <div
        className="w-full md:w-1/2 relative flex flex-col justify-center items-center p-6 md:p-10 min-h-screen bg-cover bg-top"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/15"></div>

        <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-[430px] border border-white/30">
          <h1 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">
            Create Account
          </h1>

          {message && (
            <p className="text-red-200 text-sm text-center mb-4 font-medium bg-red-500/40 rounded-lg py-2 px-3">
              {message}
            </p>
          )}

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={inputStyle}
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={inputStyle}
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              className={inputStyle}
              value={formData.username}
              onChange={handleChange}
              required
            />
            <p className={errorStyle}>{errors.username}</p>

            <input
              type="text"
              name="age"
              placeholder="Age"
              className={inputStyle}
              value={formData.age}
              onChange={handleChange}
              required
            />
            <p className={errorStyle}>{errors.age}</p>

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              className={inputStyle}
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <p className={errorStyle}>{errors.contactNumber}</p>

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
            <p className={errorStyle}>{errors.password}</p>

            <button className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 active:scale-95 transition font-semibold shadow-lg">
              SIGN UP
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
            Welcome Back!
          </h1>

          <p className="mb-6 text-sm text-gray-100">
            To keep connected, please login with your personal info
          </p>

          <Link to="/signin">
            <button className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-black transition font-semibold">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;