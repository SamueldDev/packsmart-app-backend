



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

// temporary test route for railway
app.get("/", (req, res) => {
  res.send("PackSmart API is Live")
})


// start server
const startServer = async () => {
  try {
    console.log("🔄 Attempting to connect to the database...");

    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); // or { force: true } in dev to reset tables
    //await sequelize.sync({ force: true }); // ⚠️ This will drop and recreate all tables
     console.log("✅ Database synced.");



    app.listen(PORT, () => 
      console.log(`Server running on port ${PORT}`));
      // console.log("✅ Listening confirmed");

    //   setInterval(() => {
    //   console.log("⏳ App is still running...");
    // }, 15000);

  
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.error(error.name, error.message); // basic error info
    console.error(error.stack);               // full stack trace
    process.exit(1); // exit to ensure Railway shuts down cleanly
  }


};

startServer();

export default app;




process.on('exit', (code) => {
  console.log('👋 App is exiting with code:', code);
});

process.on('SIGTERM', () => {
  console.log('❗ Received SIGTERM, shutting down...');
});


process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});
