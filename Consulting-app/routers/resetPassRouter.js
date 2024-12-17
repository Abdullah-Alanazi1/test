import sendEmail from "../utils/email.js";
import express from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import Verification from "../models/Verification.js";
// Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle GET request at /resetPass and send the resetPass.html file to
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "resetPass.html"));
});

// Handle POST request for reset password
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ msg: "Please provide your email." });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found." });
    }

    // Generate OTP code between 1000 and 9999 (included)
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // Check if this email already has an OTP code in verification
    const existingVerification = await Verification.findOne({
      email: user.email,
    });
    if (existingVerification) {
      await existingVerification.deleteOne();
    }

    // TODO: Add verification schema and import it to this document and to the other two routers
    // Create a new verification instance
    const verification = new Verification({
      email,
      otpCode,
    });

    // Save the verification object to the database
    await verification.save();
    // log the OTP code for debugging purposes
    console.log(`Generated OTP code: ${otpCode}`);
    // Send OTP code to the user's email
    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otpCode}`);
    // log the user's email for debugging purposes
    console.log(`Sent OTP code to: ${email}`);
    // Redirect the user to the OTP verification page
    res.redirect(`/otp?e=${encodeURIComponent(email)}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

export default router;
