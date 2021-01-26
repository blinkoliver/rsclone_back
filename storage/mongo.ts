import { TodoType } from "../types/todoType";
import {getMongoDB} from "../db/mongo"
const cardsCollection = "cards";

const getCardsCollection = async () => {
  const db = await getMongoDB();
  return db.collection(cardsCollection);
};

export const getAllCards = async () => {
  const collection = await getCardsCollection();
  return collection.find({}).toArray();
};
export const getCard = async (todo_id: string) => {
  const collection = await getCardsCollection();
  return collection.findOne({ todo_id });
};
export const createCard = async (item: TodoType) => {
  const collection = await getCardsCollection();
  const response = collection.insertOne(item);
  return (await response).ops[0];
};
export const updateCard = async (item: TodoType) => {
  const collection = await getCardsCollection();
  const todo_id = item.todo_id;
  const response = collection.replaceOne({ todo_id }, item);
  return (await response).ops[0];
};
export const removeCard = async (todo_id: string) => {
  const collection = await getCardsCollection();
  return collection.deleteOne({ todo_id });
};