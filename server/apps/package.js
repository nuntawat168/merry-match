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
    const adminInsertPackage = await pool.query(
      `INSERT INTO packages (package_name,package_price,package_limit,package_icon,created_by,created_at,updated_at) 
      values ($1,$2,$3,$4,$5,$6,$7)
      RETURNING package_id
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

    for (let i = 0; i < package_details.length; i++) {
      await pool.query(
        `INSERT INTO package_details (package_id, detail) VALUES ($1,$2)`,
        [adminInsertPackage.rows[0].package_id, package_details[i].detail]
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
      "SELECT packages.*, json_agg(json_build_object('package_details_id',package_details.package_details_id,'detail',package_details.detail )) AS package_details " +
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
  const {
    package_name,
    package_price,
    package_limit,
    package_icon,
    package_details,
  } = req.body;

  const packageId = parseInt(req.params.id);

  try {
    await pool.query(
      `UPDATE packages 
      SET package_name =$1,
          package_price=$2,
          package_limit=$3,
          package_icon=$4,
          updated_at=$5 
          WHERE package_id=$6`,
      [
        package_name,
        package_price,
        package_limit,
        package_icon,
        new Date(),
        packageId,
      ]
    );

    // Get the existing package details for the specified package
    const dbPackageDetails = await pool.query(
      `SELECT package_details_id FROM package_details WHERE package_id = $1`,
      [packageId]
    );

    const dbPackageDetailEachIds = dbPackageDetails.rows.map(
      (row) => row.package_details_id
    );
    console.log("dbPackageDetails", dbPackageDetails);
    console.log("dbPackageDetailEachIds", dbPackageDetailEachIds);

    for (const Id of dbPackageDetailEachIds) {
      // ถ้า ID จาก client กับ DB ไม่ match กันทุกตัว จะทำการลบ ID นั้นออกจาก database
      if (!package_details.some((detail) => detail.package_details_id === Id)) {
        await pool.query(
          `DELETE FROM package_details WHERE package_details_id = $1`,
          [Id]
        );
      }
    }

    for (let i = 0; i < package_details.length; i++) {
      if (package_details[i].package_details_id) {
        await pool.query(
          `
        UPDATE package_details
        SET detail = $1
        WHERE package_id = $2
        AND package_details_id = $3`,
          [
            package_details[i].detail,
            packageId,
            package_details[i].package_details_id,
          ]
        );
      } else {
        await pool.query(
          `INSERT INTO package_details (package_id, detail) VALUES ($1,$2)`,
          [packageId, package_details[i].detail]
        );
      }
    }
    return res.status(200).json({ message: "Package has been updated" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: error });
  }
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
