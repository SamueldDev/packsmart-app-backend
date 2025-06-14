
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

  await sgMail.send(msg);
};

export default sendEmail;
