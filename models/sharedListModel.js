

// import { DataTypes, Model } from "sequelize";

// import sequelize from "../config/db.js"


// class SharedList extends Model {}

// SharedList.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     tripId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "trips", // make sure this matches your Trips table name
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     sharedByUserId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "users", // make sure this matches your Users table name
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     shareToken: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     permission: {
//       type: DataTypes.ENUM("view", "edit"),
//       allowNull: false,
//       defaultValue: "view",
//     },
//     expiresAt: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     modelName: "SharedList",
//     tableName: "shared_lists",
//     timestamps: true,
//   }
// );

// export default SharedList;
// // trigger
