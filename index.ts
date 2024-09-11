import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

import { connectDtb } from "./config/database.config";
connectDtb();

const app: Express = express();
const port: number = 4000;

// app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.json());

import { RouteApi } from "./router/index.route";
RouteApi(app);

app.listen(port, () => {
    console.log(`dang chay cong ${port}`);
});
