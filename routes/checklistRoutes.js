


import express from "express";
import {
  getPreMadeChecklists,
  createPreMadeChecklist,
  createCustomChecklist,
  getUserChecklists,
  toggleChecklistItem,
  deleteChecklist,
  getSmartSuggestions,
  copyPreMadeChecklist,
  useChecklist,
  cloneChecklist
} from "../controllers/checkListController.js"

import { protectedAction } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/Admin.js";

const router = express.Router();

// Pre-made checklists
router.post("/premade", protectedAction, adminOnly, createPreMadeChecklist);
router.get("/premade", protectedAction, getPreMadeChecklists);
router.post("/:id/copy", protectedAction, copyPreMadeChecklist);

// User custom checklists
router.post("/", protectedAction, createCustomChecklist);
router.get("/",protectedAction, getUserChecklists);


//clone checklist before copying into packinglistitems
router.post("/:checklistId/clone", protectedAction, cloneChecklist)

// copy checklist items from custom or premadechecklist into packinglist
router.post("/:checklistId/use", protectedAction, useChecklist)

// Update item check/uncheck
router.patch("/item/:itemId", protectedAction, toggleChecklistItem);

// Delete checklist
router.delete("/:checklistId", protectedAction, deleteChecklist);

// smart suggestion based on history
router.get("/suggestions/:userId", protectedAction, getSmartSuggestions)

export default router;
