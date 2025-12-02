import FinalProduct from "@/components/buoi12/FinalProduct";
import ProductsByCategory from "@/components/buoi14/ProductsByCategory";
import ProductDetail from "@/components/Last/ProductDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { HomeAdminStackParamList } from "./types";
import Filter from "@/components/Last/Filter";
import UserManagement from "@/components/Last/admin/UserManagement";
import CategoryManagement from "@/components/Last/admin/CategoryManagement";
import ProductManagement from "@/components/Last/admin/ProductManagement";
import Home from "@/components/Last/admin/Home";
import SignIn from "@/components/Last/SignIn";

const Stack = createNativeStackNavigator<HomeAdminStackParamList>();

const HomeAdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserManagement" component={UserManagement} />
      <Stack.Screen name="CategoryManagement" component={CategoryManagement} />
      <Stack.Screen name="ProductManagement" component={ProductManagement} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default HomeAdminStack;

const styles = StyleSheet.create({});
