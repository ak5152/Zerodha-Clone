import React from "react";
import "./Universe.css"; // <-- add this line

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="/media/smallcaseLogo.png" className="partner-img" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/media/streakLogo.png" className="partner-img" />
          <p className="text-small text-muted">Algo & Strategy Platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/media/sensibullLogo.svg" className="partner-img" />
          <p className="text-small text-muted">Options Trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/media/zerodhaFundhouse.png" className="partner-img" />
          <p className="text-small text-muted">Asset Management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/media/goldenpiLogo.png" className="partner-img" />
          <p className="text-small text-muted">Bonds Trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="/media/dittoLogo.png" className="partner-img" />
          <p className="text-small text-muted">Insurance</p>
        </div>

        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
