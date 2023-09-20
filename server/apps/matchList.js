import { Router } from "express";
import { pool } from "../utils/db.js";

const matchListRouter = Router();

matchListRouter.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const matchResult = await pool.query(
      `SELECT users.user_id, users.sex, users.name, users.age, users.email, users.city, users.location, users.sex_identities, 
        users.sexual_preferences, users.racial_preferences, users.meeting_interests, profile_images.image, users.about_me,
        'match' AS matchStatus
      FROM users
      INNER JOIN profile_images ON users.user_id = profile_images.user_id
      INNER JOIN match_users ON
        (users.user_id = match_users.user_id_1 AND $1 = match_users.user_id_2) OR
        (users.user_id = match_users.user_id_2 AND $1 = match_users.user_id_1)
      WHERE match_users.user_id_1 IS NOT NULL OR match_users.user_id_2 IS NOT NULL
      `,
      [user_id]
    );

    const waitResult = await pool.query(
      `SELECT users.user_id, users.sex, users.name, users.age, users.email, users.city, users.location, users.sex_identities, 
      users.sexual_preferences, users.racial_preferences, users.meeting_interests, profile_images.image, users.about_me,
      'wait' AS matchStatus
        FROM users
        INNER JOIN profile_images ON users.user_id = profile_images.user_id
        JOIN merry_lists ON
        users.user_id = merry_lists.user_response AND $1 = merry_lists.user_interest
        WHERE merry_lists.user_interest IS NOT NULL
        `,
      [user_id]
    );

    // find match array
    const matchUserIds = matchResult.rows.map((row) => row.user_id);

    // Separate matched and waiting match 
    const matchedUsers = matchResult.rows;
    const waitingUsers = waitResult.rows.filter((userId) => !matchUserIds.includes(userId.user_id));

    const matchData = [...matchedUsers, ...waitingUsers]
    console.log(matchData)

    res.json({
      matchData
    });
    
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

// เหลือ put method เพื่ออัพเดตตอนที่ กด unmatch แล้วเอาอันที่โดน unmatch ออก

export default matchListRouter;