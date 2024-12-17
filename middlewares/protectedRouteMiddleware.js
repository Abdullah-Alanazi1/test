import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
/**
 * * This middleware will handle authorized-only routes,
 * * using JWT.
 */
export default (req, res, next) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.redirect("/signin");
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
