import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.withCredentials = true;

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🌐 URLs for dashboard
    const DASHBOARD_PROD = "https://zerodha-clone-g3rs.vercel.app";
    const DASHBOARD_LOCAL = "http://localhost:3001"; // dashboard runs on next port after 3000

    const DASHBOARD_URL =
      window.location.hostname === "localhost"
        ? DASHBOARD_LOCAL
        : DASHBOARD_PROD;

    try {
      const { data } = await axios.post(
        "https://zerodha-clone-we1s.onrender.com/login",
        inputValue
      );

      console.log(data);

      const { status, message } = data;

      if (status) {
        handleSuccess("Login successful!");

        setTimeout(() => {
          window.location.href = DASHBOARD_URL; // ⭐ correct dynamic redirect
        }, 1000);

      } else {
        handleError(message || "Login failed");
      }

    } catch (error) {
      console.log(error);
      handleError("Server error");
    }

    setInputValue({ email: "", password: "" });
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>

        <button type="submit">Submit</button>

        <span>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
