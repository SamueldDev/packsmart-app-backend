

import express from "express";
import sequelize from "./config/db.js";

import usersRoutes from "./routes/usersRoutes.js"
import tripRoutes from "./routes/tripRoutes.js"


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;  


// routes
app.use("/api/users", usersRoutes)
app.use("/api/trips", tripRoutes)


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true }); // or { force: true } in dev to reset tables

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

export default app;
