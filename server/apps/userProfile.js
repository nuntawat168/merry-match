import { Router } from "express";
import { pool } from "../utils/db.js";

const userProfileRouter = Router();

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
    u.sex_identities,
    u.meeting_interests,
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
    u.user_id, u.username, u.email, u.name, u.sex, u.city, u.location, u.date_of_birth, u.sexual_preferences, u.racial_preferences, u.sex_identities, u.meeting_interests
  `;

  try {
    const userId = req.params.userId;
    console.log(userId);
    const respone = await pool.query(query, [userId]);
    console.log("+++++++++++++++++++++++++++++++++++++++");
    console.log(respone.rows[0]);
    return res.json({
      message: "testAPI",
    });
  } catch (error) {
    console.error(`Get user profile failed: ${error.message}`);
    return res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
});

export default userProfileRouter;
