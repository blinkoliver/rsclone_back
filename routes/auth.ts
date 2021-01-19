import { Router } from "express";
import knex from "../db/postgre";
import * as dotenv from "dotenv";
import * as crypto from "crypto";
import { v4 as uuid } from "uuid";

dotenv.config();
const salt = process.env.PG_SALT;

const usersTable = "users";
const sessionsTable = "sessions";

const router = Router();

const getPasswordHash = (password: string) => {
  return crypto
    .createHash("md5")
    .update(password + salt)
    .digest("hex");
};

const generateToken = () => uuid();

router.post("/login", async (req, res, next) => {
  const {
    body: { email, password },
  } = req;
  const passwordHash = getPasswordHash(password);

  const [user] = await knex(usersTable).select().where({ email, passwordHash });
  const statusCode = user ? 200 : 403;
  const token = user ? generateToken() : undefined;
  const reason = user ? undefined : "Invalid password";

  if (token) {
    await knex(sessionsTable).insert({
      token,
      user_id: user.user_id,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
  }

  const response = {
    statusCode,
    token,
    reason,
  };
  res.json(response);
});

router.post("/registration", async (req, res, next) => {
  const {
    body: { username, email, password },
  } = req;
  const passwordHash = getPasswordHash(password);
  const dashboard_id = uuid();
  const user_id = uuid();
  const token = generateToken();

  let query = knex(usersTable).select().where({ email });

  if (username) {
    query = query.orWhere({ username });
  }

  const [user] = await query;

  if (user) {
    res.json({
      statusCode: 400,
      reason: `User ${username} is already registered`,
    });
    return;
  }

  await knex(usersTable).insert({ user_id, username, email, passwordHash, dashboard_id });

  const statusCode = 200;

  if (token) {
    await knex(sessionsTable).insert({
      token,
      user_id: user_id,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
  }

  const response = {
    statusCode,
    token,
  };

  res.json(response);
});

router.post("/test", async (req, res, next) => {
  const token = req.header("Authorization");

  const [session] = await knex(sessionsTable).select().where({ token });

  const statusCode =
    session && new Date(session.expiresAt).getTime() > Date.now() ? 200 : 403;

  res.json({
    statusCode,
  });
});

export default router;
