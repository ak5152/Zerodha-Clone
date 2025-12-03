import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Home from "./components/Home";

function AppWrapper() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(
      "https://zerodha-clone-we1s.onrender.com/verify",
      {},
      { withCredentials: true }
    )
    .then(res => {
      if (res.data.status) {
        setLoading(false); // show dashboard
      } else {
        window.location.href = "https://zerodha-clone-g3rs.vercel.app/login";
      }
    })
    .catch(() => {
      window.location.href = "https://zerodha-clone-g3rs.vercel.app/login";
    });
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
