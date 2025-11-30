import { CardForm, useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Button, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Checkout() {
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

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
      navigation.navigate("Home");
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
