import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;
const dbConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;
  // User table
  db = await SQLite.openDatabaseAsync("store.db");
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
  // Order
  const createOrdersTableQuery = `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_date TEXT NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`;
  await db.execAsync(createOrdersTableQuery);
  // Order Detail
  const createOrdersDetailQuery = `CREATE TABLE IF NOT EXISTS order_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`;
  await db.execAsync(createOrdersDetailQuery);
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

export const deleteUserServer = async (id: number): Promise<void> => {
  const database = await dbConnection();
  await database.runAsync("DELETE FROM users where id = ?", [id]);
};

type EditUserData = {
  id: number;
  name: string;
  role: string;
};

export const updateUser = async (user: EditUserData): Promise<void> => {
  const database = await dbConnection();
  await database.runAsync("UPDATE users SET name = ?, role = ? WHERE id = ?", [
    user.name,
    user.role,
    user.id,
  ]);
};

export const getUserById = async (id: number): Promise<User | null> => {
  const database = await dbConnection();
  const results = await database.getAllAsync(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  if (results.length > 0) {
    const row = results[0] as any;
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role,
    };
  }
  return null;
};

export const updateUserInfo = async (user: User): Promise<boolean> => {
  const database = await dbConnection();
  try {
    await database.runAsync(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [user.name, user.email, user.password, user.id]
    );
    return true;
  } catch (error) {
    return false;
  }
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
      `INSERT INTO products (id, name, price, img, categoryId)
       VALUES ('${product.id}', '${product.name}', '${product.price}', '${product.img}', '${product.categoryId}');`
    );
  }

  console.log("✅ Products initialized successfully!");
};

export const initSampleData = async () => {
  await initUsers();
  await initCategories();
  await initProducts();
};

export const addCategory = async (category: Category) => {
  const database = await dbConnection();
  await database.runAsync("INSERT INTO categories (name, img) VALUES (?, ?)", [
    category.name,
    category.img,
  ]);
};

export const updateCategory = async (category: Category) => {
  const database = await dbConnection();
  await database.runAsync(
    "UPDATE categories SET name = ?, img = ? WHERE id = ?",
    [category.name, category.img, category.id]
  );
};

export const deleteCategory = async (id: number) => {
  const database = await dbConnection();
  await database.runAsync("DELETE FROM categories where id = ?", [id]);
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
};

export type OrderItem = {
  product_id: number;
  quantity: number;
  price: number;
};

export type NewOrder = {
  user_id: number;
  items: OrderItem[];
  status: string;
};
export const addOrder = async (
  newOrder: NewOrder
): Promise<{ status: boolean; orderId?: number }> => {
  const database = await dbConnection();
  console.log("Check data: ", newOrder);
  let orderId: number | undefined;

  const totalAmount = newOrder.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const orderDate = new Date().toISOString();

  try {
    const result = await database.runAsync(
      `INSERT INTO orders (user_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)`,
      [newOrder.user_id, orderDate, totalAmount, newOrder.status]
    );

    orderId = result.lastInsertRowId;

    for (const item of newOrder.items) {
      await database.runAsync(
        `INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    console.log(
      `✅ Order ${orderId} added with ${newOrder.items.length} items.`
    );
    return { status: true, orderId };
  } catch (error) {
    console.error("❌ Lỗi khi thêm đơn hàng:", error);
    return { status: false };
  }
};

export const updateOrderStatus = async (
  orderId: number,
  newStatus: string
): Promise<boolean> => {
  try {
    const database = await dbConnection();
    await database.runAsync("UPDATE orders SET status = ? WHERE id = ?", [
      newStatus,
      orderId,
    ]);
    return true;
  } catch (error) {
    return false;
  }
};

const groupOrderData = (rawResults: any[]) => {
  const ordersMap = new Map();

  rawResults.forEach((row) => {
    const orderId = row.order_id;

    if (!ordersMap.has(orderId)) {
      ordersMap.set(orderId, {
        id: row.order_id,
        user_id: row.user_id,
        order_date: row.order_date,
        total_amount: row.total_amount,
        status: row.status,
        items: [],
      });
    }

    if (row.product_id) {
      ordersMap.get(orderId).items.push({
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.price,
      });
    }
  });

  return Array.from(ordersMap.values());
};

export const getOrders = async (): Promise<any[]> => {
  const database = await dbConnection();
  const query = `
        SELECT
            o.id AS order_id,
            o.user_id,
            o.order_date,
            o.total_amount,
            o.status,
            od.product_id,
            od.quantity,
            od.price,
            p.name AS product_name
        FROM
            orders o
        LEFT JOIN
            order_details od ON o.id = od.order_id
        LEFT JOIN
            products p ON od.product_id = p.id
        ORDER BY
            o.order_date DESC;
    `;
  const results = await database.getAllAsync(query);
  return groupOrderData(results);
};

export const getOrdersByUserId = async (userId: number): Promise<any[]> => {
  const database = await dbConnection();
  const query = `
        SELECT
            o.id AS order_id,
            o.user_id,
            o.order_date,
            o.total_amount,
            o.status,
            od.product_id,
            od.quantity,
            od.price,
            p.name AS product_name
        FROM
            orders o
        LEFT JOIN
            order_details od ON o.id = od.order_id
        LEFT JOIN
            products p ON od.product_id = p.id
        WHERE
            o.user_id = ?
        ORDER BY
            o.order_date DESC;
    `;
  const results = await database.getAllAsync(query, [userId]);
  return groupOrderData(results);
};
export const deleteOrder = async (orderId: number): Promise<boolean> => {
  const database = await dbConnection();
  try {
    await database.runAsync("DELETE FROM orders where id = ?", [orderId]);
    return true;
  } catch (error) {
    return false;
  }
};
// getUserId
export const getUserId = async (): Promise<number | null> => {
  try {
    const userIdJson = await AsyncStorage.getItem("userId");

    if (userIdJson !== null) {
      const userId = JSON.parse(userIdJson);

      return typeof userId === "number" ? userId : null;
    }

    return null;
  } catch (error) {
    console.error("Lỗi khi lấy User ID từ AsyncStorage:", error);
    return null;
  }
};

export default dbConnection;
