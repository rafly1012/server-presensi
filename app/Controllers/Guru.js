const database = require("../../database/connection");

const GuruController = {
  insertGuru: async (guruData) => {
    return new Promise((resolve, reject) => {
      database.query("INSERT INTO guru SET ?", guruData, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  deleteGuru: async (guruId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "DELETE FROM guru WHERE id = ?",
        guruId,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  updateGuru: async (guruId, guruData) => {
    return new Promise((resolve, reject) => {
      database.query(
        "UPDATE guru SET ? WHERE id = ?",
        [guruData, guruId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  updateGuruFile: async (guruId, foto) => {
    return new Promise((resolve, reject) => {
      database.query(
        "UPDATE guru SET foto = ? WHERE id = ?",
        [foto, guruId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
};

module.exports = GuruController;
