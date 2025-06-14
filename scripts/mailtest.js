

// // testing for sendgrid
// import sgMail from "@sendgrid/mail";
// import dotenv from "dotenv";
// dotenv.config();

// // node scripts/mailtest.js

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "samuelakinbola9@gmail.com",
//   from: "youngsammy2018@gmail.com", // Must be verified
//   subject: "Just a quick reminder about our site",
//   text: "Hey, hope you're doing well! Just making sure our reminder system works. Thanks for checking.",
//   html: "<p>Hey there, just checking if our <strong>notification system</strong> works. Thanks!</p>",
// };

// sgMail
//   .send(msg)
//   .then(() => console.log("✅ Test email sent"))
//   .catch((error) => console.error("❌ Email send failed:", error.response?.body || error.message));




// import axios from "axios"


// const sendSMS = async () => {
//   const data = {
//     to: '+2349073765841', // Replace with the actual number
//     from: "Packsmart", // Your sender ID (must be approved by Termii)
//     sms: 'Hi there, testing Termii',
//     type: 'plain',
//     channel: 'generic',
//     api_key: '' // Replace with your actual API key
//   };

//   try {
//     const response = await axios.post('https://api.ng.termii.com/api/sms/send', data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     console.log('SMS sent:', response.data);
//   } catch (error) {
//     console.error('Error:', error.response?.data || error.message);
//   }
// };

// sendSMS();
