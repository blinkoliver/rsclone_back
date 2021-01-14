import * as initknex from "knex";
import { CardType } from "../types/cardType";
import { TaskType } from "../types/taskType"
const { PG_USERNAME, PG_PASSWORD, PG_HOST } = process.env;
const dbName = "clonewarsDB";
const cardsTable = "cards";
const tasksTable = "tasks";
const url = `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}/${dbName}`;

const knex = initknex({
  client: "pg",
  connection: url,
  debug: true,
});

export const getAllCards = async () => {
  return knex(cardsTable).select();
};

export const getCard = async (id: string) => {
  const list = knex(cardsTable).select().where({ id });
  return list[0];
};

export const createCard = async (item: CardType) => {
  const { card_id, title, complete, dashboard_id } = item;
  const list = knex(cardsTable)
    .insert({card_id, title, complete, dashboard_id})
    .returning("*");
  return list[0];
};

export const updateCard = async (item: CardType) => {
  const { card_id, title, complete, dashboard_id } = item;
  const list = knex(cardsTable)
    .update({card_id, title, complete, dashboard_id})
    .where({ card_id })
    .returning("*");
  return list[0];
};

export const removeCard = async (id: string) => {
  if (!id) {
    return;
  }
  knex(cardsTable).delete().where({ id });
};

export const getAllTasks = async () => {
  return knex(tasksTable).select();
};

export const getTask = async (id: string) => {
  const list = knex(tasksTable).select().where({ id });
  return list[0];
};

export const createTask = async (item: TaskType) => {
  const { task_id, title, isDone, card_id } = item;
  const list = knex(tasksTable)
    .insert({ task_id, title, isDone, card_id })
    .returning("*");
  return list[0];
};

export const updateTask = async (item: TaskType) => {
  const { task_id, title, isDone, card_id } = item;
  const list = knex(tasksTable)
    .update({ task_id, title, isDone, card_id })
    .where({ task_id })
    .returning("*");
  return list[0];
};

export const removeTask = async (id: string) => {
  if (!id) {
    return;
  }
  knex(tasksTable).delete().where({ id });
};