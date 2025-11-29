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
};

export type ProfileStackParamList = {
  BMI: undefined;
  ProductDetail: { product: Product };
  Profile: undefined
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

export type ProductByCategoryParamList = {
  Category: undefined;
  ProductByCategory: {id: number},
  ProductDetail: {product: Product}
}

export const PRODUCT_IMAGES: { [key: string]: any } = {
  vegetable: require("../../assets/grocery/vegetable.png"),
  fruit: require("../../assets/grocery/fruit2.png"),
  spice: require("../../assets/grocery/spice2.png"),
  ingridient: require("../../assets/grocery/Ingridient.png"),
  sideDishes: require("../../assets/grocery/sideDishes.png"),
};

export { Product };
