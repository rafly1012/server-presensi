const express = require("express");
const AdminController = require("../app/Controllers/Admin");
const AdminModel = require("../app/Models/Admin");
const routesAdmin = express.Router();

routesAdmin.get("/", async (req, res) => {
  try {
    const rows = await AdminModel.getAllAdmin();
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

routesAdmin.get("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const rows = await AdminModel.getAdminById(adminId);
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

routesAdmin.post("/", async (req, res) => {
  try {
    const adminData = req.body;
    const result = await AdminController.insertAdmin(adminData);
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

routesAdmin.delete("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const result = await AdminController.deleteAdmin(adminId);
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

routesAdmin.put("/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const adminData = req.body;
    const result = await AdminController.updateAdmin(adminId, adminData);
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

module.exports = routesAdmin;
