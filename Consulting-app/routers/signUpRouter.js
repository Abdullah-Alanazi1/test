import express from "express";
import User from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";

// * Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
// handle GET request at /signup and send the signup.html file to
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "signup.html"));
});
// Handle sign-up form submissions on POST request
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, position } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please fill in all required fields." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists with that email." });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      position,
    });
    await newUser.save();
    // log for debugging purposes
    console.log(`New user created: ${newUser}`);

    // Send a welcome email here
    // Respond with success message
    return res.status(201).json({ msg: "Signup successful." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

export default router;
