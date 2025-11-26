const database = require("../../database/connection");

const JamKeluarController = {
  insertJamKeluar: async (jamkeluarData) => {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO jamkeluar SET ?",
        jamkeluarData,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
};

module.exports = JamKeluarController;
