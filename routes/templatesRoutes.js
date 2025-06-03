

import express from "express"

import { getAllTemplates, copyTemplateToTrip } from "../controllers/templateController";

const router = express.Router();

router.get("/", getAllTemplates);
router.post("/copy", copyTemplateToTrip);

export default router;