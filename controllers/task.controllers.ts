import { TaskDtb } from "../models/task.models";
import { Request, Response } from "express";

// [GET] /tasks
export const index = async (req: Request, res: Response) => {
    const tasks = await TaskDtb.find();
    res.json(tasks);
};

// [GET] /tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await TaskDtb.findOne({
        _id: id,
    });
    res.json(task);
};
