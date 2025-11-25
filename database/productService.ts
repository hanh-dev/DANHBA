// productService.ts
import getDB from './database';
import { Category } from './interface/appInterface';
import { Product } from './interface/appInterface';

export const initSampleData = async () => {
    try {
        const categories = await getCategories();
        if (categories.length === 0) {
            const db = await getDB();
            // Insert initial categories
            await db.runAsync('INSERT INTO categories (name) VALUES (?)', ['Electronics']);
            await db.runAsync('INSERT INTO categories (name) VALUES (?)', ['Books']);
            await db.runAsync('INSERT INTO categories (name) VALUES (?)', ['Clothing']);
            // Insert initial products
            await db.runAsync('INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)', ['Smartphone', 699.99, 'smartphone.jpg', 1]);
            await db.runAsync('INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)', ['Laptop', 999.99, 'laptop.jpg', 1]);
            await db.runAsync('INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)', ['Novel', 19.99, 'novel.jpg', 2]);
            await db.runAsync('INSERT INTO products (name, price, img, categoryId) VALUES (?, ?, ?, ?)', ['T-Shirt', 14.99, 'tshirt.jpg', 3]);
            console.log('✅ Initial categories inserted');
        } else {
            console.log('ℹ️ Categories already initialized');
        }
    } catch (error) {
        console.log('❌ initData error:', error);
    }
}

export const addProduct = async (product: { name: string; price: number }) => {
  try {
    const db = await getDB();
    await db.runAsync('INSERT INTO products (name, price) VALUES (?, ?)', [
      product.name,
      product.price,
    ]);
  } catch (error) {
    console.log('❌ addProduct error:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const db = await getDB();
    const results = await db.getAllAsync('SELECT * FROM categories');
    return results as Category[];
  } catch (error) {
    console.log('❌ getCategories error:', error);
    return [];
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const db = await getDB();
    const results = await db.getAllAsync('SELECT * FROM products');
    let products: Product[] = [];
    for (let i = 0; i < results.length; i++) {
      products.push(results[i] as Product);
    }
    return products;
  } catch (error) {
    console.log('❌ getAllProducts error:', error);
    return [];
  }
};
