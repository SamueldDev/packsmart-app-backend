

import Checklist from "../models/checklistModel.js";
import ChecklistItem from "../models/CheckListItemModel.js";
import User from "../models/userModel.js";
import sequelize from "../config/db.js";
import Trip from "../models/TripModel.js";
import { Op } from "sequelize";
import PackingItem from "../models/PackingItemModel.js";




//  POST /api/checklists/premade (admin use)
export const createPreMadeChecklist = async (req, res) => {
  const { name, tripType, items } = req.body;
  try {
    const checklist = await Checklist.create({ name, tripType, isPreMade: true });

    if (items && items.length > 0) {
      const checklistItems = items.map((item) => ({
        item,
        checklistId: checklist.id,
      }));
      await ChecklistItem.bulkCreate(checklistItems);
    }

    const fullChecklist = await Checklist.findByPk(checklist.id, {
      include: [ChecklistItem],
    });
    res.status(201).json(fullChecklist);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};


// GET all pre-made checklists (no userId, isPreMade: true)
export const getPreMadeChecklists = async (req, res) => {
  const { tripType } = req.query; // e.g. ?tripType=Vacation
  const whereClause = { isPreMade: true };
  if (tripType) whereClause.tripType = tripType;

  try {
    const checklists = await Checklist.findAll({
      where: whereClause,
      include: [ChecklistItem],
    });
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// copyPremade checklist to user checklists
export const copyPreMadeChecklist = async (req, res) => {
  const checklistId = req.params.id;
  const { tripId } = req.body;

  try {
    // Check trip ownership
    const trip = await Trip.findOne({ where: { id: tripId, userId: req.user.id } });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found or not owned by user" });
    }

    // Find the pre-made checklist
    const preMade = await Checklist.findOne({
      where: { id: checklistId, isPreMade: true },
      include: [ChecklistItem],
    });

    if (!preMade) {
      return res.status(404).json({ message: "Pre-made checklist not found" });
    }

    // Copy checklist into user's account (not isPreMade)
    const userChecklist = await Checklist.create({
      userId: req.user.id,
      name: preMade.name,
      tripType: preMade.tripType,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      duration: trip.duration,
      isPreMade: false,
    });

    // Copy items
    const copiedItems = preMade.ChecklistItems.map((item) => ({
      item: item.item,
      checklistId: userChecklist.id,
    }));

    await ChecklistItem.bulkCreate(copiedItems);

    res.status(201).json({ message: "Checklist copied", checklist: userChecklist });
  } catch (error) {
    console.error("Failed to copy checklist", error);
    res.status(500).json({ message: "Failed to copy checklist", error: error.message });
  }
};






// CREATE a custom checklist for a user
export const createCustomChecklist = async (req, res) => {

  const userId = req.user.id;
  const {
  
    name,
    tripType,
    destination,
    duration,
    startDate,
    endDate,
    items,
  } = req.body;

  const t = await sequelize.transaction();

  try {

     const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const checklist = await Checklist.create({
      userId,
      name,
      tripType,
      destination,
      duration,
      startDate,
      endDate,
      items,
      isPreMade: false,
    },{ transaction: t });

    console.log("Checklist created with ID:", checklist.id);

      const itemsWithChecklistId = items.map(item => ({
      item: typeof item === "string" ? item : item.item,
      checklistId: checklist.id,
    }));
    
    await ChecklistItem.bulkCreate(itemsWithChecklistId, { transaction: t });

    // Step 3: commit
    await t.commit();

    res.status(201).json({ message: "Checklist created", checklist });


  } catch (error) {
     await t.rollback();
    console.error("Transaaction failed", error);
    res.status(500).json({ message: error.message });

 
  }
};




// GET custom checklists by user
export const getUserChecklists = async (req, res) => {
  // const { userId } = req.params;

  const userId = req.user.id;

  try {
    const checklists = await Checklist.findAll({
      where: { userId, isPreMade: false },
      include: [ChecklistItem],
    });
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a checklist item (check/uncheck)
export const toggleChecklistItem = async (req, res) => {
  const { itemId } = req.params;
  const { checked } = req.body;
  try {
    const item = await ChecklistItem.findByPk(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.checked = checked;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE a custom checklist
export const deleteChecklist = async (req, res) => {
  const userId = req.user.id;
  const { checklistId } = req.params;

  try {
     const checklist = await Checklist.findByPk(checklistId);

    if (!checklist) {
      return res.status(404).json({ message: "Checklist not found" });
    }

    // Check ownership
    if (checklist.userId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this checklist" });
    }

    await checklist.destroy();
    res.json({ message: "Checklist deleted" });

    // await Checklist.destroy({ where: { id: checklistId } });
    // res.json({ message: "Checklist deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// cloning the  checklist
export const cloneChecklist = async (req, res) => {
  const userId = req.user.id;
  const { checklistId } = req.params;
  const { name } = req.body;

  const t = await sequelize.transaction();

  try {
    const original = await Checklist.findOne({
      where: { id: checklistId, userId },
      include: [ChecklistItem],
    });

    if (!original) {
      await t.rollback();
      return res.status(404).json({ message: "Original checklist not found" });
    }

    // Step 1: Clone checklist
    const clonedChecklist = await Checklist.create({
      userId,
      name: name || `${original.name} (Copy)`,
      tripType: original.tripType,
      destination: original.destination,
      duration: original.duration,
      startDate: original.startDate,
      endDate: original.endDate,
      isPreMade: false,
    }, { transaction: t });

    // Step 2: Clone items
    const clonedItems = original.ChecklistItems.map(item => ({
      item: item.item,
      checklistId: clonedChecklist.id,
    }));

    await ChecklistItem.bulkCreate(clonedItems, { transaction: t });

    await t.commit();

    res.status(201).json({
      message: "Checklist cloned",
      checklist: clonedChecklist,
    });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};




// load checklistitems into packingitems
// export const useChecklist = async (req, res) => {
//   const userId = req.user.id;
//   const checklistId = req.params.id;
//   const { tripId } = req.body;

//   try {
//     // 1. Verify that the trip belongs to the user
//     const trip = await Trip.findOne({ where: { id: tripId, userId } });
//     if (!trip) {
//       return res.status(404).json({ message: "Trip not found or not owned by user" });
//     }

//     // 2. Fetch the checklist (must be pre-made or user's custom)
//     const checklist = await Checklist.findByPk(checklistId, {
//       include: [ChecklistItem],
//     });

//     if (!checklist) {
//       return res.status(404).json({ message: "Checklist not found" });
//     }

//     // 3. Convert checklist items to packing items
//     const packingItemsToCreate = checklist.ChecklistItems.map((item) => ({
//       tripId,
//       name: item.item, // or `item.name` depending on your model
//       quantity: 1, // default quantity
//       category: null,
//       note: null,
//     }));

//     const createdItems = await PackingItem.bulkCreate(packingItemsToCreate);

//     res.status(201).json({
//       message: "Checklist items copied to packing list",
//       items: createdItems,
//     });

//   } catch (error) {
//     console.error("Failed to copy checklist to packing items:", error);
//     res.status(500).json({ message: "Failed to copy checklist", error: error.message });
//   }
// };



//debuggign the loader
export const useChecklist = async (req, res) => {
  const userId = req.user.id;
  const checklistId = req.params.checklistId
  const { tripId } = req.body;

  try {

    // console.log("🔍 Received request to use checklist:", checklistId);
    // console.log("👤 User ID:", userId);
    // console.log("🧳 Trip ID:", tripId);

    // 1. Verify that the trip belongs to the user
    const trip = await Trip.findOne({ where: { id: tripId, userId } });
    if (!trip) {
      console.log("❌ Trip not found or not owned by user");
      return res.status(404).json({ message: "Trip not found or not owned by user" });
    }

    // 2. Fetch the checklist (must be pre-made or user's custom)
    const checklist = await Checklist.findOne({
      where: {
        id: checklistId,
        [Op.or]: [
          { userId },         // user's custom checklist
          { isPreMade: true } // public checklist
        ]
      },
      include: [ChecklistItem],
    });

    if (!checklist) {
      console.log("❌ Checklist not found for user or not pre-made");
      return res.status(404).json({ message: "Checklist not found" });
    }

    console.log("✅ Found checklist:", checklist.name || checklist.id);

    // 3. Convert checklist items to packing items
    const packingItemsToCreate = checklist.ChecklistItems.map((item) => ({
      tripId,
      name: item.item || item.name, // adapt depending on your model
      quantity: 1,
      category: null,
      note: null,
    }));

    const createdItems = await PackingItem.bulkCreate(packingItemsToCreate);

    console.log("📦 Created packing items:", createdItems.length);

    res.status(201).json({
      message: "Checklist items copied to packing list",
      items: createdItems,
    });

  } catch (error) {
    console.error("🚨 Failed to copy checklist to packing items:", error);
    res.status(500).json({ message: "Failed to copy checklist", error: error.message });
  }
};









// get smart suggestion
export const getSmartSuggestions = async (req, res) => {

  // const { userId } = req.params;
  const userId = req.user.id;
  const { tripType } = req.query;

  try {
    const whereClause = {
      userId,
      isPreMade: false,
    };
    if (tripType) whereClause.tripType = tripType;

    const checklists = await Checklist.findAll({
      where: whereClause,
      include: [ChecklistItem],
    });

    // Count frequency of items
    const itemFrequency = {};
    for (const checklist of checklists) {
      for (const item of checklist.ChecklistItems) {
        const key = item.item.trim().toLowerCase();
        itemFrequency[key] = (itemFrequency[key] || 0) + 1;
      }
    }

    // Sort and return top N suggestions
    const suggestions = Object.entries(itemFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([item]) => item)
      .slice(0, 10); // Top 10 most used

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

