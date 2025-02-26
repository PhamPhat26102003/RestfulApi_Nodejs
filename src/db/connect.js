const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectToDatabase = async () => {
  try {
    await pool.getConnection();
    console.log("MySql connected");
  } catch (err) {
    console.log("Failed to connect to database: ".err);
    throw err;
  }
};

module.exports = { pool, connectToDatabase };
