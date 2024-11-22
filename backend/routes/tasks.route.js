import express from "express";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  findTask,
} from "../controller/tasks.controller.js";
import { validateTask } from "../middleware/tasks.middleware.js";
const tasksRouter = express.Router();

tasksRouter.get("/", fetchTasks);
tasksRouter.post("/", validateTask, createTask);
tasksRouter.put("/:id", validateTask, updateTask);
tasksRouter.delete("/:id", deleteTask);
tasksRouter.get("/:id", findTask);

export default tasksRouter;
