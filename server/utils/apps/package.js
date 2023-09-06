import { Router } from "express";
import { pool } from "../db.js";

const packageRouter = Router();

packageRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM packages JOIN package_details ON packages.package_id = package_details.package_id;"
    );
    return res.json({
      data: result.rows,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

export default packageRouter;
