import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./utils/db.js";

async function init() {
  dotenv.config();

  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/user", async (req, res) => {
    try {
      const result = await pool.query("SELECT users.user_id, users.username, users.email, users.package_id, users.name, profile_images.image FROM users INNER JOIN profile_images ON users.user_id = profile_images.user_id;");
      res.json({
        data: result.rows,
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
    }
  });


  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });



  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}

init();
