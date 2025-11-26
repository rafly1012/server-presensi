const database = require("../../database/connection");

const GuruModel = {
  getAllGuru: async () => {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM guru", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getGuruById: async (guruId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM guru WHERE id = ?",
        [guruId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  },

  getGuruByNip: async (guruId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM guru WHERE nip = ?",
        [guruId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows[0]);
        }
      );
    });
  },
};

module.exports = GuruModel;
