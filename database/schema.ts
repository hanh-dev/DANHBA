import * as SQLite from "expo-sqlite";

const createCategoriesTable = async (db: SQLite.SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`;
    await db.execAsync(query);
    console.log("Categories table created or already exists");
};

const createProductsTable = async (db: SQLite.SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      img TEXT,
      categoryId INTEGER,
      FOREIGN KEY (categoryId) REFERENCES categories (id)
    )`;
    await db.execAsync(query);
    console.log("Products table created or already exists");
};

const createUsersTable = async (db: SQLite.SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )`;
    await db.execAsync(query);
    console.log("Users table created or already exists");
};

export { createCategoriesTable, createProductsTable, createUsersTable };
