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
complaintRouter.get("/", async (req, res) => {
  try {
    const query =
      "SELECT c.complaint_id, c.user_id, u.username, c.issue, c.description, c.status, DATE(c.date_submitted) AS date_submitted FROM complaint c INNER JOIN users u ON c.user_id = u.user_id";
    const result = await pool.query(query);

    if (result.rowCount > 0) {
      const complaints = result.rows.map((complaint) => ({
        complaint_id: complaint.complaint_id,
        user_id: complaint.user_id,
        username: complaint.username,
        issue: complaint.issue,
        description: complaint.description,
        status: complaint.status,
        date_submitted: complaint.date_submitted.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      }));

      res.status(200).json(complaints);
    } else {
      res.status(404).json({ message: "No complaints found" });
    }
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default complaintRouter;
