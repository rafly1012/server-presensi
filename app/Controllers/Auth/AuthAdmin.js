const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../../../database/connection");

const AuthAdmin = {
  register: async (adminData) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(adminData.password, 10, (err, hash) => {
        if (err) return reject(err);
        const newAdmin = { ...adminData, password: hash };
        database.query("INSERT INTO admin SET ?", newAdmin, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  login: async (username, password) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM admin WHERE username = ?",
        [username],
        (err, rows) => {
          if (err) return reject(err);
          if (rows.length === 0) return reject(new Error("Admin not found"));
          const admin = rows[0];
          bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) return reject(err);
            if (!isMatch) return reject(new Error("Invalid password"));
            const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            });
            resolve({ admin, token });
          });
        }
      );
    });
  },
};

module.exports = AuthAdmin;
