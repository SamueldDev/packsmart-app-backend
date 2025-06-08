

import express from "express"

import { getAllTemplates, copyTemplateToTrip } from "../controllers/templateController.js";
// import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllTemplates);
router.post("/:id/copy",  copyTemplateToTrip);

export default router;