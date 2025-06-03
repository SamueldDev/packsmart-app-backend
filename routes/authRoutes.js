

import express from "express";



import { register, login } from "../controllers/authControllers.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import { validate } from "../middlewares/validateMiddleware.js";


const router = express.Router();

router.post("/register", registerValidator, validate,  register);
router.post("/login", loginValidator, validate, login);

export default router;
