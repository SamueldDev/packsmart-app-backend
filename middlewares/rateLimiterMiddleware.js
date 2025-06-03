
import rateLimit from "express-rate-limit"

// Apply to public endpoints like shared list access
export const sharedListRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later",
  },
});