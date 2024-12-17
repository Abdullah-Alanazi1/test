import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otpCode: { type: Number, required: true, min: 1000, max: 9999 }, // Ensure the OTP is a 4-digit number
});

const Verification = mongoose.model("Verification", verificationSchema);

export default Verification;
