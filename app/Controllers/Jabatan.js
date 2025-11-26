const database = require("../../database/connection");

const JabatanController = {
  insertJabatan: async (jabatanData) => {
    return new Promise((resolve, reject) => {
      database.query(
        "INSERT INTO jabatan SET ?",
        jabatanData,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  deleteJabatan: async (jabatanId) => {
    return new Promise((resolve, reject) => {
      database.query(
        "DELETE FROM jabatan WHERE id = ?",
        jabatanId,
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },

  updateJabatan: async (jabatanId, jabatanData) => {
    return new Promise((resolve, reject) => {
      database.query(
        "UPDATE jabatan SET ? WHERE id = ?",
        [jabatanData, jabatanId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  },
};

module.exports = JabatanController;
