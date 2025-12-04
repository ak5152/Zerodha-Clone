import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.withCredentials = true;

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // 🌐 FRONTEND URLS
  const FRONTEND_PROD = "https://zerodha-clone-zabe.vercel.app";
  const FRONTEND_LOCAL = "http://localhost:3000";

  // When user is NOT logged in → redirect here:
  const LOGIN_URL =
    window.location.hostname === "localhost"
      ? `${FRONTEND_LOCAL}/login`
      : `${FRONTEND_PROD}/login`;

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const res = await axios.post(
          "https://zerodha-clone-we1s.onrender.com/verify",
          {}
        );

        if (!res.data.status) {
          window.location.href = LOGIN_URL;  // ⭐ Correct redirect
          return;
        }

        setUsername(res.data.user.username); // ⭐ Correct user name
        toast(`Hello ${res.data.user.username}`, {
          position: "top-right",
        });

      } catch (err) {
        window.location.href = LOGIN_URL;  // ⭐ Safe fallback
      }
    };

    verifyCookie();
  }, []);

  const Logout = async () => {
    try {
      await axios.post("https://zerodha-clone-we1s.onrender.com/logout");
    } catch (err) {
      console.log("Logout error", err);
    }
    window.location.href = LOGIN_URL;
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
