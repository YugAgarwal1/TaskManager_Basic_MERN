const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false
}));
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes")
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});