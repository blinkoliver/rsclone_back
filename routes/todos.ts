import { Router } from "express";
import { v4 as uuid } from "uuid";
import * as storage from "../storage/postgre";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, async (req, res, next) => {
  const todos = await storage.getAllTodos(req.app.get("user_id"));
  res.json(todos);
});

router.get("/:id", auth, async (req, res, next) => {
  const todo = await storage.getTodo(req.app.get("user_id"), req.params["id"]);
  res.status(todo ? 200 : 404).json(todo);
});

router.post("/", auth, async (req, res, next) => {
  const todo_id = uuid();
  const { body } = req;
  body.todo_id = todo_id;
  body.filter = "all";
  body.isDone = false;
  body.tasks = "[]";
  const newBody = await storage.createTodo(req.app.get("user_id"), body);
  res.json(newBody);
});

router.put("/:id", auth, async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.updateTodo(req.app.get("user_id"), {
    ...body,
    todo_id: req.params["id"],
  });
  res.json(newBody);
});

router.delete("/:id", auth, async (req, res, next) => {
  const todo = await storage.getTodo(req.app.get("user_id"), req.params["id"]);
  const responseBody = { message: "deleted", ...todo };
  await storage.removeTodo(req.app.get("user_id"), req.params["id"]);
  res.status(202).json(responseBody);
});

export default router;
