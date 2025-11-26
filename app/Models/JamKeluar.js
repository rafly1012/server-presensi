const database = require("../../database/connection");

const JamKeluarModel = {
  getAllJamKeluar: async () => {
    return new Promise((resolve, reject) => {
      database.query("SELECT * FROM jamkeluar", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getJamKeluarByIdGuru: async (guruId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM jamkeluar WHERE idguru = ?",
        [guruId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  },
};

module.exports = JamKeluarModel;
