import express from "express";
import connection from "../utils/db.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ Status: false, Error: "Failed to fetch data" });
    } else {
      res.json({ Status: true, Result: result });
    }
  });
});

// image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
// end image upload

router.post("/add_employee", upload.single("image"), (req, res) => {
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
        req.file ? req.file.filename : null,
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
