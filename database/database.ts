// database.ts
import * as SQLite from "expo-sqlite";
import { createCategoriesTable, createProductsTable, createUsersTable } from "./schema";

let dbInstance: SQLite.SQLiteDatabase | null = null;

const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance) return dbInstance;

  dbInstance = await SQLite.openDatabaseAsync("product_management.db");
  await createCategoriesTable(dbInstance);
  await createProductsTable(dbInstance);
  await createUsersTable(dbInstance);

  return dbInstance;
};

export default getDB;
