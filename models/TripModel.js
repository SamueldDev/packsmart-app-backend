


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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
      name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tripType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    destinationCity: {
    type: DataTypes.STRING,
    allowNull: false,
    },

    destinationCountry: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [2, 2], // Expect ISO 2-letter country codes like 'US', 'ES', 'FR'
  },
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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

// Associations
User.hasMany(Trip, { foreignKey: "userId", onDelete: "CASCADE" });
Trip.belongsTo(User, { foreignKey: "userId" });

export default Trip;
