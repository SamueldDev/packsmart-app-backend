

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

import express from "express";
import { sequelize } from "./models/index.js";
import usersRoutes from "./routes/usersRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";
import remainderjobsRoutes from "./routes/remainderjobsRoute.js"

import sharinglistRoute from "./routes/sharinglistRoute.js"

import authRoutes from "./routes/authRoutes.js";

import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/checklists", checklistRoutes);
app.use("/api/remainder", remainderjobsRoutes);
app.use("/api/sharedlists", sharinglistRoute);

// Test route
app.get("/", (req, res) => {
  res.send("PackSmart API is Live");
});

const startServer = async () => {
  try {
    console.log("🔄 Attempting to connect to the database...");

    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synced.");


    // await sequelize.sync({ force: true});
    // console.log("all tables dropped and recreated") 

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`); 

    //   runReminderJob().catch((err) =>
    //   console.error("Reminder job failed (non-blocking):", err)
    // );


  });

    // ✅ Keep app alive for debugging
    setInterval(() => {
      console.log("⏳ App is still running...");
    }, 10000);  

  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);  
  }
};

startServer();

export default app;
































// second
