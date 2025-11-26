const express = require("express");
const Authentication = require("../../app/Controllers/Auth/AuthUser");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const result = await Authentication.register(userData);
    res.json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await Authentication.login(username, password);
    req.session.user = user;
    res.json({
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw new Error("Logout gagal");
      }
      res.status(200).json({ message: "Logout successfully" });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logout",
      error: error.message,
    });
  }
});

router.get("/session", async (req, res) => {
  try {
    if (req.session.user) {
      res.status(200).json({
        success: true,
        data: req.session.user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "No active session",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
