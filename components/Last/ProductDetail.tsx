import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { HomeStackParamList } from "../../app/navigation/types";
import {
  AddCart,
  addToCart,
  Category,
  getAllCategories,
  getUserId,
} from "../buoi12/database";
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
  const [isWishListed, setIsWishListed] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdddToWishList = () => {
    setIsWishListed(!isWishListed);
    if (isWishListed === false) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Add to wishlist successfully! 🎉",
      });
    }
    console.log("Add to wishlist", product.id);
  };

  const handleAddToCart = async (productId: number) => {
    const userId = await getUserId();
    console.log("Check userId: ", userId);

    const newCartItem: AddCart = {
      user_id: userId || 4,
      product_id: productId,
      quantity: quantity,
    };
    console.log("Check cart item data: ", newCartItem);

    try {
      const result = await addToCart(newCartItem);
      if (result) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Added to cart successfully! 🎉",
        });
      }
    } catch (error) {}
  };
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
          color="#4CAF50"
          onPress={() => navigation.goBack()}
        />
        <Ionicons name="bag-outline" size={24} color="#4CAF50" />
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
          <Text style={styles.productOrigin}>{product.categoryId}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FBC02D" />
            <Ionicons name="star" size={16} color="#FBC02D" />
            <Ionicons name="star" size={16} color="#FBC02D" />
            <Ionicons name="star-half" size={16} color="#FBC02D" />
            <Ionicons name="star-outline" size={16} color="#FBC02D" />
          </View>
        </View>

        <Ionicons
          name={isWishListed ? "heart" : "heart-outline"}
          size={30}
          color="red"
          onPress={handleAdddToWishList}
        />
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
      <View style={{ paddingHorizontal: 20}}>
        <Text style={styles.sectionTitle}>About the product</Text>
        <Text style={styles.descriptionText}>
          Cabbage is a leafy green, red, or white biennial plant grown as an
          annual vegetable crop for its dense-leaved heads. It is descended...
        </Text>
      </View>

      {/* Button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#F1E2E2",
          padding: 10,
          marginTop: 54
        }}
      >
        <View>
          <Text style={{opacity: 0.5}}>Total Price</Text>
          <Text style={{fontSize: 20, fontWeight: "bold", color: "red"}}>${product.price * quantity}</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => handleAddToCart(product.id)}
        >
          <Ionicons name="bag-outline" size={22} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 20,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
  },

  productName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4CAF50",
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
    backgroundColor: "#4CAF50",
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    gap: 15,
  },

  qtyBtn: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  priceText: {
    fontSize: 28,
    fontWeight: "700",
    color: "red",
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "600",
    color: "#658C58",
    fontStyle: "italic",
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
    borderRadius: 5,
    gap: 10,
    marginTop: "auto",
    width: 180,
  },

  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProductDetail;
