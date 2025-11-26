const database = require("../../database/connection");

const AdminController = {
  insertAdmin: async (adminData) => {
    return new Promise((resolve, reject) => {
      database.query("INSERT INTO admin SET ?", adminData, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  deleteAdmin: async (adminId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "DELETE FROM admin WHERE id = ?",
        adminId,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  updateAdmin: async (adminId, adminData) => {
    return new Promise((resolve, reject) => {
      database.query(
        "UPDATE admin SET ? WHERE id = ?",
        [adminData, adminId],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};

module.exports = AdminController;
