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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedPatch = exports.editPatch = exports.createPost = exports.changeStatus = exports.detail = exports.index = void 0;
const task_models_1 = require("../models/task.models");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false,
    };
    let page = 2;
    let limit = 2;
    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }
    const skip = (page - 1) * limit;
    if (req.query.keyword) {
        const regex = new RegExp(`${req.query.keyword}`, "i");
        find["title"] = regex;
    }
    const sortKey = `${req.query.sortKey}`;
    const sortValue = req.query.sortValue;
    const sort = {};
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    const status = req.query.status;
    if (status) {
        find["status"] = status;
    }
    const tasks = yield task_models_1.TaskDtb.find(find).skip(skip).limit(limit).sort(sort);
    res.json(tasks);
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield task_models_1.TaskDtb.findOne({
        _id: id,
    });
    res.json(task);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.body.status;
        const idf = req.body.idf;
        yield task_models_1.TaskDtb.updateMany({
            _id: { $in: idf },
        }, {
            status: status,
        });
        res.json({
            code: 200,
            message: "Cập nhật thành công",
        });
    }
    catch (error) { }
});
exports.changeStatus = changeStatus;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new task_models_1.TaskDtb(req.body);
    task.save();
    res.json({
        code: 200,
        message: "Them moi thanh cong ",
    });
});
exports.createPost = createPost;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_models_1.TaskDtb.updateOne({
            _id: id,
        }, req.body);
        res.json({
            code: 200,
            message: "update thanh cong",
        });
    }
    catch (error) { }
});
exports.editPatch = editPatch;
const deletedPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idf = req.body.idf;
    yield task_models_1.TaskDtb.updateMany({
        _id: { $in: idf },
    }, {
        deleted: true,
    });
    res.json({
        code: 200,
        message: "xoa thanh cong ",
    });
});
exports.deletedPatch = deletedPatch;
