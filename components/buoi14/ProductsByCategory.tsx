import { HomeStackParamList } from "@/app/navigation/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllProducts, Product } from "../buoi12/database";
import CategorySelector from "./CategorySelector";
type ProductDetailRouteProp = RouteProp<
  HomeStackParamList,
  "ProductsByCategory"
>;

type NavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  "ProductsByCategory"
>;
const ProductsByCategory = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const [products, setProducts] = useState<Product[]>([]);
  const { categoryId } = route.params;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      const filterProduct: Product[] = data.filter(
        (product) => product.categoryId === categoryId
      );
      if (filterProduct) {
        setProducts(filterProduct);
      }
    };
    fetchProducts();
  }, [categoryId]);

  const localImage: { [key: string]: any } = {
    cancau1: require("../../assets/images/products/cancau1.png"),
    cancau2: require("../../assets/images/products/cancau2.png"),
    cancau3: require("../../assets/images/products/cancau3.png"),
    cancau4: require("../../assets/images/products/cancau4.png"),
    cancau5: require("../../assets/images/products/cancau5.png"),
    cancau6: require("../../assets/images/products/cancau6.png"),
    cancau7: require("../../assets/images/products/cancau7.png"),
  };

  return (
    <View>
      <CategorySelector />
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          >
            <View style={styles.card}>
              <Image
                source={
                  item.img.startsWith("file://")
                    ? { uri: item.img }
                    : localImage[item.img]
                }
                style={styles.cardImage}
              />

              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price} VND</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ProductsByCategory;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    width: 150,
    borderWidth: 1,
    borderColor: "#8CE4FF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 130,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 14,
    color: "#FF5656",
    fontWeight: "bold",
    marginTop: 4,
  },
  iconWrapp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
