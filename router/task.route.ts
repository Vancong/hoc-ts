import express from "express";

const router = express.Router();

import * as controllers from "../controllers/task.controllers";

router.get("/", controllers.index);

router.get("/detail/:id", controllers.detail);

router.patch("/change-status", controllers.changeStatus);

router.post("/create", controllers.createPost);

router.patch("/edit/:id", controllers.editPatch);

router.patch("/deleted", controllers.deletedPatch);

export const taskRoute = router;
