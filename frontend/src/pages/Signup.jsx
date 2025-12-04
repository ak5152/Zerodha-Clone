import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.withCredentials = true;

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      return toast.error("All fields are required");
    }

    // ⭐ Show immediate processing toast
    const id = toast.loading("Creating your account...");

    try {
      const { data } = await axios.post(
        "https://zerodha-clone-we1s.onrender.com/signup",
        inputValue
      );

      console.log("Signup response:", data);

      const { status, message } = data;

      if (status) {
        // ⭐ Replace loading toast with success
        toast.update(id, {
          render: "Signup successful!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        setTimeout(() => {
          window.location.href =
            "https://zerodha-clone-zabe.vercel.app/login";
        }, 1500);
      } else {
        toast.update(id, {
          render: message || "Signup failed",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Server error",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }

    setInputValue({ email: "", password: "", username: "" });
  };

  return (
    <div className="form_container" style={{ marginTop: "40px" }}>
      <h2>Signup Account</h2>

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
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
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
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
