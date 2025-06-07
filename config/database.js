import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Username
  process.env.DB_PASSWORD,  // Password
  {
    host: process.env.DB_HOST,        // e.g. 'localhost'
    dialect: process.env.DB_DIALECT,  // e.g. 'postgres', 'mysql', etc.
    logging: Boolean(process.env.DB_LOGGING) // Enables/disables SQL query logging
  }
);