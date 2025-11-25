import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { HomeStackParamList } from "../../app/navigation/types";
import CategorySelector from "../buoi14/CategorySelector";

type ProductDetailProps = NativeStackScreenProps<
  HomeStackParamList,
  "ProductDetail"
>;
const localImage: { [key: string]: any } = {
  cancau1: require("../../assets/images/products/cancau1.png"),
  cancau2: require("../../assets/images/products/cancau2.png"),
  cancau3: require("../../assets/images/products/cancau3.png"),
  cancau4: require("../../assets/images/products/cancau4.png"),
  cancau5: require("../../assets/images/products/cancau5.png"),
  cancau6: require("../../assets/images/products/cancau6.png"),
  cancau7: require("../../assets/images/products/cancau7.png"),
};
const ProductDetail = ({ route, navigation }: ProductDetailProps) => {
  const { product } = route.params;
  return (
    <View style={styles.container}>
      <Image
        source={
          product.img.startsWith("file://")
            ? { uri: product.img }
            : localImage[product.img]
        }
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}đ</Text>
      {/* Xem cac san pham khac */}
      <CategorySelector id={product.categoryId}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#007bff",
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProductDetail;
