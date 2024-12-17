import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js"; // Ensure you have the correct path to your User model
import jwt from "jsonwebtoken";

const router = express.Router();

// Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handles GET requests to the root path and serves the signIn page.
/**
 * Handles GET requests to the root path and serves the signIn page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} - Sends the signIn.html file as a response.
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "signIn.html"));
});

/**
 * Handles POST requests for user sign-in.
 * Validates user credentials and redirects based on user position.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user credentials.
 * @param {string} req.body.email - The email of the user attempting to sign in.
 * @param {string} req.body.password - The password of the user attempting to sign in.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON response with a message or redirects to a specific page based on user position.
 */
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide both email and password." });
    }
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User not found. Please sign up first." });
    }
    // * Generate the JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ position: user.position, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

export default router;
