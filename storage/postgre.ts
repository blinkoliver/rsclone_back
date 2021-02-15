import knex from "../db/postgre";
import { TodoType } from "../types/todoType";
import { todosTable, usersTable } from "../constants";

const assertUserId = (user_id: string) => {
  if (!user_id) {
    throw new Error("user_id must be provided");
  }
};

export const getUsernameById = async (user_id: string) => {
  assertUserId(user_id);
  return await knex(usersTable).select("username").where({user_id});
};

export const getAllTodos = async (user_id: string) => {
  assertUserId(user_id);
  return await knex(todosTable).select().where({ user_id });
};

export const getTodo = async (user_id: string, todo_id: string) => {
  assertUserId(user_id);
  const list = await knex(todosTable).select().where({ todo_id, user_id });
  return list[0];
};

export const createTodo = async (user_id: string, item: TodoType) => {
  assertUserId(user_id);
  const { todo_id, title, isDone, tasks, filter } = item;
  const list = await knex(todosTable)
    .insert({ todo_id, user_id, title, isDone, tasks, filter })
    .returning("*");
  return list[0];
};

export const updateTodo = async (user_id: string, item: TodoType) => {
  assertUserId(user_id);
  const { todo_id, title, isDone, tasks, filter } = item;
  const list = await knex(todosTable)
    .update({ todo_id, user_id, title, isDone, tasks, filter })
    .where({ todo_id })
    .returning("*");
  return list[0];
};

export const removeTodo = async (user_id: string, todo_id: string) => {
  assertUserId(user_id);
  if (!todo_id) {
    return;
  }
  await knex(todosTable).delete().where({ todo_id, user_id });
};