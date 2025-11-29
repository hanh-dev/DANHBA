import { ProductByCategoryParamList } from "@/app/navigation/types";
import ProductByCategory from "@/components/Last/ProductByCategory";

import ProductDetail from "@/components/Last/ProductDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import ProductCategory from "../../components/Last/ProductCategory";

const Stack = createNativeStackNavigator<ProductByCategoryParamList>();

const CategoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Category" component={ProductCategory} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductByCategory" component={ProductByCategory} />
    </Stack.Navigator>
  );
};

export default CategoryStack;

const styles = StyleSheet.create({});
