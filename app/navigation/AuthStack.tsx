import { AuthStackParamList, ProductByCategoryParamList } from "@/app/navigation/types";
import ProductByCategory from "@/components/Last/ProductByCategory";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import SignIn from "@/components/Last/SignIn";
import SignUp from "@/components/Last/SignUp";
import AppTabs from "./AppTabs";
import AppAdminTabs from "./AppAdminTabs";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Main" component={AppTabs} />
      <Stack.Screen name="Admin" component={AppAdminTabs} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
