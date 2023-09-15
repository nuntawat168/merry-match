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
            `SELECT DISTINCT users.user_id, users.sex, users.name, users.age, users.email, users.city, users.location, users.sex_identities, users.sexual_preferences,users.racial_preferences, users.meeting_interests, profile_images.image
            FROM users
            INNER JOIN profile_images ON users.user_id = profile_images.user_id
            INNER JOIN merry_lists ON users.user_id = merry_lists.user_interest OR users.user_id = merry_lists.user_response
            WHERE (merry_lists.merry_match_status IS NULL OR merry_lists.merry_match_status = FALSE) OR (merry_lists.merry_match_status = TRUE AND users.user_id != $1)
            `,
            [user_id]

        );




        );

res.json({
    data: result.rows,
});
    } catch (error) {
    console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
}
});





export default userRouter;

// SELECT
//     users.user_id,
//     users.sex,
//     users.name,
//     users.age,
//     users.email,
//     hi.user_interest_name -- ข้อมูลจาก hobbies_interests
// FROM
//     users
// INNER JOIN
//     profile_images ON users.user_id = profile_images.user_id
// INNER JOIN
//     merry_lists ON users.user_id = merry_lists.user_interest OR users.user_id = merry_lists.user_response
// LEFT JOIN
//     match_users ON
//       (users.user_id = match_users.user_id_1 AND $1 = match_users.user_id_2) OR
//       (users.user_id = match_users.user_id_2 AND $1 = match_users.user_id_1)
// LEFT JOIN
//     user_hobbies_interests hi ON users.user_id = hi.user_id -- นำเข้า user_hobbies_interests
// LEFT JOIN
//     hobbies_interests h ON hi.hobby_interest_id = h.hobby_interest_id -- นำเข้า hobbies_interests
// WHERE
//     match_users.user_id_1 IS NULL OR match_users.user_id_2 IS NULL

// SELECT
// users.user_id,
//     users.sex,
//     users.name,
//     users.age,
//     users.email,
//     users.city,
//     users.location,
//     users.sex_identities,
//     users.sexual_preferences,
//     users.racial_preferences,
//     users.meeting_interests,
//     (
//         SELECT image FROM profile_images
//         WHERE profile_images.user_id = u.user_id
//       ),
// array_agg(hobby_interests.hobby_interest_name)

// FROM
// users
// INNER JOIN
//     users_hobbies_interests uhi ON u.user_id = uhi.user_id
// INNER JOIN
//     hobbies_interests hi ON uhi.hobby_interest_id = hi.hobby_interest_id

// LEFT JOIN
//     match_users ON
//     (users.user_id = match_users.user_id_1 AND $1 = match_users.user_id_2) OR
//         (users.user_id = match_users.user_id_2 AND $1 = match_users.user_id_1)
// WHERE
// match_users.user_id_1 IS NULL OR match_users.user_id_2 IS NULL
// GROUP BY
// u.user_id, u.username, u.email, u.name, u.sex, u.city, u.location, u.date_of_birth, u.sexual_preferences, u.racial_preferences, u.sex_identities, u.meeting_interests, about_me

// SELECT
//     users.user_id,
//     users.sex,
//     users.name,
//     users.age,
//     users.email,
//     users.city,
//     users.location,
//     users.sex_identities,
//     users.sexual_preferences,
//     users.racial_preferences,
//     users.meeting_interests,
//     (
//         SELECT image FROM profile_images 
//         WHERE profile_images.user_id = users.user_id
//     ),
//     array_agg(hobby_interests.hobby_interest_name)

// FROM
//     users
// INNER JOIN
//     users_hobbies_interests ON users.user_id = users_hobbies_interests.user_id
// INNER JOIN
//     hobbies_interests ON users_hobbies_interests.hobby_interest_id = hobbies_interests.hobby_interest_id

// LEFT JOIN
//     match_users ON
//     (users.user_id = match_users.user_id_1 AND $1 = match_users.user_id_2) OR
//     (users.user_id = match_users.user_id_2 AND $1 = match_users.user_id_1)
    
// WHERE
//     match_users.user_id_1 IS NULL OR match_users.user_id_2 IS NULL

// GROUP BY
//     users.user_id, users.sex, users.name, users.age, users.email, users.city, users.location, users.sex_identities, users.sexual_preferences, users.racial_preferences, users.meeting_interests, profile_images.image;




