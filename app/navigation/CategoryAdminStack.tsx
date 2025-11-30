import { ProductByCategoryParamList } from "@/app/navigation/types";
import ProductByCategory from "@/components/Last/ProductByCategory";

import ProductDetail from "@/components/Last/ProductDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import CategoryManagement from "@/components/Last/admin/CategoryManagement";

const Stack = createNativeStackNavigator<ProductByCategoryParamList>();

const CategoryAdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Category" component={CategoryManagement} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="ProductByCategory" component={ProductByCategory} />
    </Stack.Navigator>
  );
};

export default CategoryAdminStack;

const styles = StyleSheet.create({});
