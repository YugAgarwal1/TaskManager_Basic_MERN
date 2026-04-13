const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET || "secretkey",
  resave: false,
  saveUninitialized: false
}));
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes")
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});