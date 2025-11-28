import FinalProduct from "@/components/buoi12/FinalProduct";
import ProductsByCategory from "@/components/buoi14/ProductsByCategory";
import ProductDetail from "@/components/Last/ProductDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { HomeStackParamList } from "./types";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={FinalProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
