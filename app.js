import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./routers/index.js";
config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

// Body parser middleware
app.use(express.json());

// Routes
app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port", process.env.PORT || 3000);
});
