import SignIn from "@/components/Last/SignIn";
import SignUp from "@/components/Last/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppAdminTabs from "./AppAdminTabs";
import AppTabs from "./AppTabs";

const AppTabsWrapper = () => (
  <View style={{ flex: 1, backgroundColor: "#E8F9FF" }}>
    <AppTabs />
  </View>
);

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token: string | null = null;
      let role: string | null = null;
      try {
        token = await AsyncStorage.getItem("userToken");
        role = await AsyncStorage.getItem("role");
        console.log("Bootstrap role:", role);
      } catch (error) {
        console.error("Error fetching token:", error);
        token = null;
        role = null;
      }
      setUserToken(token);
      setRole(role);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userToken ? (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : role === "buyer" ? (
        <Stack.Screen name="Main" component={AppTabsWrapper} />
      ) : (
        <Stack.Screen name="Admin" component={AppAdminTabs} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
