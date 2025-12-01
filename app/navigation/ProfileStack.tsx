import BMI from "@/components/buoi5/BMI";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { ProfileStackParamList } from "./types";
import Profile from "@/components/Last/Profile";
import EditProfile from "@/components/Last/EditProfile";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      {/* <Stack.Screen name="ProductDetail" component={ProductDetail} /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
