


import express from "express";

import { 
    addPackingItem,
    getPackingItems,
    updatePackingItem,
    deletePackingItem,
    createPackingItemsBulk

 } from "../controllers/packingListController.js";

 import { protectedAction } from "../middlewares/authMiddleware.js" 

// import authenticate from "../middlewares/authMiddleware.js" // ensure user is logged in


const router = express.Router();

// ✅ POST /api/packing-items — Add a new item
router.post("/", protectedAction,  addPackingItem);


// 📄 GET /api/packing-items/:tripId — Get all items for a trip
router.get("/:tripId", protectedAction,  getPackingItems);


// 🖊️ PUT /api/packing-items/:id — Update a packing item
router.put("/:id", protectedAction,  updatePackingItem);


// ❌ DELETE /api/packing-items/:id — Delete a packing item
router.delete("/:id", protectedAction,  deletePackingItem);


router.post("/bulk", protectedAction, createPackingItemsBulk)



export default router;
