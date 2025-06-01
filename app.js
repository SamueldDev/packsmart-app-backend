
import express from "express";

// import sequelize from "./config/db.js";
import { sequelize } from "./models/index.js"

import usersRoutes from "./routes/usersRoutes.js"
import tripRoutes from "./routes/tripRoutes.js"

import checklistRoutes from "./routes/checklistRoutes.js"

const PORT = process.env.PORT || 5000;  


// initialize the app
const app = express();


app.use(express.json());


// routes
app.use("/api/users", usersRoutes)
app.use("/api/trips", tripRoutes)
app.use("/api/checklists", checklistRoutes)


// start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true }); // or { force: true } in dev to reset tables
    //await sequelize.sync({ force: true }); // ⚠️ This will drop and recreate all tables


    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

export default app;
