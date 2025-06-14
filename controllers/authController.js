
import crypto from "crypto"
import { Op } from "sequelize"
import sendEmail from "../utilis/emailSender.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";


// reset password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    
     if (!user) {
    // Don’t reveal whether an account exists
    return res.json({ message: "If that email is registered, we’ve sent a reset link." });
     }

     // reuse valid, unexpired token 
      if (user.resetPasswordToken && user.resetPasswordExpires > new Date()) {
    return res.json({ message: "If that email is registered, we’ve sent a reset link." });
     }

      // otherwise create a fresh token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken  = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetLink = `${process.env.APP_BASE_URL}/reset-password/${token}`; 

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click this link to reset your password: ${resetLink}`,
    });

    res.json({ message: "Reset link sent to your email if the account exists.",
            resetLink

     });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};





// reset password via the token sent
 
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: new Date() // token has not expired
        }
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successful. You can now log in with your new password." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};




export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(req.user.id); // req.user set by authenticate middleware

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
};
