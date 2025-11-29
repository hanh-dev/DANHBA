import SignIn from "@/components/Last/SignIn";
import SignUp from "@/components/Last/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
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
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token: string | null;
      try {
        token = await AsyncStorage.getItem("userToken");
      } catch (error) {
        console.error("Error fetching token:", error);
        token = null;
      }
      setUserToken(token);
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
      {userToken ? (
        <Stack.Screen name="Main" component={AppTabsWrapper} />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
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
