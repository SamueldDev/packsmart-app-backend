
import express from "express";
import runReminderJob from "../jobs/reminderJobs.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await runReminderJob();
    res.json({ message: "Reminder job ran successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Failed to run reminder job", error: error.message });
  }
});

export default router;