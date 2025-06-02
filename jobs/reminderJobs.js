




// import sequelize from "./config/db.js";

// import Trip from "../models/TripModel.js";

// import User from "../models/userModel.js";

// import { Op } from "sequelize";


// const runReminderJob = async () => {
//   try {
//     await sequelize.authenticate();

//     const today = new Date();
//     const inThreeDays = new Date(today);
//     inThreeDays.setDate(today.getDate() + 3);

//     // Find trips starting within the next 3 days
//     const upcomingTrips = await Trip.findAll({
//       where: {
//         startDate: {
//           [Op.between]: [today, inThreeDays],
//         },
//       },
//       include: User,
//     });

//     if (upcomingTrips.length === 0) {
//       console.log("No upcoming trips in the next 3 days.");
//     } else {
//       for (const trip of upcomingTrips) {
//         const user = trip.User;
//         console.log(
//           `Reminder: Hi ${user.fullname}, your trip to ${trip.destination} starts on ${trip.startDate.toDateString()}!`
//         );

//         // 🔒 For now: Just log it.
//         // 🔜 Later: Replace this with email/SMS notification logic.
//       }
//     }

//     await sequelize.close();
//   } catch (error) {
//     console.error("Reminder job failed:", error);
//     process.exit(1);
//   }
// };

// runReminderJob();

















// import Trip from "../models/TripModel.js";
// import User from "../models/userModel.js";
// import { Op } from "sequelize";

// const runReminderJob = async () => {
//   try {
//     const today = new Date();
//     const inThreeDays = new Date(today);
//     inThreeDays.setDate(today.getDate() + 3);

//     const upcomingTrips = await Trip.findAll({
//       where: {
//         startDate: {
//           [Op.between]: [today, inThreeDays],
//         },
//       },
//       include: User,
//     });

//     if (upcomingTrips.length === 0) {
//       console.log("📭 No upcoming trips in the next 3 days.");
//     } else {
//       for (const trip of upcomingTrips) {
//         const user = trip.User;
//         console.log(
//           `📣 Reminder: Hi ${user.fullname}, your trip to ${trip.destination} starts on ${new Date(trip.startDate).toDateString()}!`
//         );
//       }
//     }
//   } catch (error) {
//     console.error("❌ Reminder job failed:", error.message);
//   }
// };

// export default runReminderJob;





















import Trip from "../models/TripModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";

const runReminderJob = async () => {
  try {
    const today = new Date();
    const inThreeDays = new Date();
    inThreeDays.setDate(today.getDate() + 3);

    const upcomingTrips = await Trip.findAll({
      where: {
        startDate: {
          [Op.between]: [today.toISOString().slice(0, 10), inThreeDays.toISOString().slice(0, 10)],
        },
      },
      include: User,
    });

    if (upcomingTrips.length === 0) {
      console.log("📭 No upcoming trips in the next 3 days.");
    } else {
      for (const trip of upcomingTrips) {
        const user = trip.User;

        // Validate the date
        const startDate = new Date(trip.startDate);
        if (isNaN(startDate)) {
          console.warn(`⚠️ Invalid start date for trip ID: ${trip.id}, value: ${trip.startDate}`);
          continue;
        }

        console.log(
          `📣 Reminder: Hi ${user.fullname}, your trip to ${trip.destination} starts on ${startDate.toDateString()}!`
        );
      }
    }

    return { message: "Reminder job ran successfully ✅" };
  } catch (error) {
    console.error("❌ Reminder job failed:", error.message);
    return { message: "Reminder job failed ❌", error: error.message };
  }
};

export default runReminderJob;

