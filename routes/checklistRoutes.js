


import express from "express";
import {
  getPreMadeChecklists,
  createPreMadeChecklist,
  createCustomChecklist,
  getUserChecklists,
  toggleChecklistItem,
  deleteChecklist,
  getSmartSuggestions,
  copyPreMadeChecklist
} from "../controllers/checkListController.js"

import { protectedAction } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/Admin.js";

const router = express.Router();

// Pre-made checklists
router.post("/premade", protectedAction, adminOnly, createPreMadeChecklist);
router.get("/premade", protectedAction, getPreMadeChecklists);

// User custom checklists
router.post("/", protectedAction, createCustomChecklist);
router.get("/",protectedAction, getUserChecklists);
router.post("/:id/copy", protectedAction, copyPreMadeChecklist);


// Update item check/uncheck
router.patch("/item/:itemId", protectedAction, toggleChecklistItem);

// Delete checklist
router.delete("/:checklistId", protectedAction, deleteChecklist);

// smart suggestion based on history
router.get("/suggestions/:userId", protectedAction, getSmartSuggestions)

export default router;
