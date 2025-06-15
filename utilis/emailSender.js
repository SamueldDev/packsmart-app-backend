
import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text }) => {
  const msg = {
    to,
    from: process.env.SENDGRID_VERIFIED_SENDER, // must be verified in SendGrid
    subject,
    text,
  };
  console.log("📤 Sending to SendGrid:", msg);

  try{
      await sgMail.send(msg);

  } catch(error){
    console.error("❌ SendGrid Error:", error);

    if (error.response && error.response.body) {
      console.error("❗ SendGrid Response Body:", error.response.body);
    }

    throw new Error("Failed to send email");
  }


};

export default sendEmail;
