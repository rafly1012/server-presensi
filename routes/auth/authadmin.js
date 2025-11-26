const express = require("express");
const Authentication = require("../../app/Controllers/Auth/AuthAdmin");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const adminData = req.body;
    const result = await Authentication.register(adminData);
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register admin",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { admin, token } = await Authentication.login(username, password);

    req.session.admin = admin;

    req.session.save((err) => {
      if (err) throw err;
      res.json({
        success: true,
        message: "Admin logged in successfully",
        data: { admin, token },
      });
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
        throw new Error("Logout failed");
      }
      res.status(200).json({
        success: true,
        message: "Logout successfully",
      });
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
    if (req.session.admin) {
      res.status(200).json({
        success: true,
        data: req.session.admin,
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
