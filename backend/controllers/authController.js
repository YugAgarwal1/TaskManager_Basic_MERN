const bcrypt = require("bcrypt");
const User = require("../model/User");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Required fields missing" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json({
      message: "User registered",
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: "Wrong password" });
    }
    req.session.userId = user._id;
    res.status(200).json({
      message: "Login successful",
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
  });
};

exports.checkAuth = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ isAuth: false });
    }
    const user = await User.findById(req.session.userId).select("-password");
    res.status(200).json({
      isAuth: true,
      user
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};