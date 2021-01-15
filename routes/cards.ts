import { Router } from "express";
import { v4 as uuid } from "uuid";
import * as storage from "../storage/postgre";

const router = Router();

router.get("/", async (req, res, next) => {
  const cardList = await storage.getAllCards();
  res.json(cardList);
});

router.get("/:id", async (req, res, next) => {
  const card = await storage.getCard(req.params["id"]);
  res.status(card ? 200 : 404).json(card);
});

router.post("/", async (req, res, next) => {
  const card_id = uuid();
  const { body } = req;
  body.card_id = card_id;
  const newBody = await storage.createCard(body);
  res.json(newBody);
});

router.put("/:id", async (req, res, next) => {
  const { body } = req;
  const newBody = await storage.updateCard({
    ...body,
    card_id: req.params["id"],
  });
  res.json(newBody);
});

router.delete("/:id", async (req, res, next) => {
  await storage.removeCard(req.params["id"]);
  res.status(204).json({ message: "deleted" });
});

export default router;
