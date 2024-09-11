"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteApi = void 0;
const task_route_1 = require("./task.route");
const user_route_1 = require("./user.route");
const authen_middlewares_1 = require("../middlewares/authen.middlewares");
const RouteApi = (app) => {
    app.use("/tasks", authen_middlewares_1.authen, task_route_1.taskRoute);
    app.use("/user", user_route_1.userRoute);
};
exports.RouteApi = RouteApi;
