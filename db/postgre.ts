import * as initKnex from "knex";
const { PG_USERNAME, PG_PASSWORD, PG_HOST, PG_PORT } = process.env;
const dbName = "clonewarsDB";
const url =`postgres://postgres:message2012message@localhost:5432/clonewarsDB`
  // `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${dbName}`;
const knex = initKnex({
  client: "pg",
  connection: url,
  debug: true,
});
export default knex;
