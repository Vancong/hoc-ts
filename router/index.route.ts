import { taskRoute } from "./task.route";
import { Express } from "express";
export const RouteApi = (app: Express) => {
    app.use("/tasks", taskRoute);
};
