import mysql2 from "mysql2"
import { config } from "../config/index.js";

const connection = mysql2.createConnection({
  host: config.dbhost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.database,
});

connection.connect((err) => {
  if (err) {
    console.log("connection error:", err.stack);
  } else {
    console.log("DB Connected!", connection.threadId);
  }
});

export default connection;
