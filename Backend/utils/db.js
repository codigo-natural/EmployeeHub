import mysql from "mysql";
import { config } from "../config";

const connection = mysql.createConnection({
  host: config.dbhost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.database,
});

connection.connect(function (err) {
  if (err) {
    console.log("DB Connected!");
  } else {
    console.log("DB Disconnected!");
  }
});
