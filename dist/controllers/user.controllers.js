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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.reset = exports.otp = exports.passwordForgot = exports.login = exports.register = void 0;
const user_models_1 = require("../models/user.models");
const forgot_password_models_1 = require("../models/forgot-password.models");
const sendMail_helpers_1 = require("../helpers/sendMail.helpers");
const md5_1 = __importDefault(require("md5"));
const generate_helpers_1 = require("../helpers/generate.helpers");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, generate_helpers_1.generateRandomString)(30);
    req.body.token = token;
    req.body.password = (0, md5_1.default)(req.body.password);
    const user = new user_models_1.userDtb(req.body);
    user.save();
    res.json({
        code: 200,
        token: token,
        message: "tao tk thanh cong",
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const existUser = yield user_models_1.userDtb.findOne({
        email: email,
    });
    if (!existUser) {
        res.json({
            code: 400,
            message: "email khong ton tai tren he thong",
        });
        return;
    }
    if (password != existUser.password) {
        res.json({
            code: 400,
            message: "sai pass word",
        });
        return;
    }
    res.json({
        code: 200,
        token: existUser.token,
        messgae: "dang nhap thanh cong",
    });
});
exports.login = login;
const passwordForgot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const existEmail = yield user_models_1.userDtb.findOne({
        email: email,
    });
    if (!existEmail) {
        res.json({
            code: 400,
            message: "sai email",
        });
        return;
    }
    const otp = (0, generate_helpers_1.generateRandomNumber)(6);
    const expireAt = Date.now() + 3 * 60 * 1000;
    const data = {
        email: req.body.email,
        otp: otp,
        expireAt: expireAt,
    };
    const newData = new forgot_password_models_1.ForgotPasswordDtb(data);
    yield newData.save();
    const subject = "Mã OTP để lấy lại mật khẩu là";
    const html = ` Mã OTP có hiệu lực trong 3 phút : ${otp}. Vui lòng không cung cấp cho ai khác `;
    (0, sendMail_helpers_1.sendMailHelpers)(email, subject, html);
    res.json({
        email: email,
        code: 200,
        message: "sucsses",
    });
});
exports.passwordForgot = passwordForgot;
const otp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = req.body.otp;
    const otpDtb = yield forgot_password_models_1.ForgotPasswordDtb.findOne({
        email: email,
        otp: otp,
    });
    if (!otpDtb) {
        res.json({
            code: 400,
            message: "sai",
        });
        return;
    }
    const user = yield user_models_1.userDtb.findOne({
        email: email,
    });
    res.json({
        code: 200,
        token: user.token,
        message: "Xac thuc thanh cong",
    });
});
exports.otp = otp;
const reset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = (0, md5_1.default)(req.body.password);
    const token = req.body.token;
    yield user_models_1.userDtb.updateOne({
        token: token,
    }, {
        password: password,
    });
    res.json({
        code: 200,
        meesage: "doi mk thanh cong",
    });
});
exports.reset = reset;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_models_1.userDtb
            .findOne({
            token: req["tokenVerify"],
        })
            .select("fullName email");
        if (!user) {
            res.json({
                code: 400,
            });
            return;
        }
        res.json({
            code: 200,
            user: user,
        });
    }
    catch (error) { }
});
exports.profile = profile;
