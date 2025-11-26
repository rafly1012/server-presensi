const database = require("../../database/connection");

const AdminModel = {
  getAllAdmin: async () => {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM admin", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getAdminById: async (adminId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM admin WHERE id = ?",
        [adminId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  },
};

module.exports = AdminModel;
