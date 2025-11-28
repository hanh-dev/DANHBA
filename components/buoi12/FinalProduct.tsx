import { HomeStackParamList } from "@/app/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BannerCarousel from "../Last/BannerCarousel";
import CategoryList, { CategoryUI } from "../Last/CategoryList";
import Header from "../Last/Header";
import ProductCard from "../Last/ProductCard";
import {
  Category,
  getAllCategories,
  getAllProducts,
  Product,
} from "./database";
const CATEGORY_UI_MAP: { [key: string]: { icon: any; color: string } } = {
  Vegetables: {
    icon: require("../../assets/grocery/vegetable.png"),
    color: "#E6F7E6",
  },
  Fruit: {
    icon: require("../../assets/grocery/fruit.png"),
    color: "#FBE6E6",
  },
  Spice: {
    icon: require("../../assets/grocery/spice.png"),
    color: "#FFFBE6",
  },
  Ingridients: {
    icon: require("../../assets/grocery/Ingridient.png"),
    color: "#EBE6FB",
  },
  "Side Dishes": {
    icon: require("../../assets/grocery/sideDishes.png"),
    color: "#E6FAFB",
  },
};

const mapCategoryToUI = (categories: Category[]): CategoryUI[] => {
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    icon: CATEGORY_UI_MAP[cat.name]?.icon || null,
    backgroundColor: CATEGORY_UI_MAP[cat.name]?.color || "#F0F0F0",
  }));
};

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, "Home">;

const FinalProduct = ({ navigation }: HomeScreenProps) => {
  const [categories, setCategories] = useState<CategoryUI[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const rawCategories: Category[] = await getAllCategories();
      console.log("Tesst categories: ", rawCategories);

      const uiCategories = mapCategoryToUI(rawCategories);

      setCategories(uiCategories);

      // Product List
      const rawProducts: Product[] = await getAllProducts();
      console.log("Test product list: ", rawProducts);
      setProducts(rawProducts);
    } catch (error) {
      console.error("Error fetching product list: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />

        {/* Search */}
        <View style={styles.searchWrapp}>
          <TextInput
            style={styles.input}
            placeholder="Search here anything you want..."
          />
          <Ionicons style={styles.searchIcon} name="search-outline" size={18} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Carousel */}
          <BannerCarousel />

          {/* Category List */}
          <CategoryList categories={categories} />
          {/* Product List */}
          <Text style={styles.headerText}>Best deals 🔥</Text>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              />
            )}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default FinalProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  searchWrapp: {
    position: "relative",
    justifyContent: "center",
    marginTop: 15,
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    color: "#658C58",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF5656",
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#658C58",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    paddingRight: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#658C58",
    marginLeft: 10
  },
});
