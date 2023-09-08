import { Router } from "express";
import { pool } from "../utils/db.js";

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

packageRouter.post("/", async (req, res) => {
  const {
    package_name,
    package_price,
    package_limit,
    package_icon,
    package_details,
    created_by,
  } = req.body;

  try {
    await pool.query(
      `insert into packages (package_name,package_price,package_limit,package_icon,created_by,created_at,updated_at) 
      values ($1,$2,$3,$4,$5,$6,$7)
    
      `,
      [
        package_name,
        package_price,
        package_limit,
        package_icon,
        created_by,
        new Date(),
        new Date(),
      ]
    );
    console.log(package_details);

    for (let i = 0; i < package_details.length; i++) {
      await pool.query(
        `insert into package_details (package_id, detail) values ((select max(package_id) from packages),$1)`,
        [package_details[i]]
      );
    }
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }

  return res.status(200).json({ message: "Package has been created" });
});

export default packageRouter;
