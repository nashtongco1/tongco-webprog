import { useState } from "react";
import bgImage from "../../assets/lcover.jpg";
import bgImage2 from "../../assets/lc.jpg";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    age: "",
    contact: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!/^\d{11}$/.test(formData.contact)) {
      newErrors.contact =
        "Contact number must be exactly 11 digits";
    }

    if (isNaN(formData.age)) {
      newErrors.age = "Age must be a number";
    }

    if (formData.username.includes(" ")) {
      newErrors.username =
        "Username must not contain spaces";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen flex">

      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="text-2xl mb-4">Create Account</h1>

        <form className="flex flex-col gap-3 w-72" onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border p-2 text-black"
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.username}</p>

          <input
            type="text"
            name="age"
            placeholder="Age"
            className="border p-2 text-black"
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.age}</p>

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            className="border p-2 text-black"
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.contact}</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 text-black"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 text-black"
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.password}</p>

          <button className="bg-purple-500 text-white py-2 rounded">
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