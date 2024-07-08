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

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
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

router.put("/update_employee/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name, email, address, salary, category_id } = req.body;
  let image = req.file ? req.file.filename : null;

  // Si no se subió una nueva imagen, mantener la imagen existente
  if (!image) {
    const sqlGetCurrentImage = "SELECT image FROM employee WHERE id = ?";
    connection.query(sqlGetCurrentImage, [id], (err, result) => {
      if (err) {
        return res.json({
          Status: false,
          Error: "Error getting current image",
        });
      }
      if (result.length > 0) {
        image = result[0].image;
      }
      updateEmployee();
    });
  } else {
    updateEmployee();
  }

  function updateEmployee() {
    const sql = `UPDATE employee SET name=?, email=?, address=?, salary=?, image=?, category_id=? WHERE id=?`;
    const values = [name, email, address, salary, image, category_id, id];

    connection.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: err });
      }
      return res.json({
        Status: true,
        Result: result,
      });
    });
  }
});

export default router;
