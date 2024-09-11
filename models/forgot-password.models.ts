import mongoose from "mongoose";

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const ForgotPasswordDtb = mongoose.model(
    "ForgotPassword",
    forgotPasswordSchema,
    "forgot-password"
);
