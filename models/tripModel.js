// models/tripModel.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js'; 
import { User } from './userModel.js';

export class Trip extends Model {
}

Trip.init(
  {
    id: {
    type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tripType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: 'Trip',
    tableName: 'trips',
    timestamps: true, // includes createdAt and updatedAt
    underscored: true // maps created_at and updated_at
  }
);

// Define association
Trip.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Trip, { foreignKey: 'user_id' });
