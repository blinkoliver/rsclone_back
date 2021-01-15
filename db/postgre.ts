import * as initKnex from "knex";
import * as dotenv from "dotenv";

dotenv.config();
const { PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT} = process.env;
const dbName = "clonewarsDB";
const url = `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${dbName}`;

const knex = initKnex({
  client: "pg",
  connection: url,
  debug: true,
});
export default knex;
