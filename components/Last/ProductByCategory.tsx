import { ProductByCategoryParamList } from "@/app/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllProductByCategories, Product } from "../buoi12/database";
import ProductCard from "./ProductCard";
type ProductByCategoryRouteProp = RouteProp<
  ProductByCategoryParamList,
  "ProductByCategory"
>;
type NavigationProps = NativeStackNavigationProp<
  ProductByCategoryParamList,
  "ProductByCategory"
>;
const ProductByCategory = () => {
  const route = useRoute<ProductByCategoryRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const [products, setProducts] = useState<Product[]>([]);

  const categoryId = route.params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getAllProductByCategories(categoryId);
        setProducts(products);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.backWrapp}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1A5319" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product by categories 😈</Text>
      </View>
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
    </View>
  );
};

export default ProductByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  backWrapp: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    gap: 4
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#658C58",
  },
});
