import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// routers middlewares imports
import signinRouter from "./signInRouter.js";
import homeRouter from "./homeRouter.js";
import protectedRouteMiddleware from "../middlewares/protectedRouteMiddleware.js";
import resetPassRouter from "./resetPassRouter.js";
import otpRouter from "./otpRouter.js";
import changepassRouter from "./changepassRouter.js";
import blogRouter from "./blogRouter.js";
import dashboardRouter from "./dashboardRouter.js";
import signUpRouter from "./signUpRouter.js";
import jobSeekerRouter from "./jobseekerRouter.js";

// * Get the current directory path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// * Create a new router instance.
const router = express.Router();

// * Serve static files.
router.use(express.static("public"));
// allow cors for all origins
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// * Importing the routers.
router.use("/signin", signinRouter);
router.use("/", homeRouter);
router.use("/resetpass", resetPassRouter);
router.use("/otp", otpRouter);
router.use("/changepass", changepassRouter);
router.use("/blog", blogRouter);
router.use("/signup", signUpRouter);
router.use("/dashboard", dashboardRouter);
router.use("/jobseeker", jobSeekerRouter);

//
// * 404 page.
router.use("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "..", "Pages", "404.html"));
});
export default router;
