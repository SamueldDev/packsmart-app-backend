
import rateLimit from "express-rate-limit"

// Apply to public endpoints like shared list access
export const sharedListRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later",
  },
});



export const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hour
  max: 5,                     // limit each IP to 5 requests
  message:
    "Too many password‑reset requests from this IP. Try again in an hour."
});


