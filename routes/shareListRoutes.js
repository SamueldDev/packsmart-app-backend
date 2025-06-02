



import express from "express";
// import {
//   createShareableLink,
//   getSharedListByToken,
//   revokeSharedList,
// } from "../controllers/sharedListController.js";


import { 
    createShareableLink,
    getSharedListByToken,
    revokeSharedList

 } from "../controllers/shareListController.js";

const router = express.Router();

router.post("/", createShareableLink);
router.get("/:token", getSharedListByToken);
router.delete("/:id", revokeSharedList);

export default router;
