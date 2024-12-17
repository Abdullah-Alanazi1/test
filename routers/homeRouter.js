import express from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";

// * Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// handle GET request at / and send an html file
/**
 * Handles GET requests to the root URL ("/") and sends the home page HTML file as a response.
 *
 * @param {Object} req - The request object representing the HTTP request.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {void} Sends the home page HTML file as a response.
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "homePage.html"));
});
export default router;
