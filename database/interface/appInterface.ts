export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    img?: string | null;
    categoryId: number | null;
}

export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
}