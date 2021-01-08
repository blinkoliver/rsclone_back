import { Router } from "express";
import { v4 as uuid } from "uuid";
import * as storage from "../storage/mongo";

const router = Router();

router.get("/", async (req, res, next) => {
  const taskList = await storage.listAll();
  res.json(taskList);
});
router.get("/:id", async (req, res, next) => {
  const task = await storage.getById(req.params["id"]);
  res.status(task ? 200 : 404).json(task);
});

router.post("/", async (req, res, next) => {
  const id = uuid();
  const { body } = req;
  body.id = id;
  const newBody = await storage.create(body);
  res.json(newBody);
});

router.put("/:id", async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.update({ ...body, id: req.params["id"] });
  res.json(newBody);
});

router.delete("/:id", async (req, res, next) => {
  await storage.remove(req.params["id"]);
  res.status(204).json(["deleted"]);
});
export default router;
