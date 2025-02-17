import express from "express";
import connection from "../utils/db.js";

const router = express.Router();

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  connection.query(sql, (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true, Result: result });
    }
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  connection.query(sql, [req.body.categoryName], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query Error" });
    } else {
      return res.json({ Status: true });
    }
  });
});

export default router;
