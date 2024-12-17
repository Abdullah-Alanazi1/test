import express from "express";
import path from "path";
import { fileURLToPath } from "url";


// * Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// * Create a new router instance.
const router = express.Router();
// handles GET requests to the root path and serves the blog page.
/**
 * Handles GET requests to the root path and serves the blog page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Sends the blog.html file as a response.
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "blog.html"));
});
export default router;