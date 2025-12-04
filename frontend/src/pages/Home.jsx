import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.withCredentials = true; // VERY IMPORTANT

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const res = await axios.post(
          "https://zerodha-clone-we1s.onrender.com/verify",
          {}
        );

        if (!res.data.status) {
          return navigate("/login");
        }

        setUsername(res.data.user);
        toast(`Hello ${res.data.user}`, { position: "top-right" });

      } catch (err) {
        navigate("/login");
      }
    };

    verifyCookie();
  }, [navigate]);

  const Logout = async () => {
    await axios.post("https://zerodha-clone-we1s.onrender.com/logout", {});
    navigate("/login");
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
