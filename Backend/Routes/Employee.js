import express from "express";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add_employee", (req, res) => {
  const sql = `INSERT  INTO employee (name, email, password, address, salary, image, category_id) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ Status: false, Error: "Error for hassing password" });
    } else {
      const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.address,
        req.body.salary,
        req.body.image,
        req.body.category_id,
      ];
      connection.query(sql, [values], (err, result) => {
        if (err) {
          return res.json({ Status: false, Error: err });
        } else {
          return res.json({ Status: true });
        }
      });
    }
  });
});

export default router;
