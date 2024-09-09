import express from "express";
const router = express.Router();

import * as controllers from "../controllers/task.controllers";

router.get("/", controllers.index);

router.get("/detail/:id", controllers.detail);

export const taskRoute = router;
