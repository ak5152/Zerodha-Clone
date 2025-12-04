const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../Utils/SecretToken");
const bcrypt = require("bcryptjs");

// SIGNUP
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    if (!email || !password || !username) {
      return res.json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username, createdAt });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 86400000,
});

    res.status(201).json({
      status: true,
      user: user.username
    });

  } catch (error) {
    console.error(error);
  }
};


// LOGIN
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "Incorrect password or email" });

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return res.json({ message: "Incorrect password or email" });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 86400000,
});


    res.status(201).json({
      status: true,
      user: user.username
    });

  } catch (error) {
    console.error(error);
  }
};


// USER VERIFICATION
module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json({ status: false });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.json({ status: false });

      const user = await User.findById(decoded.id).select("username");
      if (!user) return res.json({ status: false });

      return res.json({
        status: true,
        user: user.username
      });
    });

  } catch (error) {
    console.log(error);
    return res.json({ status: false });
  }
};
