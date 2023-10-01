import { Router } from "express";
import { pool } from "../utils/db.js";
import { protect } from "../middlewares/protect.js";

const complaintRouter = Router();
complaintRouter.use(protect);

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
        date_submitted: complaint.date_submitted,
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

complaintRouter.put("/:complaintId/status", async (req, res) => {
  const { complaintId } = req.params;
  const { status, updated_at } = req.body;

  try {
    // Ensure that the status is one of the allowed values (e.g., "New", "Pending", "Resolved", "Cancel").
    const allowedStatuses = ["New", "Pending", "Resolved", "Cancel"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Update the status of the complaint with the given complaintId.
    const updateQuery =
      "UPDATE complaint SET status = $1, updated_at = $2 WHERE complaint_id = $3";
    const updateValues = [status, updated_at, complaintId];
    const updateResult = await pool.query(updateQuery, updateValues);

    if (updateResult.rowCount === 1) {
      return res
        .status(200)
        .json({ message: "Complaint status updated successfully" });
    } else {
      return res.status(404).json({ error: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

complaintRouter.get("/:complaintId", async (req, res) => {
  const { complaintId } = req.params;
  try {
    const query =
      "SELECT c.*, u.name FROM complaint c INNER JOIN users u ON c.user_id = u.user_id WHERE c.complaint_id = $1";
    const values = [complaintId];

    const result = await pool.query(query, values);

    if (result.rowCount === 1) {
      // Return the entire complaint object including the username
      const complaint = result.rows[0];
      res.status(200).json(complaint);
    } else {
      res.status(404).json({ message: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error fetching complaint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default complaintRouter;
