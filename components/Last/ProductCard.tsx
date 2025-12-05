import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { AddCart, addToCart, getUserId, Product } from "../buoi12/database";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const PRODUCT_IMAGES: { [key: string]: any } = {
  broccoli: require("../../assets/grocery/eggplant.png"),
  capsicum: require("../../assets/grocery/capsicum.png"),
  tomato: require("../../assets/grocery/tamato.png"),
  pumkin: require("../../assets/grocery/pumkin.png"),
  lemon: require("../../assets/grocery/peach.png"),
  banana: require("../../assets/grocery/aocado.png"),
  orange: require("../../assets/grocery/orange.png"),
  blueberry: require("../../assets/grocery/pomegranate.png"),
  blackpepper: require("../../assets/grocery/banana1.png"),
  chilipowder: require("../../assets/grocery/tomatto.png"),
  turmeric: require("../../assets/grocery/potato.png"),
  cinnamon: require("../../assets/grocery/pineapple.png"),
  egg: require("../../assets/grocery/egg.png"),
  rice: require("../../assets/grocery/cabbage.png"),
  chicken: require("../../assets/grocery/chicken.png"),
  flour: require("../../assets/grocery/mango.png"),
  friedchicken: require("../../assets/grocery/grapes.png"),
  springroll: require("../../assets/grocery/sideDishes.png"),
  salad: require("../../assets/grocery/vegetable.png"),
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const handleAddToCart = async (productId: number) => {
    const userId = await getUserId();
    const newItem: AddCart = {
      user_id: userId || 4,
      product_id: productId,
      quantity: 1,
    };

    const result = await addToCart(newItem);

    if (result) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Added to Cart successfully! 🎉",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "error",
        text2: "Failed add to Cart!",
      });
    }

    console.log("Check adding product: ", productId);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <TouchableOpacity style={styles.favIcon}>
        <Ionicons name="heart-outline" size={20} color="gray" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <View style={styles.imageBackground} />
        <Image
          source={
            product.img.startsWith("file://")
              ? { uri: product.img }
              : PRODUCT_IMAGES[product.img]
          }
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>

      <Text style={styles.nameText}>{product.name}</Text>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => handleAddToCart(product.id)}
      >
        <Ionicons name="bag-outline" size={22} color="#fff" />
        <Text style={styles.cartButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  imageBackground: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFEBEE",
    opacity: 0.5,
  },
  productImage: {
    width: 110,
    height: 110,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "red",
    marginVertical: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1A5319",
    marginBottom: 5,
  },
  unitText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 15,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: "100%",
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 14,
  },
});
