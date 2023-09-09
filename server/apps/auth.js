import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import cloudinary from "cloudinary";
import { cloudinaryUpload } from "../utils/uploadImg.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const authRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const picturesProfileUpload = multerUpload.fields([
  { name: "picturesProfile", maxCount: 5 },
]);

authRouter.post("/register", picturesProfileUpload, async (req, res) => {
  const user = {
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

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    const picturesProfileUrl = await cloudinaryUpload(req.files);
    user["picturesProfile"] = picturesProfileUrl;
    const userInsertResult = await pool.query(
      ` 
      INSERT INTO users (username, password, email, name, sex, city, location, date_of_birth, sexual_preferences, racial_preferences, meeting_interests, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING user_id
      `,
      [
        user.username,
        user.password,
        user.email,
        user.name,
        user.sex,
        user.city,
        user.location,
        user.date_of_birth,
        user.sexual_preferences,
        user.racial_preferences,
        user.meeting_interests,
        user.created_at,
        user.updated_at,
      ]
    );
    const userId = userInsertResult.rows[0].user_id;
    const userPictureProfileInsertResult = await pool.query(
      `
        insert into profile_images (user_id, image)
        values ($1, $2::json)
      `,
      [userId, JSON.stringify(user.picturesProfile)]
    );
    for (const hobbyInterestName of req.body.hobbiesInterests.split(",")) {
      const existingHobbyInterestName = await pool.query(
        `
          SELECT hobby_interest_id
          FROM hobbies_interests
          WHERE hobby_interest_name = $1
        `,
        [hobbyInterestName]
      );

      let hobbyInterrestId;
      if (existingHobbyInterestName.rows.length > 0) {
        hobbyInterrestId = existingHobbyInterestName.rows[0].hobby_interest_id;
      } else {
        const newHobbyInterest = await pool.query(
          `
          INSERT INTO hobbies_interests (hobby_interest_name)
          VALUES ($1)
          RETURNING hobby_interest_id
        `,
          [hobbyInterestName]
        );
        hobbyInterrestId = newHobbyInterest.rows[0].hobby_interest_id;
      }

      await pool.query(
        `
          INSERT INTO users_hobbies_interests (user_id, hobby_interest_id)
          VALUES ($1, $2)
        `,
        [userId, hobbyInterrestId]
      );
    }

    console.log("=> User has been created successfully");
    return res.json({
      message: "User has been created successfully",
    });
  } catch (error) {
    console.log(`=>Insert user record Error: ${error}`);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Email from req.body:", email);

  try {
    const query = `
        SELECT user_id, email, password, name
        FROM users
        WHERE email = $1;
      `;

    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({
        message: "Password not valid",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        name: user.name,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "900000",
      }
    );

    return res.json({
      message: "Login successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
