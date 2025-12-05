import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { CardForm, useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { addOrder, NewOrder, Product } from "../buoi12/database";

export default function Checkout() {
  const route = useRoute();
  const { product } = route.params as { product: Product };
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  const getUserId = async (): Promise<number | null> => {
    try {
      const userIdJson = await AsyncStorage.getItem("userId");
      if (userIdJson !== null) {
        const userId = JSON.parse(userIdJson);
        return typeof userId === "number" ? userId : null;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving User ID from AsyncStorage:", error);
      return null;
    }
  };

  const handlePayment = async () => {
    console.log("Processing payment...");
    setLoading(true);
    const amountInCents = Math.round(product.price * 100);

    const res = await fetch("http://192.168.1.10:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInCents }),
    });

    const data = await res.json();
    console.log("Check data: ", data);

    if (data.error) {
      console.error("Payment Intent creation failed:", data.error.message);
      Toast.show({
        type: "error",
        text1: "Server Error",
        text2: data.error.message,
      });
      setLoading(false);
      return;
    }

    console.log("Payment intent created:", data);
    const clientSecret = data.clientSecret;

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
    });

    if (error) {
      console.log("Payment failed:", error.message);
      Toast.show({
        type: "error",
        text1: "Payment Failed",
        text2: error.message,
      });
    } else if (paymentIntent) {
      console.log("Payment successful 🎉");
      Toast.show({
        type: "success",
        text1: "Payment Successful",
        text2: "Your order is being processed.",
      });
      try {
        console.log("Creating order for product:", product);
        const orderItems = [
          {
            product_id: product.id,
            quantity: 1,
            price: product.price,
          },
        ];

        const newOrderData: NewOrder = {
          user_id: (await getUserId()) || 4,
          items: orderItems,
          status: "PENDING",
        };

        const addOrderResult = await addOrder(newOrderData);

        if (addOrderResult.status) {
          console.log("Order saved successfully:", addOrderResult.orderId);
        } else {
          Toast.show({
            type: "error",
            text1: "Database Error",
            text2: "Could not save the order.",
          });
        }

        navigation.navigate("Home");
      } catch (error) {
        console.error("Error saving order to DB:", error);
        Toast.show({
          type: "error",
          text1: "System Error",
          text2: "Could not complete the order.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Checkout</Text>
      <View style={styles.summaryBox}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          Total: ${product.price.toFixed(2)}
        </Text>
      </View>
      <CardForm
        style={styles.cardForm}
        cardStyle={{
          backgroundColor: "#ffffff",
          textColor: "#000000",
        }}
      />
      <Button
        title={loading ? "Processing..." : `Pay $${product.price.toFixed(2)}`}
        onPress={handlePayment}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    flex: 1,
    gap: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  summaryBox: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  cardForm: {
    width: "100%",
    height: 250,
  },
});
