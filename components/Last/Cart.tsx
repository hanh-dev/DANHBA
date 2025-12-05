import { HomeStackParamList } from "@/app/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation as useNavigationNative } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CartItem,
  Category,
  getAllCategories,
  getCartByUserId,
  getUserId,
} from "../buoi12/database";
import { PRODUCT_IMAGES } from "./ProductCard";
type CartNavigationProp = NativeStackNavigationProp<HomeStackParamList, "Cart">;
const Cart = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useNavigationNative<CartNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  let [totalQuantity, setTotalQuantity] = useState<number>(0);

  const fetchData = async () => {
    try {
      const rawCategories: Category[] = await getAllCategories();
      console.log("Check category: ", rawCategories);
      setCategories(rawCategories);
      // const rawProducts: Product[] = await getAllProducts();
      // setProducts(rawProducts);
    } catch (error) {
      console.error("Error fetching product list: ", error);
    }
  };
  const handleDeleteItemFromCart = (productId: number) => {
    console.log("Check delete product: ", productId);

    // reset cartItems array
    const newList = cartItems.filter((item) => item.productId !== productId);
    console.log("Check cart after deleting: ", newList);
    // set new value
    setCartItems(newList);
  };
  const fetchCartItems = async () => {
    const userId = await getUserId();
    if (userId) {
      const result = await getCartByUserId(userId);
      console.log("Check cart: ", cartItems);
      setCartItems(result);
    }
  };

  const handlePlusQuantity = (productId: number, currentQuantity: number) => {
    console.log("Check data: ", productId);
    const newList = cartItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: currentQuantity + 1,
        };
      }
      return item;
    });
    setCartItems(newList);
  };
  const handleMinusQuantity = (productId: number, currentQuantity: number) => {
    if (currentQuantity === 1) {
      return;
    }
    console.log("Check data: ", productId);
    const newList = cartItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: currentQuantity - 1,
        };
      }
      return item;
    });
    setCartItems(newList);
  };

  useEffect(() => {
    const calculateQuantity = () => {
      cartItems.map((item) => {
        totalQuantity += item.productPrice * item.quantity;
      });
    };
    fetchData();
    fetchCartItems();
    calculateQuantity();
    bottomSheetModalRef.current?.present();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.wrappHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerText}>User Cart</Text>
      </View>
      {cartItems.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <View style={styles.avatarPlaceholder}>
            <Image
              source={
                item.productImage.startsWith("file://")
                  ? { uri: item.productImage }
                  : PRODUCT_IMAGES[item.productImage]
              }
              style={styles.productImage}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{item.productName}</Text>
            <Text style={styles.categoryText}>
              {categories.find((c) => c.id === item.categoryId)?.name}
            </Text>
          </View>

          <View style={styles.wrappLeft}>
            <TouchableOpacity
              style={[styles.wrappButton, { backgroundColor: "#F3E8FF" }]}
              onPress={() => handleMinusQuantity(item.productId, item.quantity)}
            >
              <Text style={{ color: "black", fontSize: 20, top: -2 }}>-</Text>
            </TouchableOpacity>
            <Text>{item.quantity}</Text>
            <TouchableOpacity
              style={[styles.wrappButton, { backgroundColor: "#4CAF50" }]}
              onPress={() => handlePlusQuantity(item.productId, item.quantity)}
            >
              <Text style={{ color: "white" }}>+</Text>
            </TouchableOpacity>
          </View>
          {/* Delete Icon */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: 4,
              marginBottom: 4,
            }}
            onPress={() => handleDeleteItemFromCart(item.productId)}
          >
            <Ionicons name="close-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 12,
          width: "100%",
          marginHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 60,
          padding: 8,
          borderRadius: 10,
          backgroundColor: "#4CAF50",
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          $23
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Checkout</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff"></Ionicons>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    paddingTop: 40,
    paddingHorizontal: 15,
    position: "relative",
  },
  wrappHeader: {
    flexDirection: "row",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    // marginBottom: 15,
    marginLeft: 140,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    position: "relative",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  productImage: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#658C58",
  },
  rowBack: {
    alignItems: "flex-end",
    backgroundColor: "#FF3B30",
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    paddingRight: 12,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  wrappLeft: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginRight: 14,
  },
  wrappButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 26,
    height: 26,
    borderRadius: 50,
  },
});
