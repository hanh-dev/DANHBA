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
};

export type ProfileStackParamList = {
  BMI: undefined;
  ProductDetail: { product: Product };
};

export type BottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type ProductDetailParamList = {
  Detail: undefined;
  ProductByCategory: { id: number };
};

export { Product };
