import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";


// Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// handle GET request at /changePass and send the changePass.html file to
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "changePass.html"));
});

// Handle sign-up form submissions on POST request
router.post("/", async (req, res) => {
  try {
    const { newPassword, confirmPassword} = req.body;

    // Basic validation
    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Please fill in all required fields." });
    }

    // Check if new Password passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }

    // Find the user by email
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Respond with success message
    return res.status(201).json({ msg: "password change successful." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

// * Export the router.
export default router;
