import express from "express";
const router = express.Router();

import * as controllers from "../controllers/user.controllers";
import { authen } from "../middlewares/authen.middlewares";
router.post("/register", controllers.register);

router.patch("/login", controllers.login);

router.patch("/password/forgot", controllers.passwordForgot);

router.patch("/password/otp", controllers.otp);

router.patch("/password/reset", controllers.reset);

router.get("/profile", authen, controllers.profile);

export const userRoute = router;
