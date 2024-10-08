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

    // phan trang
    let page: number = 2;
    let limit: number = 2;
    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }
    const skip: number = (page - 1) * limit;
    //end phan trang

    //tim kiem
    if (req.query.keyword) {
        const regex = new RegExp(`${req.query.keyword}`, "i");
        find["title"] = regex;
    }

    //

    //end tim kiem

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

// [PATCH] /tasks/change-status
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const status: string = req.body.status;
        const idf: string[] = req.body.idf;
        await TaskDtb.updateMany(
            {
                _id: { $in: idf },
            },
            {
                status: status,
            }
        );
        res.json({
            code: 200,
            message: "Cập nhật thành công",
        });
    } catch (error) {}
};

// [POST] /tasks/create
export const createPost = async (req: Request, res: Response) => {
    const task = new TaskDtb(req.body);
    task.save();
    res.json({
        code: 200,
        message: "Them moi thanh cong ",
    });
};

// [PATCH] /tasks/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await TaskDtb.updateOne(
            {
                _id: id,
            },
            req.body
        );
        res.json({
            code: 200,
            message: "update thanh cong",
        });
    } catch (error) {}
};

// [PATCH] /tasks/deleted/:id
export const deletedPatch = async (req: Request, res: Response) => {
    const idf: string[] = req.body.idf;
    await TaskDtb.updateMany(
        {
            _id: { $in: idf },
        },
        {
            deleted: true,
        }
    );
    res.json({
        code: 200,
        message: "xoa thanh cong ",
    });
};
