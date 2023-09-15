import { Router } from "express";
import { pool } from "../utils/db.js";

const complaintRouter = Router();

complaintRouter.post("/", async (req, res) => {
  const { user_id, issue, description, dateSubmitted } = req.body;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateSubmitted)) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }

  try {
    const query =
      "INSERT INTO complaint (user_id, issue, description, date_submitted) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [user_id, issue, description, dateSubmitted];

    const result = await pool.query(query, values);

    if (result.rowCount === 1) {
      res.status(201).json({ message: "Complaint created successfully" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default complaintRouter;
