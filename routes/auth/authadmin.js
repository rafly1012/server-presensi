const express = require("express");
const Authentication = require("../../app/Controllers/Auth/AuthAdmin");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// Register admin
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

// Login admin → mengembalikan JWT
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Authentication.login(username, password);

    if (!admin) {
      return res.status(401).json({ success: false, message: "Username atau password salah" });
    }

    // Buat JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      data: { admin, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
});

// Logout → cukup di frontend hapus token
router.post("/logout", (req, res) => {
  // JWT stateless → backend tidak perlu destroy session
  res.json({
    success: true,
    message: "Logout berhasil, hapus token di frontend",
  });
});

// Contoh route proteksi
router.get("/profile", verifyToken, async (req, res) => {
  res.json({
    success: true,
    data: req.user, // data dari JWT
  });
});

module.exports = router;
