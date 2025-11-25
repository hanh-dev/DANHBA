import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
const dbConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;

  db = await SQLite.openDatabaseAsync("management_3.db");
  //   category table
  const createCategoriesTableQuery = `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`;
  await db.execAsync(createCategoriesTableQuery);
  //   product table
  const createProductsTableQuery = `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    img TEXT NOT NULL,
    categoryId INTEGER NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories (id)
  )`;
  await db.execAsync(createProductsTableQuery);
  return db;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  categoryId: number;
};

const categoriesData: Category[] = [
  { id: 1, name: "Áo" },
  { id: 2, name: "Giày" },
  { id: 3, name: "Balo" },
  { id: 4, name: "Mũ" },
  { id: 5, name: "Túi" },
];

const initialProducts: Product[] = [
  { id: 1, name: "Áo sơ mi", price: 250000, img: "cancau1", categoryId: 1 },
  {
    id: 2,
    name: "Giày sneaker",
    price: 1100000,
    img: "cancau1",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Balo thời trang",
    price: 490000,
    img: "cancau1",
    categoryId: 3,
  },
  {
    id: 4,
    name: "Mũ lưỡi trai",
    price: 120000,
    img: "cancau1",
    categoryId: 4,
  },
  {
    id: 5,
    name: "Túi xách nữ",
    price: 980000,
    img: "cancau1",
    categoryId: 5,
  },
];

export const initCategories = async (): Promise<void> => {
  const database = await dbConnection();

  for (const category of categoriesData) {
    await database.execAsync(
      `INSERT INTO categories (id, name) VALUES ('${category.id}', '${category.name}');`
    );
  }

  console.log("✅ Categories initialized (transaction)");
};

export const initProducts = async (): Promise<void> => {
  const database = await dbConnection();

  for (const product of initialProducts) {
    await database.execAsync(
      `INSERT INTO products (id, name, price, img, categoryId) VALUES ('${product.id}', '${product.name}', '${product.price}', '${product.img}', '${product.categoryId}');`
    );
  }

  console.log("✅ Products initialized (transaction)");
};

export const initSampleData = async () => {
  await initCategories();
  await initProducts();
};

export const getAllProducts = async (): Promise<Product[]> => {
  const database = await dbConnection();
  const results = await database.getAllAsync("SELECT * FROM products");
  let products: Product[] = [];
  for (const row of results as any[]) {
    products.push({
      id: row.id,
      name: row.name,
      price: row.price,
      img: row.img,
      categoryId: row.categoryId,
    });
  }
  return products;
};

export const addProduct = async (product: Product) => {
  const database = await dbConnection();
  await database.runAsync(
    "INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)",
    [product.name, product.price, product.img, product.categoryId]
  );
};

export const updateProduct = async (product: Product) => {
  const databas = await dbConnection();
  await databas.runAsync(
    "UPDATE products SET name = ?, price = ?, img = ?, categoryId = ? WHERE id = ?",
    [product.name, product.price, product.img, product.categoryId, product.id]
  );
}

export default dbConnection;
