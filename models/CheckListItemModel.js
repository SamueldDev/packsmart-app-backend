

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

import Checklist from "./checklistModel.js";


class ChecklistItem extends Model {}
ChecklistItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    checklistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'checklists', // Must match tableName in Checklist
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: "ChecklistItem",
    tableName: "checklist_items",
    timestamps: true,
  }
);

// One checklist can have many items

// ChecklistItem.belongsTo(Checklist, { foreignKey: "checklistId" });
// Checklist.hasMany(ChecklistItem, { foreignKey: "checklistId", onDelete: "CASCADE" });










// ChecklistItem.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     item: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     checked: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "ChecklistItem",
//     tableName: "checklist_items",
//     timestamps: true,
//   }
// );



export default ChecklistItem;
