import { taskRoute } from "./task.route";
import { Express } from "express";
import { userRoute } from "./user.route";
import { authen } from "../middlewares/authen.middlewares";
export const RouteApi = (app: Express) => {
    app.use("/tasks", authen, taskRoute);
    app.use("/user", userRoute);
};
