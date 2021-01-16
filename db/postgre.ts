import * as initKnex from "knex";
import * as dotenv from "dotenv";

dotenv.config();
const url = process.env.DATABASE_URL

const knex = initKnex({
  client: "pg",
  connection: url,
  debug: true,
});
export default knex;
