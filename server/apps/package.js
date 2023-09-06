import { Router } from "express";
import { pool } from "../utils/db.js";
import multer from "multer";
import { cloudinaryUpload } from "../utils/upload.js";

const packageRouter = Router();

// const multerUpload = multer;
// ({ dest: "uploads/" });

// const avatarUpload = multerUpload.fields;
// [{ name: "package_icon", maxCount: 2 }];

packageRouter.post("/", async (req, res) => {
  const {
    package_name,
    package_price,
    package_limit,
    package_icon,
    created_by,
  } = req.body;

  // const packageIcon = await cloudinaryUpload(package_icon);
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
