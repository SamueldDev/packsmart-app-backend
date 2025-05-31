


import express from "express";
import {
  getPreMadeChecklists,
  createPreMadeChecklist,
  createCustomChecklist,
  getUserChecklists,
  toggleChecklistItem,
  deleteChecklist,
  getSmartSuggestions,
} from "../controllers/checkListController.js"

const router = express.Router();

// Pre-made checklists
router.post("/premade", createPreMadeChecklist);
router.get("/premade", getPreMadeChecklists);

// User custom checklists
router.post("/", createCustomChecklist);
router.get("/user/:userId", getUserChecklists);

// Update item check/uncheck
router.patch("/item/:itemId", toggleChecklistItem);

// Delete checklist
router.delete("/:checklistId", deleteChecklist);

// smart suggestion based on history
router.get("/suggestions/:userId", getSmartSuggestions)

export default router;
