import { Router } from "express";
import knex from "../db/postgre";
import * as dotenv from "dotenv";
import * as crypto from "crypto";
import { v4 as uuid } from "uuid";
import { auth } from "../middleware/auth";
import { usersTable, sessionsTable } from "../constants";

dotenv.config();
const salt = process.env.PG_SALT;

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
    username: user.username,
    email: user.email,
    userId: user.user_id,
  };
  res.json(response);
});

router.post("/registration", async (req, res, next) => {
  const {
    body: { username, email, password },
  } = req;
  const passwordHash = getPasswordHash(password);
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

  await knex(usersTable).insert({ user_id, username, email, passwordHash });

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
    username,
    email,
  };

  res.json(response);
});

router.get("/", auth, async (req, res, next) => {
  const user_id = req.app.get("user_id");
  const user = await knex(usersTable).select().where({ user_id });

  res.status(200).json({
    statusCode: 200,
    username: user[0].username,
    email: user[0].email,
    userId: user_id,
  });
});

export default router;
