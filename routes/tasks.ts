import { Router } from "express";
import { v4 as uuid } from "uuid";
import * as storage from "../storage/postgre";

const router = Router();

router.get("/", async (req, res, next) => {
  const taskList = await storage.getAllTasks();
  res.json(taskList);
});

router.get("/:id", async (req, res, next) => {
  const task = await storage.getTask(req.params["id"]);
  res.status(task ? 200 : 404).json(task);
});

router.post("/", async (req, res, next) => {
  const task_id = uuid();
  const { body } = req;
  body.task_id = task_id;
  const newBody = await storage.createTask(body);
  res.json(newBody);
});

router.put("/:id", async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.updateTask({ ...body, task_id: req.params["id"] });
  res.json(newBody);
});

router.delete("/:id", async (req, res, next) => {
  await storage.removeTask(req.params["id"]);
  res.status(204).json({message: "deleted" });
});

export default router;
