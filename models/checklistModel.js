



import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

import User from "./userModel.js";

class Checklist extends Model {}

Checklist.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tripType: {
      type: DataTypes.STRING,
      allowNull: true, // for pre-made checklists
    },
    isPreMade: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Checklist",
    tableName: "checklists",
    timestamps: true,
  }
);

// One user can have many custom checklists
User.hasMany(Checklist, { foreignKey: "userId", onDelete: "CASCADE" });
Checklist.belongsTo(User, { foreignKey: "userId" });

export default Checklist;