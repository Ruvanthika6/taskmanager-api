console.log("DB FILE LOADED");
const mysql = require('mysql2');

console.log("DB FILE LOADED");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'task_manager'
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;