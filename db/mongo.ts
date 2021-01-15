import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = process.env;

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`;
const dbName = "clonewarsDB";

export const getMongoDB = async () => {
  const client = await MongoClient.connect(url);
  return client.db(dbName);
};