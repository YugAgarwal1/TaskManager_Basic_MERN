const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController.js");

authRouter.post("/register", authController.register);  // create user
authRouter.post("/login", authController.login);        // login
authRouter.get("/logout", authController.logout);       // logout
authRouter.get("/check", authController.checkAuth);     // check session

module.exports = authRouter;