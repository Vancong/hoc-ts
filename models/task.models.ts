import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
    {
        title: String,
        status: String,
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createdBy: String,
        listUser: Array,
        parentId: String,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

export const TaskDtb = mongoose.model("task", taskSchema, "task");
