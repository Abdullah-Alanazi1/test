// models/service.js
import mongoose from "mongoose";

// Define Schema and Model
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
      enum: ["cv", "meeting", "cover-letter"], // Add enum for validation
    },
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    url: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    platform: {
      type: String,
      // enum: ['zoom', 'teams', 'google-meet']
    },
    usernamePlatform: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      // enum: ['Pending', 'accepted', 'rejected']
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
