

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err);
// });

// process.on("unhandledRejection", (reason) => {
//   console.error("Unhandled Rejection:", reason);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

import { sequelize } from "./models/index.js";
import usersRoutes from "./routes/usersRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";
import remainderjobsRoutes from "./routes/remainderjobsRoute.js"

import packingItemRoutes from "./routes/packingItemRoutes.js"

import sharinglistRoute from "./routes/sharinglistRoute.js"

import templatesRoute from "./routes/templatesRoutes.js"

import suggestionRoutes from "./routes/suggestionsRoutes.js"  
import weatherRoutes from "./routes/weatherRoutes.js"



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
app.use("/api/templates", templatesRoute)
app.use('/api/suggestions', suggestionRoutes);  
app.use("/api/weatheralert", weatherRoutes)

// Test route  
app.get("/", (req, res) => {  
  res.send("PackSmart  API is Live");           
});

console.log("💡 Binding to port:", PORT);


  //  app.listen(PORT, () => {   
  //     console.log(`🚀 Server running on port ${PORT}`); 
   
  // }); 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



const startServer = async () => {       
  try {
    console.log("🔄 Attemptinnng to connect to the database...");

    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");   

    await sequelize.sync({ alter: true });   
    console.log("✅ Database synced.");     


    // await sequelize.sync({ force: true});
    // console.log("all tables dropped and recreated")   

      

    // ✅ Keep app alive for debugging
    // setInterval(() => {
    //   console.log("⏳ App is still running...");  
    // }, 10000);     

  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    // process.exit(1);    
  }
};

startServer();

export default app;


 































// second
