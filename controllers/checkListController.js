

import Checklist from "../models/checklistModel.js";
import ChecklistItem from "../models/CheckListItemModel.js";


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




// Optional route: POST /api/checklists/premade (admin use)
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







// CREATE a custom checklist for a user
export const createCustomChecklist = async (req, res) => {
  const { userId, name, tripType, items } = req.body;
  try {
    const checklist = await Checklist.create({ userId, name, tripType, isPreMade: false });
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



// GET custom checklists by user
export const getUserChecklists = async (req, res) => {
  const { userId } = req.params;
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
  const { checklistId } = req.params;
  try {
    await Checklist.destroy({ where: { id: checklistId } });
    res.json({ message: "Checklist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// get smart suggestion
export const getSmartSuggestions = async (req, res) => {
  const { userId } = req.params;
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

