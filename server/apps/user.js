import { Router } from "express";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT users.user_id, users.sex, users.username, users.age, users.email, users.name, profile_images.image " + // ใส่ช่องว่างหลัง 'image '
        "FROM users " +
        "INNER JOIN profile_images ON users.user_id = profile_images.user_id"
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
      `SELECT users.user_id, users.sex, users.name, users.age, users.email, users.city, users.location, users.sex_identities, 
            users.sexual_preferences,users.racial_preferences, users.meeting_interests, profile_images.image, users.about_me
            FROM users
            INNER JOIN profile_images ON users.user_id = profile_images.user_id
            LEFT JOIN match_users ON
              (users.user_id = match_users.user_id_1 AND $1 = match_users.user_id_2) OR
              (users.user_id = match_users.user_id_2 AND $1 = match_users.user_id_1)
            WHERE match_users.user_id_1 IS not NULL OR match_users.user_id_2 IS not NULL AND users.user_id != $1
            `,
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

userRouter.get("/unmatchlist/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `SELECT users.user_id, users.sex, users.name, users.age, users.date_of_birth, users.email, users.city, users.location, users.sex_identities, 
            users.sexual_preferences,users.racial_preferences, users.meeting_interests, profile_images.image, users.about_me
            FROM users
            INNER JOIN profile_images ON users.user_id = profile_images.user_id
            LEFT JOIN match_users ON
              (users.user_id = match_users.user_id_1 AND $1 = match_users.user_id_2) OR
              (users.user_id = match_users.user_id_2 AND $1 = match_users.user_id_1)
            WHERE (match_users.user_id_1 IS NULL OR match_users.user_id_2 IS NULL) AND users.user_id != $1
            `,
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

userRouter.post("/like/:liked_user_id", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.decode(token.replace("Bearer ", ""));
    const user_id = userInfo.id;

    const { liked_user_id } = req.params;

    console.log("user_id:", user_id);
    console.log("liked_user_id:", liked_user_id);

    await pool.query(
      `INSERT INTO merry_lists (user_interest, user_response) VALUES ($1, $2)`,
      [user_id, liked_user_id]
    );

    res.json({ message: "Like added successfully" });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Error adding like" });
  }
});

userRouter.post("/ismatch/:liked_user_id", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.decode(token.replace("Bearer ", ""));
    const user_id = userInfo.id;

    const { liked_user_id } = req.params;

    const result = await pool.query(
      `SELECT user_response FROM merry_lists WHERE user_interest = $1 AND user_response = $2`,
      [liked_user_id, user_id]
    );

    if (result.rows.length > 0) {
      await pool.query(
        `INSERT INTO match_users (user_id_1, user_id_2) VALUES ($1, $2)`,
        [user_id, liked_user_id]
      );

      await pool.query(
        `INSERT INTO conversations (client1_id, client2_id) VALUES ($1, $2)`,
        [user_id, liked_user_id]
      );

      res.json({ message: "User is matched" });
    } else {
      res.json({ message: "User is not matched" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.post("/unmatch/:matched_user_id", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.decode(token.replace("Bearer ", ""));
    const user_id = userInfo.id;

    const { matched_user_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM match_users WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1)`,
      [user_id, matched_user_id]
    );

    if (result.rows.length > 0) {
      await pool.query(
        `DELETE FROM match_users WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1)`,
        [user_id, matched_user_id]
      );

      res.json({
        message: `User with ID ${matched_user_id} has been unmatched`,
      });
    } else {
      res.json({ message: "No match found with the specified user" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.get("/conversationlist/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `
        SELECT users.user_id, users.sex, users.name, profile_images.image, users.about_me, conversations.conversation_id, conversations.client1_id, conversations.client2_id
        FROM users
        INNER JOIN profile_images ON users.user_id = profile_images.user_id
        LEFT JOIN conversations ON
    (users.user_id = conversations.client1_id AND $1 = conversations.client2_id) OR
    (users.user_id = conversations.client2_id AND $1 = conversations.client1_id)
    WHERE (conversations.client1_id IS NOT NULL OR conversations.client2_id IS NOT NULL) AND users.user_id != $1
      `,
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

userRouter.get("/conversation/:conversation_id", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.decode(token.replace("Bearer ", ""));
    const user_id = userInfo.id;
    // user_id -> sender_id
    //
    const { conversation_id } = req.params;

    const result = await pool.query(
      `
      select
      users.user_id as receiver_id,
      users.name as receiver_name,
      profile_images.image as receiver_image,
      conversations.conversation_id,
      conversations.client1_id,
      conversations.client2_id
    from
      users
      inner join profile_images on users.user_id = profile_images.user_id
      left join conversations on (
        users.user_id = conversations.client1_id
        and $1 = conversations.client2_id
      )
      or (
        users.user_id = conversations.client2_id
        and $1 = conversations.client1_id
      )
    where
      (
        conversations.client1_id is not null
        or conversations.client2_id is not null
      )
      and conversation_id = $2
      and users.user_id != $1
      and (
        users.user_id = conversations.client1_id
        or users.user_id = conversations.client2_id
      )
      `,
      [user_id, conversation_id]
    );
    res.json({
      data: result.rows[0],
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

userRouter.get("/conversationByReceiverId/:receiver_id", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.decode(token.replace("Bearer ", ""));
    const user_id = userInfo.id;
    // user_id -> sender_id
    //
    const { receiver_id } = req.params;

    const result = await pool.query(
      `
      select
        users.user_id as receiver_id,
        users.name as receiver_name,
        profile_images.image as receiver_image,
        conversations.conversation_id,
        conversations.client1_id,
        conversations.client2_id
      from
        users
        inner join profile_images on users.user_id = profile_images.user_id
        left join conversations on 
        (
          users.user_id = conversations.client1_id
          and $1 = conversations.client2_id
        )
        or 
        (
          users.user_id = conversations.client2_id
          and $1 = conversations.client1_id
        )
      where
        (
          conversations.client1_id is not null
          or conversations.client2_id is not null
        )
        and users.user_id != $1
        and (
          users.user_id = $2
          or users.user_id = $2
        )
      `,
      [user_id, receiver_id]
    );
    res.json({
      data: result.rows[0],
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
  }
});

userRouter.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      "SELECT users.user_id, users.sex, users.username, users.age, users.email, users.name, profile_images.image " +
        "FROM users " +
        "INNER JOIN profile_images ON users.user_id = profile_images.user_id " +
        "WHERE users.user_id = $1",
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

userRouter.get("/fetchMessages/:conversation_id", async (req, res) => {
  try {
    const { conversation_id } = req.params;

    const queryString = `select * from messages where conversation_id = $1`;

    const resultSelectMessages = await pool.query(queryString, [
      conversation_id,
    ]);
    console.log("from fetch messages", resultSelectMessages.rows);

    res.json({
      data: resultSelectMessages.rows,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อความ:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อความ" });
  }
});

userRouter.post("/messages", async (req, res) => {
  try {
    const queryString = ` insert into messages (conversation_id, sender_id, receiver_id, text, create_at)
      values ($1, $2, $3, $4, $5)`;
    const resultInsertMessage = pool.query(queryString, [
      req.body.conversation_id,
      req.body.sender_id,
      req.body.receiver_id,
      req.body.text,
      new Date(),
    ]);

    res.json({
      message: "Store message has been registered successfully.",
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเก็บข้อความ:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเก็บข้อความ" });
  }
});

export default userRouter;
