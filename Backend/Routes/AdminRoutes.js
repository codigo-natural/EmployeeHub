import express from "express";
import connection from "../utils/db.js";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = `SELECT * FROM admin WHERE email = ? AND password = ?`;
  connection.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: "Query error" });
    } else {
      if (result.length > 0) {
        const email = result[0].email;
        res.send({ loginStatus: true, email: email });
      } else {
        res.send({ message: "No user found" });
      }
    }
  });
});

export default router;
