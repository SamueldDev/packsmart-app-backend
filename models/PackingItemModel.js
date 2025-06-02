

// models/PackingItemModel.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class PackingItem extends Model {}

PackingItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tripId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    packed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category: {
      type: DataTypes.STRING, // e.g., clothes, electronics, toiletries
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PackingItem",
    tableName: "packing_items",
    timestamps: true,
  }
);

export default PackingItem;
