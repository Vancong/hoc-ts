"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authen = void 0;
const user_models_1 = require("../models/user.models");
const authen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.json({
            code: 400,
            message: "Vui lòng gửi kèm theo token.",
        });
        return;
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        res.json({
            code: 400,
            message: "Vui lòng gửi kèm theo token.",
        });
        return;
    }
    const user = yield user_models_1.userDtb.findOne({
        token: token,
        deleted: false,
    });
    if (!user) {
        res.json({
            code: 403,
            message: "Token không hợp lệ.",
        });
        return;
    }
    req["user"] = user;
    req["tokenVerify"] = token;
    next();
});
exports.authen = authen;
