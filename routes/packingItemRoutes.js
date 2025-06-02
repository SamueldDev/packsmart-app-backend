


import express from "express";

import { 
    addPackingItem,
    getPackingItems,
    updatePackingItem,
    deletePackingItem

 } from "../controllers/packingListController.js";


import authenticate from "../middlewares/authMiddleware.js" // ensure user is logged in


const router = express.Router();

// ✅ POST /api/packing-items — Add a new item
router.post("/", authenticate, addPackingItem);


// 📄 GET /api/packing-items/:tripId — Get all items for a trip
router.get("/:tripId", authenticate, getPackingItems);


// 🖊️ PUT /api/packing-items/:id — Update a packing item
router.put("/:id", authenticate, updatePackingItem);


// ❌ DELETE /api/packing-items/:id — Delete a packing item
router.delete("/:id", authenticate, deletePackingItem);


export default router;
