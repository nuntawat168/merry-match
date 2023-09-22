import { Router, query } from "express";
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
    const waitingUsers = waitResult.rows.filter(
      (userId) => !matchUserIds.includes(userId.user_id)
    );

    const matchData = [...matchedUsers, ...waitingUsers];
    console.log(matchData);

    res.json({
      matchData,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

matchListRouter.get("/v2/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const queryGetMatchLists = `
    SELECT
      ml.merry_list_id,
      ml.user_response,
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
      array_agg(hi.hobby_interest_name) AS hobby_interests,
      (
        select image from profile_images pi
        WHERE pi.user_id = ml.user_response
      ) as image,
      (
        CASE
          WHEN (
            SELECT count(match_id) FROM match_users mu
            WHERE (mu.user_id_1 = ml.user_interest AND mu.user_id_2 = ml.user_response) OR (mu.user_id_1 = ml.user_response AND mu.user_id_2 = ml.user_interest)
          ) >= 1 THEN 'match'
          ELSE 'notMatch'
        END
      ) AS match_status
    FROM
      merry_lists ml
      LEFT JOIN users u ON u.user_id = ml.user_response
      LEFT JOIN users_hobbies_interests uhi ON uhi.user_id = ml.user_response
      LEFT JOIN hobbies_interests hi ON uhi.hobby_interest_id = hi.hobby_interest_id
    WHERE
      ml.user_interest = $1
    GROUP BY
      ml.merry_list_id,
      ml.user_response,
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
      u.about_me;`;
    const getMatchLists = await pool.query(queryGetMatchLists, [user_id]);
    res.json({
      matchData: getMatchLists.rows,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

// เหลือ put method เพื่ออัพเดตตอนที่ กด unmatch แล้วเอาอันที่โดน unmatch ออก
matchListRouter.delete("/unmatch", async (req, res) => {
  try {
    const user_interest = req.query.user_interest;
    const user_response = req.query.user_response_id;
    const queryDeleteMatchUsers = `delete from match_users where (user_id_1 = $1 and user_id_2 = $2) or (user_id_1 = $2 and user_id_2 = $1)`;
    const queryDeleteMerryLists = `delete from merry_lists where user_interest = $1 and user_response = $2`;
    const queryCheckMatchstatus = `
    SELECT count(match_id) FROM match_users mu
    WHERE (mu.user_id_1 = $1 AND mu.user_id_2 = $2) OR (mu.user_id_1 = $2 AND mu.user_id_2 = $1)`;

    const checkMatchStatus = await pool.query(queryCheckMatchstatus, [
      user_interest,
      user_response,
    ]);

    const match_status = parseInt(checkMatchStatus.rows[0].count);

    if (match_status === 0) {
      const deleteMerryLists = await pool.query(queryDeleteMerryLists, [
        user_interest,
        user_response,
      ]);
    } else {
      const deleteMatchUsers = await pool.query(queryDeleteMatchUsers, [
        user_interest,
        user_response,
      ]);
      const deleteMerryLists = await pool.query(queryDeleteMerryLists, [
        user_interest,
        user_response,
      ]);
    }
    res.json({
      message: "Unmatch successfully",
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

export default matchListRouter;
