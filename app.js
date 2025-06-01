
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});

import express from "express";
import http from "http"; // 🔧 Import http module

import { sequelize } from "./models/index.js";

import usersRoutes from "./routes/usersRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";

const PORT = process.env.PORT || 5000;

// Initialize the app
const app = express();

app.use(express.json());

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/checklists", checklistRoutes);

// Root route for Railway test
app.get("/", (req, res) => {
  console.log("✅ GET / hit");
  res.send("PackSmart API is Live");
});

// Create HTTP server
const server = http.createServer(app);

// Start server
const startServer = async () => {
  try {
    console.log("🔄 Attempting to connect to the database...");

    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync({ alter: true });
    console.log("✅ Database synced.");

    console.log("🌍 PORT ENV:", process.env.PORT);

    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.name, error.message);
    console.error(error.stack);
    process.exit(1); // Force exit so Railway detects failure properly
  }
};

startServer();

export default app;




// process.on('exit', (code) => {
//   console.log('👋 App is exiting with code:', code);
// });

// process.on('SIGTERM', () => {
//   console.log('❗ Received SIGTERM, shutting down...');
// });


// process.on('uncaughtException', (err) => {
//   console.error('❌ Uncaught Exception:', err);
// });

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('❌ Unhandled Rejection:', reason);
// });
