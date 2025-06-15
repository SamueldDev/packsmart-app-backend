


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
      name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
     role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // Can also be 'admin'
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cloudinaryPublicId: {
      type: DataTypes.STRING,
      allowNull: true
    }

  },
  {
    sequelize,
    modelName: "User", 
    tableName: "users",
    timestamps: true,

  }
);

export default User;
