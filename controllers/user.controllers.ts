import { userDtb } from "../models/user.models";
import { ForgotPasswordDtb } from "../models/forgot-password.models";
import { Response, Request } from "express";
import { sendMailHelpers } from "../helpers/sendMail.helpers";
import md5 from "md5";
import {
    generateRandomNumber,
    generateRandomString,
} from "../helpers/generate.helpers";
//[POST] /user/register
export const register = async (req: Request, res: Response) => {
    const token: string = generateRandomString(30);
    req.body.token = token;
    req.body.password = md5(req.body.password);
    const user = new userDtb(req.body);
    user.save();
    res.json({
        code: 200,
        token: token,
        message: "tao tk thanh cong",
    });
};

//[PATCH] /user/login
export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = md5(req.body.password);
    const existUser = await userDtb.findOne({
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
};

//[PATCH] /user/password/forgot
export const passwordForgot = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const existEmail = await userDtb.findOne({
        email: email,
    });
    if (!existEmail) {
        res.json({
            code: 400,
            message: "sai email",
        });
        return;
    }
    const otp = generateRandomNumber(6);
    const expireAt = Date.now() + 3 * 60 * 1000;
    const data = {
        email: req.body.email,
        otp: otp,
        expireAt: expireAt,
    };
    const newData = new ForgotPasswordDtb(data);
    await newData.save();
    const subject = "Mã OTP để lấy lại mật khẩu là";
    const html = ` Mã OTP có hiệu lực trong 3 phút : ${otp}. Vui lòng không cung cấp cho ai khác `;
    sendMailHelpers(email, subject, html);
    res.json({
        email: email,
        code: 200,
        message: "sucsses",
    });
};

//[PATCH] /user/password/otp
export const otp = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const otp: string = req.body.otp;
    const otpDtb = await ForgotPasswordDtb.findOne({
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
    const user = await userDtb.findOne({
        email: email,
    });
    res.json({
        code: 200,
        token: user.token,
        message: "Xac thuc thanh cong",
    });
};

//[PATCH] /user/password/reset
export const reset = async (req: Request, res: Response) => {
    const password: string = md5(req.body.password);
    const token: string = req.body.token;
    await userDtb.updateOne(
        {
            token: token,
        },
        {
            password: password,
        }
    );
    res.json({
        code: 200,
        meesage: "doi mk thanh cong",
    });
};

//[GET] /user/profile
export const profile = async (req: Request, res: Response) => {
    try {
        const user = await userDtb
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
    } catch (error) {}
};
