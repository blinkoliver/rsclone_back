import { promises as fsp } from "fs";
import { TodoType } from "../types/todoType";

const fileName = "cards.json";
const filePath = `${__dirname}/${fileName}`;

const readCardList = async (): Promise<TodoType[]> => {
  let list: TodoType[] = [];
  try {
    const contents = await fsp.readFile(filePath, "utf-8");
    const parsedList = JSON.parse(contents);
    if (!Array.isArray(list)) {
      throw new TypeError();
    }
    list = parsedList;
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }
    console.warn(`There was error: ${e.message}`);
  }
  return list;
};

const writeCardList = async (list: TodoType[]): Promise<TodoType[]> => {
  const stringifidedList = JSON.stringify(list);
  await fsp.writeFile(filePath, stringifidedList, "utf-8");
  return list;
};

export const listAll = async () => await readCardList();

export const getById = async (id: string): Promise<TodoType | undefined> => {
  const list = await readCardList();
  return list.find((el) => {
    return el.todo_id === id;
  });
};

export const create = async (item: TodoType): Promise<TodoType | undefined> => {
  const list = await readCardList();
  list.push(item);
  await writeCardList(list);
  return item;
};

export const update = async (item: TodoType): Promise<TodoType> => {
  const list = await readCardList();
  const index = list.findIndex((el) => el.todo_id === item.todo_id);
  if (index !== -1) {
    throw new Error();
  }
  list[index] = item;
  await writeCardList(list);
  return item;
};
export const remove = async (id: string): Promise<void> => {
  const list = await readCardList();
  const index = list.findIndex((el) => el.todo_id === id);
  list.splice(index, 1);
  await writeCardList(list);
};
