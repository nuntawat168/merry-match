import { Router, query } from "express";
import { pool } from "../utils/db.js";

const userPackageRouter = Router();

userPackageRouter.get("/:user_id", async (req, res) => {
    try {
      const { user_id } = req.params;
      const packageResult = await pool.query(
        `SELECT users.user_id, users.package_id, packages.package_name, packages.package_limit
         FROM users
         LEFT JOIN packages ON users.package_id = packages.package_id
         WHERE users.user_id = $1`,
        [user_id]
      );
      res.json({
        packageResult: packageResult.rows,
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
    }
});
  
// ยังไม่ได้เทสของ update รอคุยตาราง
userPackageRouter.put("/:user_id", async (req, res) => {
  const {
    merry_limit,
  } = req.body;

  const packageId = parseInt(req.params.id);

  try {
    await pool.query(
      `UPDATE packages 
      SET merry_limit =$1,
          WHERE package_id=$2`,
      [
        merry_limit,
        packageId,
      ]
    );

    return res.status(200).json({ message: "merry limit of this user has been updated" });
  } catch (error) {
    console.log("มี error นะอิ่ม", error);
    return res.status(400).json({ message: error });
  }
});

export default userPackageRouter;
