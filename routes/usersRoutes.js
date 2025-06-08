

import express from "express";

import { createUser, loginUser, getUsers } from "../controllers/userControllers.js";
// import {registerValidator, loginValidator} from "../validators/authValidator.js"
import { registerValidator, validationResultMiddleware, loginValidator } from "../middlewares/validateMiddleware.js"


const router = express.Router(); 

router.post("/register", registerValidator, validationResultMiddleware,  createUser)
router.post("/login", loginValidator, validationResultMiddleware, loginUser)
router.get("/", getUsers)

export default router



