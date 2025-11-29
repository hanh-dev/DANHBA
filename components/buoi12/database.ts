import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
const dbConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;
  // User table
  db = await SQLite.openDatabaseAsync("groceryStore.db");
  const createUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT
  )`;
  await db.execAsync(createUserTableQuery);
  //   category table
  const createCategoriesTableQuery = `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img TEXT NOT NULL,
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

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type Category = {
  id: number;
  name: string;
  img: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  categoryId: number;
};

const usersData: User[] = [
  {
    id: 3,
    name: "Hanh Hio",
    email: "hanhadmin@gmail.com",
    password: "hanh123",
    role: "admin",
  },
  {
    id: 4,
    name: "Hanh Nguyen",
    email: "hanhbot12@gmail.com",
    password: "hanh123",
    role: "buyer",
  },
];

const categoriesData: Category[] = [
  { id: 1, name: "Vegetables", img: "vegetable" },
  { id: 2, name: "Fruit", img: "fruit" },
  { id: 3, name: "Spice", img: "spice" },
  { id: 4, name: "Ingridients", img: "ingridient" },
  { id: 5, name: "Side Dishes", img: "sideDishes" },
];

const initialProducts: Product[] = [
  // ========= VEGETABLES (1) =========
  { id: 1, name: "Fresh Broccoli", price: 20, img: "broccoli", categoryId: 1 },
  {
    id: 2,
    name: "Green Bell Pepper",
    price: 18,
    img: "capsicum",
    categoryId: 1,
  },
  { id: 3, name: "Baby Potato", price: 15, img: "tomato", categoryId: 1 },
  { id: 4, name: "Green Beans", price: 22, img: "pumkin", categoryId: 1 },

  // ========= FRUIT (2) =========
  { id: 5, name: "Apple", price: 30, img: "lemon", categoryId: 2 },
  { id: 6, name: "Banana", price: 12, img: "banana", categoryId: 2 },
  { id: 7, name: "Orange", price: 25, img: "orange", categoryId: 2 },
  { id: 8, name: "Blueberry", price: 60, img: "blueberry", categoryId: 2 },

  // ========= SPICE (3) =========
  { id: 9, name: "Black Pepper", price: 18, img: "blackpepper", categoryId: 3 },
  {
    id: 10,
    name: "Chili Powder",
    price: 22,
    img: "chilipowder",
    categoryId: 3,
  },
  {
    id: 11,
    name: "Turmeric Powder",
    price: 16,
    img: "turmeric",
    categoryId: 3,
  },
  {
    id: 12,
    name: "Cinnamon Sticks",
    price: 30,
    img: "cinnamon",
    categoryId: 3,
  },

  // ========= INGREDIENTS (4) =========
  { id: 13, name: "Egg", price: 27, img: "egg", categoryId: 4 },
  { id: 14, name: "Rice", price: 23, img: "rice", categoryId: 4 },
  { id: 15, name: "Chicken", price: 20, img: "chicken", categoryId: 4 },
  { id: 16, name: "Flour", price: 45, img: "flour", categoryId: 4 },

  // ========= SIDE DISHES (5) =========
  {
    id: 17,
    name: "Fried Chicken",
    price: 55,
    img: "friedchicken",
    categoryId: 5,
  },
  { id: 18, name: "French Fries", price: 30, img: "fries", categoryId: 5 },
  { id: 19, name: "Spring Rolls", price: 40, img: "springroll", categoryId: 5 },
  { id: 20, name: "Salad Bowl", price: 35, img: "salad", categoryId: 5 },
];

export const initUsers = async (): Promise<void> => {
  const database = await dbConnection();
  for (const user of usersData) {
    await database.execAsync(
      `INSERT INTO users (id, name, email, password, role) VALUES ('${user.id}', '${user.name}', '${user.email}', '${user.password}', '${user.role}')`
    );
  }
  console.log("✅ Users initialized successfully!");
};

export const initCategories = async (): Promise<void> => {
  const database = await dbConnection();

  for (const category of categoriesData) {
    await database.execAsync(
      `INSERT INTO categories (id, name, img) VALUES ('${category.id}', '${category.name}', '${category.img}');`
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
  // await initCategories();
  // await initProducts();
  // await initUsers();
};

export const getAllCategories = async (): Promise<Category[]> => {
  const database = await dbConnection();
  const results = await database.getAllAsync("SELECT * FROM categories");
  let categories: Category[] = [];
  for (const row of results as any[]) {
    categories.push({
      id: row.id,
      name: row.name,
      img: row.img,
    });
  }
  return categories;
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

export const getAllProductByCategories = async (
  id: number
): Promise<Product[]> => {
  const database = await dbConnection();
  const results = await database.getAllAsync(
    "SELECT * FROM products where categoryId = ?",
    [id]
  );
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

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

// Authentication
export type AuthResult = {
  status: boolean;
  message: string;
  data?: User;
};

export const signUp = async (user: SignUpData): Promise<AuthResult> => {
  try {
    const db = await dbConnection();
    const datas = await db.getAllAsync("Select * From users");
    for (const data of datas as any[]) {
      if (user.email === data.email) {
        return { status: false, message: "Email is already exists!" };
      }
    }
    await db.runAsync(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
    return { status: true, message: "Sign Up Successfully!" };
  } catch (error) {
    return { status: false, message: "Sign Up Error!" };
  }
};

export const signIn = async (user: LoginData) => {
  const db = await dbConnection();
  const datas = await db.getAllAsync("Select * From users");

  for (const data of datas as any[]) {
    if (data.email === user.email) {
      if (data.password === user.password) {
        const foundUser: User = {
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        };
        return {
          status: true,
          message: "Sign In successfully",
          data: foundUser,
        };
      } else {
        return { status: false, message: "Password is incorrect!" };
      }
    }
  }

  return { status: false, message: "Email is incorrect!" };
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
};

export const deleteProduct = async (id: number) => {
  const databas = await dbConnection();
  await databas.runAsync("DELETE FROM products where id = ?", [id]);
};

export const getAllUsers = async (): Promise<User[]> => {
  const database = await dbConnection();
  const results = await database.getAllAsync("SELECT * FROM users");
  let users: User[] = [];
  for (const row of results as any[]) {
    users.push({
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role,
    });
  }
  return users;
}

export default dbConnection;
