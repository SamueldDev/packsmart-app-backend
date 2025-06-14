

// jobs/reminderJobs.js
import Trip from "../models/TripModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";
import sgMail from "@sendgrid/mail";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();




// Setup SendGrid
if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY is missing!");
}
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
          [Op.between]: [
            today.toISOString().slice(0, 10),
            inThreeDays.toISOString().slice(0, 10),
          ],
        },
        reminderSent: false,
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

        const message = `Hi ${user.name}, your trip to ${trip.destination} starts on ${startDate.toDateString()}. Don't forget to pack smart!`;

        let sent = false;

        // Send Email
        if (user.email) {
          console.log(`📨 Preparing to send email to: ${user.email}`);
          try {
            await sgMail.send({
              to: user.email,
              from: process.env.SENDGRID_VERIFIED_SENDER || "youngsammy2018@gmail.com", // Prefer env var
              subject: `Trip Reminder: ${trip.name}`,
              text: message,
            });
            console.log(`📧 Email sent to ${user.email}`);
            sent = true;
          } catch (err) {
            const errorDetails = err.response?.body?.errors || err.message;
            console.error(`❌ Failed to send email to ${user.email}:`, errorDetails);
          }
        } else {
          console.warn(`⚠️ No email found for user ID ${user.id}`);
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
            sent = true;
          } catch (err) {
            console.error(`❌ Failed to send SMS to ${user.phoneNumber}:`, err.message);
          }
        } else {
          console.warn(`⚠️ No phone number found for user ID ${user.id}`);
        }

        // ✅ Mark trip as reminded if any message was successfully sent
        if (sent) {
          trip.reminderSent = true;
          await trip.save();
          console.log(`✅ Trip ID ${trip.id} marked as reminded.`);
        } else {
          console.warn(`⚠️ No messages sent for Trip ID ${trip.id}. Will retry next run.`);
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








