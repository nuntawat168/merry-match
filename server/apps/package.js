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
      `INSERT INTO packages (package_name,package_price,package_limit,package_icon,created_by,created_at,updated_at) 
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

packageRouter.get("/:id", async (req, res) => {
  const packageId = parseInt(req.params.id);
  let result;

  if (isNaN(packageId)) {
    return res.status(400).json({ error: "Invalid package ID" });
  }

  try {
    result = await pool.query(
      "SELECT packages.*, json_agg(package_details.detail) AS package_details " +
        "FROM packages " +
        "LEFT JOIN package_details ON packages.package_id = package_details.package_id " +
        "WHERE packages.package_id = $1 " +
        "GROUP BY packages.package_id",
      [packageId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  return res.status(200).json({ data: result.rows[0] });
});

packageRouter.put("/:id", async (req, res) => {
  const updatePackage = {
    ...req.body,
  };

  const packageId = parseInt(req.params.id);

  try {
    await pool.query(
      `UPDATE packages SET package_name =$1,
    package_price=$2,
    package_limit=$3,
    package_icon=$4,
    updated_at=$5 WHERE package_id=$6`,
      [
        updatePackage.package_name,
        updatePackage.package_price,
        updatePackage.package_limit,
        updatePackage.package_icon,
        new Date(),
        packageId,
      ]
    );
  } catch (error) {
    return res.status(400).json({ message: error });
  }
  return res.status(200).json({ message: "Package has been updated" });
});

packageRouter.delete("/:id", async (req, res) => {
  const packageId = parseInt(req.params.id);

  const getPackageById = await pool.query(
    `SELECT * FROM packages WHERE package_id=$1`,
    [packageId]
  );

  if (getPackageById.rows.length === 0) {
    return res
      .status(404)
      .json({ message: "Package does not exist in the database" });
  }

  let result;
  try {
    result = pool.query(`DELETE FROM packages WHERE package_id=$1`, [
      packageId,
    ]);
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  return res
    .status(200)
    .json({ message: `Package id:${packageId} has been deleted successfully` });
});

export default packageRouter;
