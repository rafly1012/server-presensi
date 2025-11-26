const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../../../database/connection");

const AuthenUser = {
  register: async (userData) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(userData.password, 10, (err, hash) => {
        if (err) return reject(err);
        const newUser = { ...userData, password: hash };
        database.query("INSERT INTO users SET ?", newUser, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  login: async (username, password) => {
    return new Promise((resolve, reject) => {
      database.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, rows) => {
          if (err) return reject(err);
          if (rows.length === 0) return reject(new Error("User not found"));
          const user = rows[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return reject(err);
            if (!isMatch) return reject(new Error("Invalid password"));
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: "1h",
            });
            resolve({ user, token });
          });
        }
      );
    });
  },
};

module.exports = AuthenUser;
