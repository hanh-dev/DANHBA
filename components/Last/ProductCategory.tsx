import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Category, getAllCategories } from "../buoi12/database";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductByCategoryParamList } from "@/app/navigation/types";
import { useNavigation } from "expo-router";

export const PRODUCT_IMAGES: { [key: string]: any } = {
  vegetable: require("../../assets/grocery/vegetable.png"),
  fruit: require("../../assets/grocery/fruit2.png"),
  spice: require("../../assets/grocery/spice2.png"),
  ingridient: require("../../assets/grocery/Ingridient.png"),
  sideDishes: require("../../assets/grocery/sideDishes.png"),
};

const BACKGROUND_COLORS: string[] = [
  "#E8F9FF",
  "#F2FFF2",
  "#FFF0F5",
  "#EAE8FF",
  "#FFF8EE",
  "#EAE8FF",
];

type NavigationProps = NativeStackNavigationProp<ProductByCategoryParamList, "Category">;
const CategoryItem = ({ item, index }: { item: Category; index: number }) => {
  const imageSource = PRODUCT_IMAGES[item.img] || PRODUCT_IMAGES["vegetable"];
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { backgroundColor: BACKGROUND_COLORS[index], width: 150, height: 150 },
      ]}
      onPress={() => navigation.navigate("ProductByCategory", {id: item.id})}
    >
      <Image
        source={imageSource}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const ProductCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navItemActive}>All Categories 🦚</Text>
      </View>

      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <CategoryItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductCategory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    padding: 10,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginBottom: 5 * 2,
  },
  navItem: {
    marginRight: 15,
    fontSize: 14,
    color: "#A0A0A0",
    fontWeight: "500",
  },
  navItemActive: {
    marginRight: 15,
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  listContent: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
    margin: 10 / 2,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",

    // elevation: 2,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
  },
  itemImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "80%",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
});
