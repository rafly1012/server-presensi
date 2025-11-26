const express = require("express");
const JamMasukController = require("../app/Controllers/JamMasuk");
const JamMasukModel = require("../app/Models/JamMasuk");
const routesJamMasuk = express.Router();

routesJamMasuk.get("/", async (req, res) => {
  try {
    const rows = await JamMasukModel.getAllJamMasuk();
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

routesJamMasuk.get("/:idguru", async (req, res) => {
  try {
    const jammasukId = req.params.idguru;
    const rows = await JamMasukModel.getJamMasukByIdGuru(jammasukId);
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

routesJamMasuk.post("/", async (req, res) => {
  try {
    const jammasukData = req.body;
    const result = await JamMasukController.insertJamMasuk(jammasukData);
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

module.exports = routesJamMasuk;
