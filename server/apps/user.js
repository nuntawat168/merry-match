import { Router } from "express";
import { pool } from "../utils/db.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT users.user_id, users.sex, users.username, users.age, users.email, users.package_id, users.name, profile_images.image, merry_lists.* " +
        "FROM users " +
        "INNER JOIN profile_images ON users.user_id = profile_images.user_id " +
        "LEFT JOIN merry_lists ON users.user_id = merry_lists.user_interest OR users.user_id = merry_lists.user_response"
    );

    res.json({
      data: result.rows,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

userRouter.get("/matchlist/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;

        const result = await pool.query(
            "SELECT users.user_id, users.sex, users.username, users.age, users.email, users.package_id, users.name, profile_images.image, merry_lists.* " +
            "FROM users " +
            "INNER JOIN profile_images ON users.user_id = profile_images.user_id " +
            "LEFT JOIN merry_lists ON users.user_id = merry_lists.user_interest OR users.user_id = merry_lists.user_response " +
            "WHERE merry_lists.merry_match_status = TRUE AND users.user_id = $1",
            [user_id]
        );

        res.json({
            data: result.rows,
        });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
    }
});


userRouter.post("/match/:user_interest/:user_response", async (req, res) => {
  try {
    const { user_interest, user_response } = req.params;

    const result = await pool.query(
      "INSERT INTO merry_lists (user_interest, user_response, user_interest_action) VALUES ($1, $2, $3)",
      [user_interest, user_response, true]
    );

    await pool.query(
      "UPDATE users SET user_response_action = TRUE WHERE user_id = $1",
      [user_interest]
    );

    const checkMatchStatus = async () => {
      const responseUser = await pool.query(
        "SELECT user_response_action FROM users WHERE user_id = $1",
        [user_interest]
      );

      const interestUser = await pool.query(
        "SELECT user_interest_action FROM users WHERE user_id = $1",
        [user_response]
      );

      const responseAction = responseUser.rows[0].user_response_action;
      const interestAction = interestUser.rows[0].user_interest_action;

      if (responseAction && interestAction) {
        await pool.query(
          "UPDATE merry_lists SET merry_match_status = TRUE WHERE user_interest = $1 AND user_response = $2",
          [user_interest, user_response]
        );
      }
    };

    await checkMatchStatus();

    res.json({
      data: result.rows[0],
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการทำการ Match:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการทำการ Match" });
  }
});

export default userRouter;
