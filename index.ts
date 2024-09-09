import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDtb } from "./config/database.config";
connectDtb();

const app: Express = express();
const port: number = 3000;

app.get("/tasks", (req: Request, res: Response) => {
    res.send("danh sach cong viec ");
});

app.listen(port, () => {
    console.log(`dang chay cong ${port}`);
});
