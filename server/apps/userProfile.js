import { Router } from "express";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";

const userProfileRouter = Router();
userProfileRouter.get("/check-available", async (req, res) => {
  const checkColumn = req.query.checkColumn;
  const checkValue = req.query.checkValue;
  const token = req.headers.authorization;
  const userInfo = jwt.decode(token.replace("Bearer ", ""));
  const userId = userInfo.id;
  try {
    const query = `
      SELECT COUNT(${checkColumn}) AS count
      FROM users
      WHERE ${checkColumn} = $1 AND user_id <> $2
    `;
    const respone = await pool.query(query, [checkValue, userId]);
    const count = parseInt(respone.rows[0].count);
    return res.json({
      data: !(count > 0),
    });
  } catch (error) {
    console.error(`Check Avilable Error: ${error}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
userProfileRouter.get("/:userId", async (req, res) => {
  const query = `
  SELECT
    u.user_id,
    u.username,
    u.email,
    u.name,
    u.sex,
    u.city,
    u.location,
    u.date_of_birth,
    u.sexual_preferences,
    u.racial_preferences,
    u.meeting_interests,
    u.about_me,
    (
      select image from profile_images pi
      WHERE pi.user_id = u.user_id
    ) as image,
    array_agg(hi.hobby_interest_name) AS hobby_interests
  FROM
    users u
  INNER JOIN
    users_hobbies_interests uhi ON u.user_id = uhi.user_id
  INNER JOIN
    hobbies_interests hi ON uhi.hobby_interest_id = hi.hobby_interest_id
  WHERE
    u.user_id = $1
  GROUP BY
    u.user_id, u.username, u.email, u.name, u.sex, u.city, u.location, u.date_of_birth, u.sexual_preferences, u.racial_preferences, u.sex_identities, u.meeting_interests, about_me
  `;

  try {
    const userId = req.params.userId;
    const respone = await pool.query(query, [userId]);
    return res.json({
      data: respone.rows[0],
    });
  } catch (error) {
    console.error(`Get user profile failed: ${error.message}`);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
});

export default userProfileRouter;
