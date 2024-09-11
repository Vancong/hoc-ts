"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailHelpers = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMailHelpers = (toMail, subject, html) => {
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SEND_MAIL_EMAIL,
            pass: process.env.SEND_MAIL_PASSWORD,
        },
    });
    let mailOptions = {
        from: process.env.SEND_MAIL_EMAIL,
        to: toMail,
        subject: subject,
        text: html,
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        }
        else {
            console.log(`Gui ma otp thanh cong den ${toMail}`);
        }
    });
};
exports.sendMailHelpers = sendMailHelpers;
