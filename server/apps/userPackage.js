import { Router, query } from "express";
import { pool } from "../utils/db.js";

const userPackageRouter = Router();

userPackageRouter.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const packageResult = await pool.query(
      `SELECT users.user_id, packages.package_name, packages.package_price, packages.package_limit, packages.package_icon, transaction.transaction_id, transaction.status, transaction.start_date, transaction.end_date, transaction.payment_id, transaction.merry_limit, transaction.package_id
         FROM users
         LEFT JOIN transaction ON users.user_id = transaction.user_id
         LEFT JOIN packages ON transaction.package_id = packages.package_id
         WHERE users.user_id = $1
         ORDER BY
          transaction.start_date DESC`,
      [user_id]
    );
    res.json({
      packageResult: packageResult.rows,
    });
  } catch (error) {
    console.error("An error occurred while retrieving merry limit :", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

userPackageRouter.put("/:user_id", async (req, res) => {
  const { merry_limit } = req.body;
  const userId = parseInt(req.params.user_id);

  const queryCheckUserTransaction = `
  select count(transaction_id) from transaction
  where transaction.user_id = $1
  `;
  const queryCreactUserTransaction = `
  insert into transaction (user_id, merry_limit)
  values ($1, 10)
  `;

  try {
    const checkUserTransaction = await pool.query(queryCheckUserTransaction, [
      userId,
    ]);
    const countUserTransaction = parseInt(checkUserTransaction.rows[0].count);
    if (countUserTransaction === 0) {
      const creactUserTransaction = await pool.query(
        queryCreactUserTransaction,
        [userId]
      );
    }

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
