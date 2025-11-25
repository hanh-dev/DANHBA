import BMI from "@/components/buoi5/BMI";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { ProfileStackParamList } from "./types";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BMI" component={BMI} />
      {/* <Stack.Screen name="ProductDetail" component={ProductDetail} /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
