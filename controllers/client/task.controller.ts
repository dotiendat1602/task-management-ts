import Task from "../../models/task.model";
import { Request, Response } from "express";

// [GET] /tasks
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  };
  
  const status = req.query.status;

  if(status) {
    find["status"] = status;
  }
  const tasks = await Task.find(find);

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