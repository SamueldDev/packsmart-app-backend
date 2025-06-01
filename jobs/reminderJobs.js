




import sequelize from "./config/db.js";

import Trip from "../models/TripModel.js";
import User from "../models/userModel.js";


const runReminderJob = async () => {
  try {
    await sequelize.authenticate();

    const today = new Date();
    const inThreeDays = new Date(today);
    inThreeDays.setDate(today.getDate() + 3);

    // Find trips starting within the next 3 days
    const upcomingTrips = await Trip.findAll({
      where: {
        startDate: {
          [sequelize.Op.between]: [today, inThreeDays],
        },
      },
      include: User,
    });

    if (upcomingTrips.length === 0) {
      console.log("No upcoming trips in the next 3 days.");
    } else {
      for (const trip of upcomingTrips) {
        const user = trip.User;
        console.log(
          `Reminder: Hi ${user.fullname}, your trip to ${trip.destination} starts on ${trip.startDate.toDateString()}!`
        );

        // 🔒 For now: Just log it.
        // 🔜 Later: Replace this with email/SMS notification logic.
      }
    }

    await sequelize.close();
  } catch (error) {
    console.error("Reminder job failed:", error);
    process.exit(1);
  }
};

runReminderJob();



