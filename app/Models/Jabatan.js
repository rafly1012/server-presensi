const database = require("../../database/connection");

const JabatanModel = {
  getAllJabatan: async () => {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM jabatan", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getJabatanById: async (jabatanId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM jabatan WHERE id = ?",
        [jabatanId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  },
};

module.exports = JabatanModel;
