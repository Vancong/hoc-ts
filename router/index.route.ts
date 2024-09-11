import { taskRoute } from "./task.route";
import { Express } from "express";
import { userRoute } from "./user.route";
export const RouteApi = (app: Express) => {
    app.use("/tasks", taskRoute);
    app.use("/user", userRoute);
};
