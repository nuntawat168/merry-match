import { Router } from "express";
import { pool } from "../utils/db.js";

const packageRouter = Router();

packageRouter.post("/", async (req, res) => {
  console.log(req.body);
  const {
    package_name,
    package_price,
    package_limit,
    package_icon,
    created_by,
  } = req.body;
  try {
    await pool.query(
      `insert into packages (package_name,package_price,package_limit,package_icon,created_by,created_at,updated_at) 
      values ($1,$2,$3,$4,$5,$6,$7)`,
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
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }

  return res.status(200).json({ message: "Package has been created" });
});

export default packageRouter;
