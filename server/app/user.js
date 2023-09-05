import { Router } from "express";
import { pool } from "../utils/db.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT users.user_id, users.sex, users.username, users.age, users.email, users.package_id, users.name, profile_images.image FROM users INNER JOIN profile_images ON users.user_id = profile_images.user_id;");
        res.json({
            data: result.rows,
        });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการร้องขอข้อมูล:", error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการร้องขอข้อมูล" });
    }
});


export default userRouter;