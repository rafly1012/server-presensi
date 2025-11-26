const mysql = require("mysql");
import dotenv from "dotenv";
dotenv.config();

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 61001
});

database.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = database;
