
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

import { sequelize } from "./models/index.js";
import usersRoutes from "./routes/usersRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";
import remainderjobsRoutes from "./routes/remainderjobsRoute.js"
import runReminderJob from "./jobs/reminderJobs.js";

import packingItemRoutes from "./routes/packingItemRoutes.js"

import sharinglistRoute from "./routes/sharinglistRoute.js"

// import templatesRoute from "./routes/templatesRoutes.js"

import suggestionRoutes from "./routes/suggestionsRoutes.js"  
import weatherRoutes from "./routes/weatherRoutes.js"
import cron from "node-cron"



const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
  
app.use(express.json());

// Routes
app.use("/api/user", usersRoutes);      
app.use("/api/trips", tripRoutes); 
app.use("/api/checklists", checklistRoutes);
app.use("/api/remainder", remainderjobsRoutes);
app.use("/api/sharedlists", sharinglistRoute);
app.use("/api/packingitems", packingItemRoutes);

/// app.use("/api/templates", templatesRoute)

app.use('/api/suggestions', suggestionRoutes);  
app.use("/api/weatheralert", weatherRoutes)  

// Test route  
app.get("/", (req, res) => {  
  res.send("PackSmart  API is Live");           
});


const startServer = async () => {       
  try {
    console.log("🔄 Attempting to connect to the database..");

    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");   

    await sequelize.sync({ alter: true });   
    console.log("✅ Database synced.");      


    // await sequelize.sync({ force: true});
    // console.log("all tables dropped and recreated")   

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Schedule to run every day at midnight (00:00)
    cron.schedule("*/1 * * * *", async () => {
      console.log("⏰ Running scheduled trip reminder job...");
      await runReminderJob();
    });


  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    // process.exit(1);    
  }
};

startServer();



export default app;


 













// import express from 'express';
//  import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.get('/', (req, res) => {
//   res.send('Hello from PackSmart!');
// });


// console.log("✅ Reached before listen(), PORT:", PORT);
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });































// second
