import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import cloudinary from "cloudinary";
import { cloudinaryUpload } from "../utils/uploadImg.js";

import {
  createUser,
  createHobbyInterest,
  createUserHobbyInterests,
} from "../utils/userRegistration.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const authRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const picturesProfileUpload = multerUpload.fields([
  { name: "picturesProfile", maxCount: 5 },
]);

authRouter.post("/register", picturesProfileUpload, async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    city: req.body.city,
    location: req.body.location,
    date_of_birth: req.body.dateOfBirth,
    sexual_preferences: req.body.sexualPreferences,
    racial_preferences: req.body.racialPreferences,
    sex: req.body.sexualIdentites,
    meeting_interests: req.body.meetingInterests,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    const userId = await createUser(userData);

    const picturesProfileUrl = await cloudinaryUpload(req.files);
    userData["picturesProfile"] = picturesProfileUrl;
    console.log("upload to couldinary complete");
    await pool.query(
      `
        insert into profile_images (user_id, image)
        values ($1, $2::json)
      `,
      [userId, JSON.stringify(userData.picturesProfile)]
    );
    console.log("insert picture url complete");
    const hobbyInterestNames = req.body.hobbiesInterests.split(",");
    const hobbyInterestIds = [];

    for (const hobbyInterestName of hobbyInterestNames) {
      const hobbyInterestId = await createHobbyInterest(hobbyInterestName);
      hobbyInterestIds.push(hobbyInterestId);
    }

    await createUserHobbyInterests(userId, hobbyInterestIds);
    // console.log("create user")

    console.log("User registration successful.");
    return res.json({
      message: "User has been registered successfully.",
    });
  } catch (error) {
    console.error(`User registration failed: ${error.message}`);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
});

authRouter.get("/check-available", async (req, res) => {
  const checkColumn = req.query.checkColumn;
  const checkValue = req.query.checkValue;
  try {
    const query = `
      SELECT COUNT(*) AS count
      FROM users
      WHERE ${checkColumn} = $1
    `;
    const respone = await pool.query(query, [checkValue]);
    const count = parseInt(respone.rows[0].count);
    return res.json({
      data: !(count > 0),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = `
          SELECT user_id, email, password, name
          FROM users
          WHERE email = $1;
        `;

    const adminQuery = `
          SELECT admin_id, email, password
          FROM admins
          WHERE email = $1;
        `;

    const { rows: userRows } = await pool.query(userQuery, [email]);
    const { rows: adminRows } = await pool.query(adminQuery, [email]);

    if (userRows.length === 0 && adminRows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (userRows.length > 0 && userRows[0].password === password) {
      const user = userRows[0];
      const token = jwt.sign(
        {
          id: user.user_id,
          email: user.email,
          name: user.name,
          role: "user",
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "900000",
        }
      );
      return res.json({
        message: " User Login successfully",
        token,
      });
    } else if (adminRows.length > 0 && adminRows[0].password === password) {
      const admin = adminRows[0];
      const token = jwt.sign(
        {
          id: admin.admin_id,
          email: admin.email,
          name: admin.name,
          role: "admin",
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "900000",
        }
      );
      return res.json({
        message: "Admin Login successfully",
        token,
      });
    } else {
      return res.status(401).json({
        message: "Password not valid",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
