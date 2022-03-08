const mysql = require("mysql");
const dotenv = require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
});

connection.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected to MySQL!");
});

module.exports = { connection };