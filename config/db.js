
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,        // database name
  process.env.DB_USER,        // username
  process.env.DB_PASSWORD,    // password
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,           // disable SQL logging in console (optional)
  }
);

export default sequelize;
