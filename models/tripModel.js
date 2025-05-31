


import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.js";

import User from "./userModel.js";

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tripType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Trip",
    tableName: "trips",
    timestamps: true,
  }
);

// Define relation: One User can have many Trips
User.hasMany(Trip, { foreignKey: "userId", onDelete: "CASCADE" });
Trip.belongsTo(User, { foreignKey: "userId" });

export default Trip;
