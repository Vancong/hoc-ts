"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4000;
app.use((0, cors_1.default)());
dotenv_1.default.config();
const database_config_1 = require("./config/database.config");
(0, database_config_1.connectDtb)();
app.use(body_parser_1.default.json());
const index_route_1 = require("./router/index.route");
(0, index_route_1.RouteApi)(app);
app.listen(port, () => {
    console.log(`dang chay cong ${port}`);
});
