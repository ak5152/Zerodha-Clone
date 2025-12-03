const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../Utils/SecretToken");
const bcrypt = require("bcryptjs");

// SIGNUP
module.exports.Signup = async (req, res, next) => {
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
        sameSite: "lax",
        secure: false, // true only in HTTPS
    });


    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user
    });

  } catch (error) {
    console.error(error);
  }
};


// LOGIN  
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, // true only in HTTPS
    });

    res.status(201).json({
      message: "User logged in successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
  }
};

// USER VERIFICATION
module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
      if (err) return res.json({ status: false });

      const user = await User.findById(decoded.id).select("-password"); 
      // 👆 this hides the password field

      if (!user) return res.json({ status: false });

      return res.json({ status: true, user });
    });

  } catch (error) {
    console.log(error);
    return res.json({ status: false });
  }
};
