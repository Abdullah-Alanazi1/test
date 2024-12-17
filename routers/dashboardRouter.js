import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// * Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// * Create a new router instance.
const router = express.Router();
// get and send the dashboard.html file
/**
 * Handles GET requests to the root path and sends the dashboard HTML file as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} Sends the dashboard.html file as a response.
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Pages", "HR.html"));
});
router.post("/add", async (req, res) => {
  try {
    const { name, email, whatsappNumber, service, user, message, document } =
      req.body;

    const newService = new Service({
      name,
      email,
      whatsappNumber,
      service,
      user,
      message,
      document,
    });

    await newService.save();
    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Get all services
router.get("/list", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single service by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a service entry by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      whatsappNumber,
      service,
      user,
      message,
      document,
      status,
    } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, email, whatsappNumber, service, user, message, document, status },
      { new: true }
    );

    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a service by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
