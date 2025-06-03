

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

    // Validate required input
    if (!templateId || !tripId) {
      return res.status(400).json({ message: "templateId and tripId are required" });
    }

    // Check if the template exists
    const template = await ChecklistTemplate.findByPk(templateId);
    if (!template) {
      return res.status(404).json({ message: "Checklist template not found" });
    }

    // Check if the trip exists and belongs to the user
    const trip = await Trip.findOne({ where: { id: tripId, userId: req.user.id } });
    if (!trip) {
      return res.status(403).json({ message: "Trip not found or not owned by user" });
    }

    // Get template items
    const items = await TemplateItem.findAll({ where: { templateId } });

    // Transform for bulk creation
    const newItems = items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      tripId,
    }));

    // Insert items into PackingItem
    await PackingItem.bulkCreate(newItems);

    res.status(201).json({ message: "Template items copied to trip successfully" });

  } catch (error) {
    console.error("Failed to copy template:", error);
    res.status(500).json({ message: "Failed to copy template", error: error.message });
  }
};
