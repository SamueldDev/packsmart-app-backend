
// first
// import Trip from "../models/TripModel.js";
// import User from "../models/userModel.js";
// import { Op } from "sequelize";

// const runReminderJob = async () => {
//   try {
//     const today = new Date();
//     const inThreeDays = new Date();
//     inThreeDays.setDate(today.getDate() + 3);

//     const upcomingTrips = await Trip.findAll({
//       where: {
//         startDate: {
//           [Op.between]: [today.toISOString().slice(0, 10), inThreeDays.toISOString().slice(0, 10)],
//         },
//       },
//       include: User,
//     });

//     if (upcomingTrips.length === 0) {
//       console.log("📭 No upcoming trips in the next 3 days.");
//     } else {
//       for (const trip of upcomingTrips) {
//         const user = trip.User;

//         // Validate the date
//         const startDate = new Date(trip.startDate);
//         if (isNaN(startDate)) {
//           console.warn(`⚠️ Invalid start date for trip ID: ${trip.id}, value: ${trip.startDate}`);
//           continue;
//         }

//         console.log(
//           `📣 Reminder: Hi ${user.fullname}, your trip to ${trip.destination} starts on ${startDate.toDateString()}!`
//         );
//       }
//     }

//     return { message: "Reminder job ran successfully ✅" };
//   } catch (error) {
//     console.error("❌ Reminder job failed:", error.message);
//     return { message: "Reminder job failed ❌", error: error.message };
//   }
// };

// export default runReminderJob;



























// jobs/reminderJobs.js
import Trip from "../models/TripModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";
import sgMail from "@sendgrid/mail";
import twilio from "twilio";

// Setup SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Setup Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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
        const startDate = new Date(trip.startDate);

        if (isNaN(startDate)) {
          console.warn(`⚠️ Invalid start date for trip ID: ${trip.id}, value: ${trip.startDate}`);
          continue;
        }

        const message = `Hi ${user.fullname}, your trip to ${trip.destination} starts on ${startDate.toDateString()}. Don't forget to pack smart!`;

        // Send Email
        if (user.email) {
          try {
            await sgMail.send({
              to: user.email,
              from: "youngsammy2018@gmail.com", // Replace with verified email
              subject: `Trip Reminder: ${trip.name}`,
              text: message,
            });
            console.log(`📧 Email sent to ${user.email}`);
          } catch (err) {
            console.error(`❌ Failed to send email to ${user.email}:`, err.message);
          }
        }

        // Send SMS
        if (user.phoneNumber) {
          try {
            await twilioClient.messages.create({
              body: message,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: user.phoneNumber,
            });
            console.log(`📱 SMS sent to ${user.phoneNumber}`);
          } catch (err) {
            console.error(`❌ Failed to send SMS to ${user.phoneNumber}:`, err.message);
          }
        }
      }
    }

    return { message: "Reminder job ran successfully ✅" };
  } catch (error) {
    console.error("❌ Reminder job failed:", error.message);
    return { message: "Reminder job failed ❌", error: error.message };
  }
};

export default runReminderJob;




