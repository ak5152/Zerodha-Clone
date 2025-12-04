import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;  // ⭐ CRITICAL FIX

import "./index.css";
import Dashboard from "./components/Dashboard";

const AppWrapper = () => {
  const [verified, setVerified] = useState(null);

  const FRONTEND_PROD = "https://zerodha-clone-zabe.vercel.app";
  const FRONTEND_LOCAL = "http://localhost:3000";

  const LOGIN_URL =
    window.location.hostname === "localhost"
      ? `${FRONTEND_LOCAL}/login`
      : `${FRONTEND_PROD}/login`;

  useEffect(() => {
    axios
      .post(
        "https://zerodha-clone-we1s.onrender.com/verify",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status) setVerified(true);
        else window.location.href = LOGIN_URL;
      })
      .catch(() => {
        window.location.href = LOGIN_URL;
      });
  }, []);

  if (verified === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
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
