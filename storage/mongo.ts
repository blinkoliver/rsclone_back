import { CardType } from "../types/cardType";
import { TaskType } from "../types/taskType"
import {getMongoDB} from "../db/mongo"

const cardsCollection = "cards";
const tasksCollection = "tasks";

const getCardsCollection = async () => {
  const db = await getMongoDB();
  return db.collection(cardsCollection);
};
const getTasksCollection = async () => {
  const db = await getMongoDB();
  return db.collection(tasksCollection);
};

export const getAllCards = async () => {
  const collection = await getCardsCollection();
  return collection.find({}).toArray();
};
export const getCard = async (card_id: string) => {
  const collection = await getCardsCollection();
  return collection.findOne({ card_id });
};
export const createCard = async (item: CardType) => {
  const collection = await getCardsCollection();
  const response = collection.insertOne(item);
  return (await response).ops[0];
};
export const updateCard = async (item: CardType) => {
  const collection = await getCardsCollection();
  const card_id = item.card_id;
  const response = collection.replaceOne({ card_id }, item);
  return (await response).ops[0];
};
export const removeCard = async (card_id: string) => {
  const collection = await getCardsCollection();
  return collection.deleteOne({ card_id });
};

export const getAllTasks = async () => {
  const collection = await getTasksCollection();
  return collection.find({}).toArray();
};
export const getTask = async (task_id: string) => {
  const collection = await getTasksCollection();
  return collection.findOne({ task_id });
};
export const createTask = async (item: TaskType) => {
  const collection = await getTasksCollection();
  const response = collection.insertOne(item);
  return (await response).ops[0];
};
export const updateTask = async (item: TaskType) => {
  const collection = await getTasksCollection();
  const task_id = item.task_id;
  const response = collection.replaceOne({ task_id }, item);
  return (await response).ops[0];
};
export const removeTask = async (task_id: string) => {
  const collection = await getTasksCollection();
  return collection.deleteOne({ task_id });
};

