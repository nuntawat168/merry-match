import { Router, query } from "express";
import { pool } from "../utils/db.js";

const userPackageRouter = Router();

userPackageRouter.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const packageResult = await pool.query(
      `SELECT users.user_id, users.package_id, packages.package_name, packages.package_price, packages.package_limit, packages.package_icon, transaction.transaction_id, transaction.status, transaction.start_date, transaction.end_date, transaction.payment_id, transaction.merry_limit
         FROM users
         LEFT JOIN packages ON users.package_id = packages.package_id
         LEFT JOIN transaction ON users.user_id = transaction.user_id
         WHERE users.user_id = $1`,
      [user_id]
    );
    res.json({
      packageResult: packageResult.rows,
    });
  } catch (error) {
    console.error("An error occurred while retrieving merry limit :", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

userPackageRouter.put("/:user_id", async (req, res) => {
  const { merry_limit } = req.body;
  const userId = parseInt(req.params.user_id);

  try {
    await pool.query(
      `UPDATE transaction 
        SET merry_limit =$1
        WHERE user_id=$2`,
      [merry_limit, userId]
    );

    return res
      .status(200)
      .json({ message: "merry limit of this user has been updated" });
  } catch (error) {
    console.log("An error occurred while updating merry limit: ", error);
    return res.status(400).json({ message: error });
  }
});

export default userPackageRouter;
