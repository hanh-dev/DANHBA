import EditProfile from "@/components/Last/EditProfile";
import Profile from "@/components/Last/Profile";
import SignIn from "@/components/Last/SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { ProfileStackParamList } from "./types";
import AppTabs from "./AppTabs";
import AppAdminTabs from "./AppAdminTabs";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SignIn" component={SignIn} />
      {/* <Stack.Screen name="Main" component={AppTabs} /> */}
      <Stack.Screen name="Admin" component={AppAdminTabs} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({});
