import { Router } from "express";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";


const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT users.user_id, users.sex, users.username, users.age, users.email, users.package_id, users.name, profile_images.image " + // ใส่ช่องว่างหลัง 'image '
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
            WHERE match_users.user_id_1 IS not NULL OR match_users.user_id_2 IS not NULL
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
            `SELECT users.user_id, users.sex, users.name, users.age, users.email, users.city, users.location, users.sex_identities, 
            users.sexual_preferences,users.racial_preferences, users.meeting_interests, profile_images.image, users.about_me
            FROM users
            INNER JOIN profile_images ON users.user_id = profile_images.user_id
            LEFT JOIN match_users ON
              (users.user_id = match_users.user_id_1 AND $1 = match_users.user_id_2) OR
              (users.user_id = match_users.user_id_2 AND $1 = match_users.user_id_1)
            WHERE match_users.user_id_1 IS NULL OR match_users.user_id_2 IS NULL
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

userRouter.post('/like/:liked_user_id', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const userInfo = jwt.decode(token.replace("Bearer ", ""));
        const user_id = userInfo.id;

        const { liked_user_id } = req.params;

        console.log('user_id:', user_id);
        console.log('liked_user_id:', liked_user_id);

        await pool.query(
            `INSERT INTO merry_lists (user_interest, user_response) VALUES ($1, $2)`,
            [user_id, liked_user_id]
        );


        res.json({ message: 'Like added successfully' });
    } catch (error) {
        console.error('Error adding like:', error);
        res.status(500).json({ error: 'Error adding like' });
    }
});

userRouter.post('/ismatch/:liked_user_id', async (req, res) => {
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

            res.json({ message: "User is matched" });
        } else {
            res.json({ message: "User is not matched" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





export default userRouter;
