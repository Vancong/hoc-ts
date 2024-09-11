import nodemailer from "nodemailer";
export const sendMailHelpers = (toMail, subject, html) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SEND_MAIL_EMAIL,
            pass: process.env.SEND_MAIL_PASSWORD,

            //   clientId: process.env.OAUTH_CLIENTID,
            //   clientSecret: process.env.OAUTH_CLIENT_SECRET,
            //   refreshToken: process.env.OAUTH_REFRESH_TOKEN
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
        } else {
            console.log(`Gui ma otp thanh cong den ${toMail}`);
        }
    });
};
