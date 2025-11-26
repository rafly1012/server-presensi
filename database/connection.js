const mysql = require("mysql");

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

database.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = database;
