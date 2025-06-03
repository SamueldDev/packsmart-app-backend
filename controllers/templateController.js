

import ChecklistTemplate from "../models/checklistTemplateModel.js";

import TemplateItem from "../models/TemplateItem.js";

import PackingItem from "../models/PackingItemModel.js";


export const getAllTemplates = async (req, res) => {
  try {
    const templates = await ChecklistTemplate.findAll({
      include: [{ model: TemplateItem, as: "items" }],
    });
    res.json({ templates });
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};





export const copyTemplateToTrip = async (req, res) => {
  try {
    const { templateId, tripId } = req.body;

    const items = await TemplateItem.findAll({ where: { templateId } });

    const newItems = items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      tripId,
    }));

    await PackingItem.bulkCreate(newItems);

    res.status(201).json({ message: "Template items added to trip" });
  } catch (error) {
    console.error("Failed to copy template:", error);
    res.status(500).json({ message: "Failed to copy template" });
  }
};
