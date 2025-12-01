import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { CardForm, useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, View } from "react-native";
import Toast from "react-native-toast-message";
import { addOrder, Order, Product } from "../buoi12/database";

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
      console.error("Lỗi khi lấy User ID từ AsyncStorage:", error);
      return null;
    }
  };

  const handlePayment = async () => {
    console.log("Processing payment...");
    setLoading(true);

    const res = await fetch("http://192.168.1.10:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000 }),
    });

    const data = await res.json();
    console.log("Payment intent created:", data);
    const clientSecret = data.clientSecret;

    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
    });

    if (error) {
      console.log("Payment failed:", error.message);
    } else if (paymentIntent) {
      console.log("Payment successful 🎉");
      Toast.show({
        type: "success",
        text1: "Payment Successful",
        text2: "Your payment was processed successfully 🎉.",
      });
      try {
        console.log("Creating order for product:", product);
        const productOrder: Order = {
          user_id: (await getUserId()) || 4,
          product_id: product.id,
          order_date: new Date().toISOString(),
          total_amount: product.price,
          status: "Pending",
        };
        const addOrderResult = await addOrder(productOrder);
        navigation.navigate("Home");
      } catch (error) {}
      //   navigation.navigate("Home");
    }

    setLoading(false);
  };

  return (
    <View style={{ padding: 20, marginTop: 50, flex: 1, gap: 40 }}>
      <CardForm
        style={{
          width: "100%",
          height: 250,
        }}
        cardStyle={{
          backgroundColor: "#ffffff",
          textColor: "#000000",
        }}
      />
      <Button title="Thanh toán" onPress={handlePayment} disabled={loading} />
    </View>
  );
}
