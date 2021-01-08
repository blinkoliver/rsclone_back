import { Router } from "express";
import { v4 as uuid } from "uuid";
import * as storage from "../storage/mongo";

const router = Router();

router.get("/", async (req, res, next) => {
  const cardList = await storage.listAll();
  res.json(cardList);
});

router.get("/:id", async (req, res, next) => {
  const card = await storage.getById(req.params["id"]);
  res.status(card ? 200 : 404).json(card);
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
