

// models/index.js
import sequelize from "../config/db.js";

import Checklist from "./checklistModel.js";
import ChecklistItem from "./CheckListItemModel.js"


import PackingItem from "./PackingItemModel.js";

import Trip from "./TripModel.js";

import User from "./userModel.js";

// Setup associations
User.hasMany(Checklist, { foreignKey: "userId", onDelete: "CASCADE" });
Checklist.belongsTo(User, { foreignKey: "userId" });

Checklist.hasMany(ChecklistItem, { foreignKey: "checklistId", onDelete: "CASCADE" });
ChecklistItem.belongsTo(Checklist, { foreignKey: "checklistId" });



Trip.hasMany(PackingItem, { foreignKey: "tripId", onDelete: "CASCADE" });
PackingItem.belongsTo(Trip, { foreignKey: "tripId" });



// Trip.hasMany(PackingItem, { foreignKey: "tripId" });
// PackingItem.belongsTo(Trip, { foreignKey: "tripId" });



export { sequelize, Checklist, ChecklistItem, User, PackingItem };
