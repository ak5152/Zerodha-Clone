const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({ status: false });
      }

      const user = await User.findById(decoded.id).select("username");

      if (!user) {
        return res.json({ status: false });
      }

      return res.json({
        status: true,
        user: user.username
      });
    });

  } catch (err) {
    console.log(err);
    return res.json({ status: false });
  }
};
