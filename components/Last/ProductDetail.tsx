import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeStackParamList } from "../../app/navigation/types";
import { Category, getAllCategories } from "../buoi12/database";
import { CategoryUI } from "./CategoryList";
import { PRODUCT_IMAGES } from "./ProductCard";

type ProductDetailProps = NativeStackScreenProps<
  HomeStackParamList,
  "ProductDetail"
>;

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

const ProductDetail = ({ route, navigation }: ProductDetailProps) => {
  const { product } = route.params;
  const [categories, setCategories] = useState<CategoryUI[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        const mappedCategories = mapCategoryToUI(response);
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="#333"
          onPress={() => navigation.goBack()}
        />
        <Ionicons name="cart-outline" size={24} color="#333" />
      </View>

      {/* Product Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={
            product.img.startsWith("file://")
              ? { uri: product.img }
              : PRODUCT_IMAGES[product.img]
          }
          style={styles.productImage}
        />
      </View>

      {/* Name + Heart */}
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productOrigin}>Deshi Product</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FBC02D" />
            <Ionicons name="star" size={16} color="#FBC02D" />
            <Ionicons name="star" size={16} color="#FBC02D" />
            <Ionicons name="star-half" size={16} color="#FBC02D" />
            <Ionicons name="star-outline" size={16} color="#FBC02D" />
          </View>
        </View>

        <Ionicons name="heart-outline" size={30} color="#999" />
      </View>

      {/* Quantity + Price */}
      <View style={styles.rowBetween}>
        <View style={styles.quantityBox}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.priceText}>${product.price}</Text>
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>About the product</Text>
      <Text style={styles.descriptionText}>
        Cabbage is a leafy green, red, or white biennial plant grown as an
        annual vegetable crop for its dense-leaved heads. It is descended...
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.addToCartBtn}>
        <Ionicons name="cart-outline" size={22} color="#fff" />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 15,
  },

  imageWrapper: {
    width: 250,
    height: 250,
    backgroundColor: "#FBE6E6",
    borderRadius: 250,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  productImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },

  productName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2C2C2C",
  },

  productOrigin: {
    color: "#4CAF50",
    marginBottom: 5,
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 3,
  },

  quantityBox: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    gap: 15,
  },

  qtyBtn: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  priceText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  descriptionText: {
    color: "#757575",
    lineHeight: 20,
    marginBottom: 20,
  },

  addToCartBtn: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 30,
    gap: 10,
    marginTop: "auto",
  },

  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ProductDetail;
