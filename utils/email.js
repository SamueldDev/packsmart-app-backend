import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production: Use a real email service (e.g., Gmail, SendGrid, etc.)
    return nodemailer.createTransport({
      service: 'Gmail', // or another service
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Development: Use Mailtrap or similar testing service
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

export const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = createTransporter();

  // 2) Define the email options
  const mailOptions = {
    from: `SmartPack App <${process.env.EMAIL_FROM || 'noreply@smartpack.com'}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

// Template for password reset email
export const createPasswordResetEmailTemplate = (user, resetURL) => {
  const name = user.name || 'User';
  return {
    subject: 'Password Reset Request - SmartPack',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background: #007bff; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
          }
          .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SmartPack</h1>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hi ${name},</p>
            <p>You requested a password reset for your SmartPack account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetURL}" class="button">Reset Password</a>
            <p>Or copy and paste this link into your browser:</p>
            <p><a href="${resetURL}">${resetURL}</a></p>
            <p><strong>This link will expire in 10 minutes.</strong></p>
            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            <p>For security reasons, this reset link can only be used once.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The SmartPack Team</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hi ${name},

      You requested a password reset for your SmartPack account.

      Please visit the following link to reset your password:
      ${resetURL}

      This link will expire in 10 minutes.

      If you didn't request this password reset, please ignore this email.

      Best regards,
      The SmartPack Team
    `
  };
};