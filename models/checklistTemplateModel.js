

// // models/checklistTemplateModel.js
// import { DataTypes, Model } from "sequelize";
// import sequelize from "../config/db.js";

// class ChecklistTemplate extends Model {}

// ChecklistTemplate.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     tripType: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "ChecklistTemplate",
//     tableName: "checklist_templates",
//     timestamps: true,
//   }
// );

// export default ChecklistTemplate;
