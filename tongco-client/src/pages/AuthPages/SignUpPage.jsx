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
    type: "admin",
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
    "w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-purple-400 transition";

  const errorStyle = "text-red-500 text-sm mt-1 min-h-[18px]";

  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white/90 p-8 rounded-xl shadow-lg w-80">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h1>

          {message && (
            <p className="text-red-500 text-sm text-center mb-3">
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

            <button className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 active:scale-95 transition font-semibold">
              SIGN UP
            </button>
          </form>
        </div>
      </div>

      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        <div className="bg-black/40 p-10 rounded-xl text-center max-w-sm">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>

          <p className="mb-6 text-sm text-gray-200">
            To keep connected, please login with your personal info
          </p>

          <Link to="/signin">
            <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;