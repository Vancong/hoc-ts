import { TaskDtb } from "../models/task.models";
import { Request, Response } from "express";

// [GET] /tasks
export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false,
    };
    // const find = {
    //     $or: [
    //         {
    //             createdBy: req.user.id,
    //         },
    //         {
    //             listUser: req.user.id,
    //         },
    //     ],
    //     deleted: false,
    // };

    let page: number = 2;
    let limit: number = 2;
    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }
    const skip: number = (page - 1) * limit;

    //sapxep
    const sortKey = `${req.query.sortKey}`;
    const sortValue = req.query.sortValue;
    const sort = {};
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    //end sap xep theo tieu chi
    const status = req.query.status;
    if (status) {
        find["status"] = status;
    }

    const tasks = await TaskDtb.find(find).skip(skip).limit(limit).sort(sort);
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
