// models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
 phoneNumber: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    is: /^\+\d{10,15}$/,
  }
  },
   profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  preferences: {
    type: DataTypes.JSONB,
    allowNull: true
  }
  }, {
  tableName: 'users',
  timestamps: true, // Automatically adds createdAt and updatedAt
  underscored: true // Optional: for created_at instead of createdAt
});
