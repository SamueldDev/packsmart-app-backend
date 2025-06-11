

// scripts/createAdmin.js


// import bcrypt from "bcrypt"
// import sequelize from "../config/db.js"; // your Sequelize connection
// import User from "../models/userModel.js";    // your User model

// const createAdmin = async () => {
//   try {
//     await sequelize.sync(); // ensure tables are ready

//     const hashedPassword = await bcrypt.hash("onlyauth200", 10);

//     const [admin, created] = await User.findOrCreate({
//       where: { email: "admin@example.com" },
//       defaults: {
//         name: "Admin",
//         password: hashedPassword,
//         phoneNumber: "+12345678901",
//         role: "admin",
//       },
//     });

//     if (created) {
//       console.log("✅ Admin user created successfully.");
//     } else {
//       console.log("ℹ️ Admin user already exists.");
//     }

//     process.exit();
//   } catch (err) {
//     console.error("❌ Failed to create admin:", err);
//     process.exit(1);
//   }
// };

// createAdmin();
