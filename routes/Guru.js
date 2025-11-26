const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const GuruController = require("../app/Controllers/Guru");
const GuruModel = require("../app/Models/Guru");
const routesGuru = express.Router();

routesGuru.get("/", async (req, res) => {
  try {
    const rows = await GuruModel.getAllGuru();
    res.json({
      success: true,
      message: "Getting data",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get data",
      error: error.message,
    });
  }
});

routesGuru.get("/:id", async (req, res) => {
  try {
    const guruId = req.params.id;
    const rows = await GuruModel.getGuruById(guruId);
    res.json({
      success: true,
      message: "Getting data",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get data",
      error: error.message,
    });
  }
});

routesGuru.get("/nip/:nip", async (req, res) => {
  try {
    const guruNip = req.params.nip;
    const rows = await GuruModel.getGuruByNip(guruNip);
    res.json({
      success: true,
      message: "Getting data",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get data",
      error: error.message,
    });
  }
});

routesGuru.post("/", async (req, res) => {
  try {
    const guruData = req.body;
    const result = await GuruController.insertGuru(guruData);
    res.json({
      success: true,
      message: "Inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add",
      error: error.message,
    });
  }
});

routesGuru.delete("/:id", async (req, res) => {
  try {
    const guruId = req.params.id;
    const result = await GuruController.deleteGuru(guruId);
    res.json({
      success: true,
      message: "Deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
      error: error.message,
    });
  }
});

routesGuru.put("/:id", async (req, res) => {
  try {
    const guruId = req.params.id;
    const guruData = req.body;
    const result = await GuruController.updateGuru(guruId, guruData);
    res.json({
      success: true,
      message: "Updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      error: error.message,
    });
  }
});

routesGuru.post("/import", async (req, res) => {
  try {
    const data = req.body;

    for (const guruData of data) {
      await GuruController.insertGuru(guruData);
    }

    res.json({
      success: true,
      message: "Data imported successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to import data",
      error: error.message,
    });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

routesGuru.patch("/:id", upload.single("foto"), async (req, res) => {
  try {
    const guruId = req.params.id;

    const guru = await GuruModel.getGuruById(guruId);

    if (!guru) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    const file = req.file ? req.file : null;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const newFilename = `${guru.nip}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    const oldPath = path.join(__dirname, "../uploads", file.filename);
    const newPath = path.join(__dirname, "../uploads", newFilename);

    if (!fs.existsSync(oldPath)) {
      return res.status(500).json({
        success: false,
        message: "File not found for renaming",
      });
    }

    fs.renameSync(oldPath, newPath);

    const result = await GuruController.updateGuruFile(guruId, newFilename);

    res.json({
      success: true,
      message: "Updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      error: error.message,
    });
  }
});

module.exports = routesGuru;
