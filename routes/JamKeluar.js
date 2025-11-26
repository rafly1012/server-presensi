const express = require("express");
const JamKeluarController = require("../app/Controllers/JamKeluar");
const JamKeluarModel = require("../app/Models/JamKeluar");
const routesJamKeluar = express.Router();

routesJamKeluar.get("/", async (req, res) => {
  try {
    const rows = await JamKeluarModel.getAllJamKeluar();
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

routesJamKeluar.get("/:idguru", async (req, res) => {
  try {
    const jamkeluarId = req.params.idguru;
    const rows = await JamKeluarModel.getJamKeluarByIdGuru(jamkeluarId);
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

routesJamKeluar.post("/", async (req, res) => {
  try {
    const jamkeluarData = req.body;
    const result = await JamKeluarController.insertJamKeluar(jamkeluarData);
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

module.exports = routesJamKeluar;
