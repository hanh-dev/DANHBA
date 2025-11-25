import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HomeStackParamList, Product } from "../../app/navigation/types";
import { getAllProducts } from "../buoi12/database";

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, "Home">;

const HomeScreen2 = ({ navigation }: HomeScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    loadProducts();
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <View style={styles.productCard}>
        <Image source={{ uri: item.img }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}đ</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Mua Ngay</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Chào mừng đến với cửa hàng!</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  buyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default HomeScreen2;
