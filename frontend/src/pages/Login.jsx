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
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dynamic dashboard route
    const DASHBOARD_PROD = "https://zerodha-clone-g3rs.vercel.app";
    const DASHBOARD_LOCAL = "http://localhost:3001";

    const DASHBOARD_URL =
      window.location.hostname === "localhost"
        ? DASHBOARD_LOCAL
        : DASHBOARD_PROD;

    // ⭐ INSTANT FEEDBACK
    const id = toast.loading("Logging in...");

    try {
      const { data } = await axios.post(
        "https://zerodha-clone-we1s.onrender.com/login",
        inputValue
      );

      console.log("Login response:", data);

      const { status, message } = data;

      if (status) {
        // ⭐ Replace loading toast with success
        toast.update(id, {
          render: "Login successful!",
          type: "success",
          isLoading: false,
          autoClose: 1200,
        });

        setTimeout(() => {
          window.location.href = DASHBOARD_URL;
        }, 1200);
      } else {
        toast.update(id, {
          render: message || "Invalid email or password",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: "Server error",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
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
