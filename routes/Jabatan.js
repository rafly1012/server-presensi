const express = require("express");

const JabatanController = require("../app/Controllers/Jabatan");
const JabatanModel = require("../app/Models/Jabatan");
const routesJabatan = express.Router();

routesJabatan.get("/", async (req, res) => {
  try {
    const rows = await JabatanModel.getAllJabatan();
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

routesJabatan.get("/:id", async (req, res) => {
  try {
    const jabatanId = req.params.id;
    const rows = await JabatanModel.getJabatanById(jabatanId);
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

routesJabatan.post("/", async (req, res) => {
  try {
    const jabatanData = req.body;
    const result = await JabatanController.insertJabatan(jabatanData);
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

routesJabatan.delete("/:id", async (req, res) => {
  try {
    const jabatanId = req.params.id;
    const result = await JabatanController.deleteJabatan(jabatanId);
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

routesJabatan.put("/:id", async (req, res) => {
  try {
    const jabatanId = req.params.id;
    const jabatanData = req.body;
    const result = await JabatanController.updateJabatan(
      jabatanId,
      jabatanData
    );
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

module.exports = routesJabatan;
