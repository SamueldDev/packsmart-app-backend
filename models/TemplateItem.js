


// models/templateItemModel.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class TemplateItem extends Model {}

TemplateItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    templateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "checklist_templates",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    category: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "TemplateItem",
    tableName: "template_items",
    timestamps: true,
  }
);

export default TemplateItem;
