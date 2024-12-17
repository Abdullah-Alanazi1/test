import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";


// * Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// * Handle GET request at /otp and send the otp.html file to the client.
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Pages", "otp.html"));
});

router.post("/", async (req, res) => {
  try {
    
    const {n1, n2, n3, n4 } = req.body;

    // Basic validation
    if (!n1 || !n2 || !n3 || !n4) {
      return res.status(400).json({ msg: "Please provide all required fields." });
    }

    // Combine the OTP fields
    const enteredOtp = `${n1}${n2}${n3}${n4}`;
    const email = decodeURIComponent(req.query.e);
    
    // Verify the OTP code
    // Check if the OTP code is correct
    // FIX: Get the email value
    const existingVerification = await Verification.findOne({email});
    if (!existingVerification || verification.otpCode !== enteredOtp) {
      return res.status(400).json({ msg: "Invalid OTP code." });
    }

    // Delete the verification object from the database
    await existingVerification.deleteOne();

    // OTP is correct, redirect to change password page

    res.redirect("/changepass");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});
export default router;
