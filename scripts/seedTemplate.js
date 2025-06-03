
import sequelize from "../config/db.js";

import ChecklistTemplate from "../models/checklistTemplateModel.js";
import TemplateItem from "../models/TemplateItem.js";

const templates = [
  {
    name: "Vacation",
    tripType: "Vacation",
    items: [
      { name: "Sunscreen", quantity: 1, category: "Toiletries" },
      { name: "Swimwear", quantity: 1, category: "Clothing" },
      { name: "Sunglasses", quantity: 1, category: "Accessories" },
    ],
  },
  {
    name: "Business",
    tripType: "Business",
    items: [
      { name: "Laptop", quantity: 1, category: "Electronics" },
      { name: "Formal Shoes", quantity: 1, category: "Clothing" },
      { name: "Business Cards", quantity: 20, category: "Office" },
    ],
  },
  {
    name: "Camping",
    tripType: "Adventure",
    items: [
      { name: "Tent", quantity: 1, category: "Gear" },
      { name: "Flashlight", quantity: 1, category: "Gear" },
      { name: "Sleeping Bag", quantity: 1, category: "Gear" },
    ],
  },
  {
    name: "Winter Travel",
    tripType: "Winter",
    items: [
      { name: "Winter Coat", quantity: 1, category: "Clothing" },
      { name: "Gloves", quantity: 1, category: "Clothing" },
      { name: "Thermal Wear", quantity: 1, category: "Clothing" },
    ],
  },
  {
    name: "International Trip",
    tripType: "International",
    items: [
      { name: "Passport", quantity: 1, category: "Documents" },
      { name: "Travel Adapter", quantity: 1, category: "Electronics" },
      { name: "Local Currency", quantity: 1, category: "Essentials" },
    ],
  },
];

const seedTemplates = async () => {
  try {
    await sequelize.sync();

    for (const template of templates) {
      const [createdTemplate, created] = await ChecklistTemplate.findOrCreate({
        where: { name: template.name },
        defaults: { tripType: template.tripType },
      });

      for (const item of template.items) {
        await TemplateItem.findOrCreate({
          where: {
            name: item.name,
            templateId: createdTemplate.id,
          },
          defaults: {
            quantity: item.quantity,
            category: item.category,
          },
        });
      }
    }

    console.log("✅ Templates seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding templates:", error);
    process.exit(1);
  }
};

seedTemplates();