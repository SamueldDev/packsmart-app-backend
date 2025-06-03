

// models/index.js
import sequelize from "../config/db.js";

import Checklist from "./checklistModel.js";
import ChecklistItem from "./CheckListItemModel.js"

import SharedList from "./sharinglistModel.js";

import PackingItem from "./PackingItemModel.js";

import Trip from "./TripModel.js";

import User from "./userModel.js";

// Setup associations
User.hasMany(Checklist, { foreignKey: "userId", onDelete: "CASCADE" });
Checklist.belongsTo(User, { foreignKey: "userId" });

Checklist.hasMany(ChecklistItem, { foreignKey: "checklistId", onDelete: "CASCADE" });
ChecklistItem.belongsTo(Checklist, { foreignKey: "checklistId" });



Trip.hasMany(PackingItem, { foreignKey: "tripId", as: "items", onDelete: "CASCADE" });
PackingItem.belongsTo(Trip, { foreignKey: "tripId" });



// Trip.hasMany(PackingItem, { foreignKey: "tripId" });
// PackingItem.belongsTo(Trip, { foreignKey: "tripId" });

SharedList.belongsTo(Trip, { foreignKey: "tripId", as: "trip" });

Trip.hasMany(SharedList, { foreignKey: "tripId", as: "sharedLists" });

export { sequelize, Checklist, ChecklistItem, User, PackingItem };
