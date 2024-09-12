import Task from "../../models/task.model";
import { Request, Response } from "express";

// [GET] /tasks
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  };
  
  // Lọc theo trạng thái
  const status = req.query.status;

  if(status) {
    find["status"] = status;
  }
  // Hết lọc theo trạng thái

  // Sắp xếp theo tiêu chí
  const sort = {};

  const sortKey = `${req.query.sortKey}`;
  const sortValue = req.query.sortValue;

  if(sortKey && sortValue) {
    sort[sortKey] = sortValue;
  }
  // Hết Sắp xếp theo tiêu chí
  
  const tasks = await Task
  .find(find)
  .sort(sort);

  res.json(tasks);
}

// [GET] /tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });

  res.json(task);
}