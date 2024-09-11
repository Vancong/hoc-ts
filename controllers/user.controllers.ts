import { userDtb } from "../models/user.models";
import { Response, Request } from "express";
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
