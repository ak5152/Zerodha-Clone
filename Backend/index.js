require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const authRoute = require("./Routes/AuthRoute");
const holdingsRoute = require("./Routes/HoldingsRoute");

const app = express();

// ✅ FIXED CORS -- THIS MUST BE INSIDE app.use(cors(...))
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://zerodha-clone-zabe.vercel.app",  // Landing UI
      "https://zerodha-clone-g3rs.vercel.app",  // Dashboard UI
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ROUTES
app.use("/", authRoute);
app.use("/", holdingsRoute);

// DATABASE
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// PORT
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
