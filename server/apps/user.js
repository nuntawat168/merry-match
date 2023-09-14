import { Router } from "express";
import { pool } from "../utils/db.js";

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
            `SELECT users.user_id, users.sex, users.name, users.age, users.email, users.city, users.location, users.sex_identities, users.sexual_preferences,users.racial_preferences, users.meeting_interests, profile_images.image
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
            `SELECT DISTINCT users.user_id, users.sex, users.name, users.age, users.email
            FROM users
            INNER JOIN profile_images ON users.user_id = profile_images.user_id
            INNER JOIN merry_lists ON users.user_id = merry_lists.user_interest OR users.user_id = merry_lists.user_response
            WHERE (merry_lists.merry_match_status IS NULL OR merry_lists.merry_match_status = FALSE) OR (merry_lists.merry_match_status = TRUE AND users.user_id != $1)
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





userRouter.post("/match/:user_interest/:user_response", async (req, res) => {
    try {
        const { user_interest, user_response } = req.params;

        const checkIfMatched = await pool.query(
            "SELECT * FROM merry_lists WHERE user_interest = $1 AND user_response = $2",
            [user_interest, user_response]
        );

        if (checkIfMatched.rows.length > 0) {
            await pool.query(
                "UPDATE merry_lists SET user_interest_action = TRUE WHERE user_interest = $1 AND user_response = $2",
                [user_interest, user_response]
            );
        }
        //     else {
        //     // ไม่มีการ match ระหว่าง user_interest และ user_response เราจะทำการแยกส่วน api ในส่วนนี้จะเกี่ยวข้องกับ การเพิ่มตารางของ user_interest ของคนที่เรากดถูกใจ
        //     // ต้องเขียนโลจิกต่อในหน้า client และแยกส่วน api เป็นกระบวนการจัดการอย่างมีระเบียบ
        //     await pool.query(
        //         "INSERT INTO merry_lists (user_interest, user_response, user_interest_action) VALUES ($1, $2, $3)",
        //         [user_interest, user_response, null]
        //     );

        //     // Set user_response_action to TRUE ตรงส่วนนี้ตอนแยก api อาจจะต้องมีการเปลี่ยนให้เป็น insert ร่วมกับด้านบนแทน
        //     await pool.query(
        //         "UPDATE users SET user_response_action = TRUE WHERE user_id = $1",
        //         [user_response]
        //     );
        // }


        await pool.query(
            "INSERT INTO merry_lists (user_interest, user_response, user_interest_action) VALUES ($1, $2, $3)",
            [user_interest, user_response, true]
        );


        const checkIfMatched2 = await pool.query(
            "SELECT user_response FROM merry_lists WHERE user_interest = $1 AND user_response = $2",
            [user_response, user_interest]
        );

        if (checkIfMatched2.rows.length > 0) {
            await pool.query(
                "UPDATE users SET user_response_action = TRUE WHERE user_id = $1",
                [user_interest]
            );
        } else {
            await pool.query(
                "INSERT INTO merry_lists (user_interest, user_response, user_response_action) VALUES ($1, $2, $3)",
                [user_interest, user_response, false]
            );
        }

        userRouter.post('/ismatch/:liked_user_id', async (req, res) => {
            try {
                const token = req.headers.authorization;
                const userInfo = jwt.decode(token.replace("Bearer ", ""));
                const user_id = userInfo.id;

                const { liked_user_id } = req.params;



                const result = await pool.query(
                    "INSERT INTO merry_lists (user_interest, user_response, user_interest_action) VALUES ($1, $2, $3)",
                    [user_interest, user_response, true]
                );

                const checkIfMatched = await pool.query(
                    "SELECT user_response FROM merry_lists WHERE user_interest = $1 AND user_response = $2",
                    [user_response, user_interest]
                );


                if (checkIfMatched.rows.length > 0) {
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

        const checkMatchStatus = async () => {
            const responseUser = await pool.query(
                "SELECT user_response_action FROM users WHERE user_id = $1",
                [user_response]
            );

            const interestUser = await pool.query(
                "SELECT user_interest_action FROM users WHERE user_id = $1",
                [user_interest]
            );

            const responseAction = responseUser.rows[0].user_response_action;
            const interestAction = interestUser.rows[0].user_interest_action;

            if (responseAction && interestAction) {
                await pool.query(
                    "UPDATE merry_lists SET merry_match_status = TRUE WHERE user_interest = $1 AND user_response = $2",
                    [user_interest, user_response]
                );
            } else {
                await pool.query(
                    "INSERT INTO merry_lists (user_interest, user_response, merry_match_status) VALUES ($1, $2, $3)",
                    [user_interest, user_response, false]
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