import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import newService from "../models/Service.js";
// * Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Handle GET request to serve the form
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "customer.html")); // Adjust path as needed
});

/**
 * @param {Event} event - The event object associated with the form submission.
 * @returns {void}
 */

// Handle form submissions on POST request
router.post("/", async (req, res) => {
  // log the req.body for debugging
  try {
    const {
      name,
      email,
      whatsappNumber,
      service,
      date,
      time,
      platform,
      usernamePlatform,
      user,
      message,
      url,
      status,
    } = req.body;

    // Basic validation
    if (!name || !email || !whatsappNumber || !service) {
      return res
        .status(400)
        .json({ msg: "Please fill in all required fields." });
    }

    // Log received data for debugging
    console.log("Form submission received:", req.body);

    // Example of handling service-specific logic
    if (service === "meeting" && (!date || !time || !platform)) {
      return res.status(400).json({
        msg: "Please provide date, time, and platform details for the meeting service.",
      });
    }

    // Example: Save data to the database (adapt for your schema)
    const newservice = new newService({
      name,
      email,
      whatsappNumber,
      service,
      date,
      time,
      platform,
      usernamePlatform,
      user,
      message,
      url,
      status: status || "pending", // Default status
    });

    await newservice.save();

    // Log the saved user for debugging
    console.log(`New form submission saved in the db: ${newservice}`);

    // Respond with a success message
    return res.status(200).json({ msg: "Form submission successful." });
  } catch (err) {
    console.error("Error handling form submission:", err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

export default router;
