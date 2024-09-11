import express from "express";
const router = express.Router();

import * as controllers from "../controllers/user.controllers";

router.post("/register", controllers.register);

router.patch("/login", controllers.login);

export const userRoute = router;
