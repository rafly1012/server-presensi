const database = require("../../database/connection");

const JamMasukController = {
  insertJamMasuk: async (jammasukData) => {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO jammasuk SET ?",
        jammasukData,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
};

module.exports = JamMasukController;
