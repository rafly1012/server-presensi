const database = require("../../database/connection");

const JamMasukModel = {
  getAllJamMasuk: async () => {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM jammasuk", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getJamMasukByIdGuru: async (guruId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM jammasuk WHERE idguru = ?",
        [guruId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  },
};

module.exports = JamMasukModel;
