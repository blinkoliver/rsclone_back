import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { CardType } from "../types/cardType";

dotenv.config();
// const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = process.env;

const url = `mongodb+srv://blinkoliver:Tmxeo5ZbVJtdbscr@clonewarscluster.kv87i.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "clonewarsDB";
const collectionName = "cards";

const getMongoInstance = async () => {
  const client = await MongoClient.connect(url);
  return client.db(dbName);
};
const getCollection = async () => {
  const db = await getMongoInstance();
  return db.collection(collectionName);
};

export const listAll = async () => {
  const collection = await getCollection();
  return collection.find({}).toArray();
};

export const getById = async (id: string) => {
  const collection = await getCollection();
  return collection.findOne({ id });
};

export const create = async (item: CardType) => {
  const collection = await getCollection();
  item["_id"] = item.id;
  const response = collection.insertOne(item);
  return (await response).ops[0];
};

export const update = async (item: CardType) => {
  const collection = await getCollection();
  const _id  = item.id;
  const response = collection.replaceOne({ _id }, item);
  return (await response).ops[0]
};
export const remove = async (id: string) => {
  const collection = await getCollection();
  return collection.deleteOne({ id });
};
