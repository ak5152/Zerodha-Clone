import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Home from "./components/Home";

const AppWrapper = () => {
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    axios
      .post(
        "https://zerodha-clone-we1s.onrender.com/verify",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status) {
          setVerified(true);
        } else {
          window.location.href =
            "https://zerodha-clone-g3rs.vercel.app/login";
        }
      })
      .catch(() => {
        window.location.href =
          "https://zerodha-clone-g3rs.vercel.app/login";
      });
  }, []);

  if (verified === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
