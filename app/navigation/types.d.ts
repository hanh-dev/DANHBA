import { Category, Product } from "@/components/buoi12/database";

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
  ProductsByCategory: {
    categoryId: number;
    categoryName?: string;
    categories?: Category[];
  };
  CategorySelector: undefined;
  Filter: undefined;
  Checkout: undefined;
  Cart: undefined;
};

export type HomeAdminStackParamList = {
  Home: undefined;
  UserManagement: undefined;
  CategoryManagement: undefined;
  ProductManagement: undefined;
};

export type ProfileStackParamList = {
  BMI: undefined;
  ProductDetail: { product: Product };
  Profile: undefined
  EditProfile: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type AdminTabParamList = {
  Home: undefined;
  Users: undefined;
  Categories: undefined;
  Products: undefined;
};

export type ProductDetailParamList = {
  Detail: undefined;
  ProductByCategory: { id: number };
};

export type ProductByCategoryParamList = {
  Category: undefined;
  ProductByCategory: {id: number},
  ProductDetail: {product: Product}
}

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Admin: undefined;
};

export const PRODUCT_IMAGES: { [key: string]: any } = {
  vegetable: require("../../assets/grocery/vegetable.png"),
  fruit: require("../../assets/grocery/fruit2.png"),
  spice: require("../../assets/grocery/spice2.png"),
  ingridient: require("../../assets/grocery/Ingridient.png"),
  sideDishes: require("../../assets/grocery/sideDishes.png"),
};

export { Product };
