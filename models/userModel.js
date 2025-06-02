


import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
      fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
      phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false, // all users MUST provide phoneNumber
      validate: {
        is: /^\+\d{10,15}$/i,
      }
    },

    preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
      // store user preferences here as JSON object
    },
  },
  {
    sequelize,
    modelName: "User", 
    tableName: "users",
    timestamps: true,
  }
);

export default User;
