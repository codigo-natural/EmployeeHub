import cors from "cors";
import express from "express";
import adminRouter from "./Routes/AdminRoutes.js";
import Category from "./Routes/Categorys.js";
import Employee from "./Routes/Employee.js";
import { config } from "./config/index.js";

const PORT = config.port;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", adminRouter);
app.use("/auth", Category);
app.use("/auth", Employee);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
