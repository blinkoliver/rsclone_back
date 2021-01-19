import knex from "../db/postgre";
import { CardType } from "../types/cardType";
import { TaskType } from "../types/taskType";
const cardsTable = "cards";
const tasksTable = "tasks";
export const getAllCards = async () => {
  return await knex(cardsTable).select();
};

export const getCard = async (card_id: string) => {
  const list = await knex(cardsTable).select().where({ card_id });
  return list[0];
};

export const createCard = async (item: CardType) => {
  const { card_id, title, complete, dashboard_id } = item;
  const list = await knex(cardsTable)
    .insert({ card_id, title, complete, dashboard_id })
    .returning("*");
  return list[0];
};

export const updateCard = async (item: CardType) => {
  const { card_id, title, complete, dashboard_id } = item;
  const list = await knex(cardsTable)
    .update({ card_id, title, complete, dashboard_id })
    .where({ card_id })
    .returning("*");
  return list[0];
};

export const removeCard = async (card_id: string) => {
  if (!card_id) {
    return;
  }
  await knex(cardsTable).delete().where({ card_id });
};

export const getAllTasks = async () => {
  return await knex(tasksTable).select();
};

export const getTask = async (task_id: string) => {
  const list = await knex(tasksTable).select().where({ task_id });
  return list[0];
};

export const createTask = async (item: TaskType) => {
  const { task_id, title, isDone, card_id } = item;
  const list = await knex(tasksTable)
    .insert({ task_id, title, isDone, card_id })
    .returning("*");
  return list[0];
};

export const updateTask = async (item: TaskType) => {
  const { task_id, title, isDone, card_id } = item;
  const list = await knex(tasksTable)
    .update({ task_id, title, isDone, card_id })
    .where({ task_id })
    .returning("*");
  return list[0];
};

export const removeTask = async (task_id: string) => {
  if (!task_id) {
    return;
  }
  await knex(tasksTable).delete().where({ task_id });
};
