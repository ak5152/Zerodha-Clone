const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../Utils/SecretToken");
const bcrypt = require("bcryptjs");

// SIGNUP
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    if (!email || !password || !username) {
      return res.json({ status: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: false, message: "User already exists" });
    }

    // ⭐ FAST & SAFE PASSWORD HASHING
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      createdAt,
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 86400000,
    });

    return res.status(201).json({
      status: true,
      message: "Signup successful",
      user: user.username,
    });

  } catch (error) {
    console.error(error);
    return res.json({ status: false, message: "Server error" });
  }
};


// LOGIN
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ status: false, message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 86400000,
    });

    return res.status(200).json({
      status: true,
      message: "Login successful",
      user: user.username,
    });

  } catch (error) {
    console.error(error);
    return res.json({ status: false, message: "Server error" });
  }
};


// USER VERIFICATION
module.exports.userVerification = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json({ status: false });

    // ⭐ USE THE SAME SECRET USED IN createSecretToken
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) return res.json({ status: false });

      return res.json({
        status: true,
        user: decoded.id,
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false });
  }
};
