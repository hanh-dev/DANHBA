import SignIn from "@/components/Last/SignIn";
import SignUp from "@/components/Last/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { createContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppAdminTabs from "./AppAdminTabs";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";
// --- Context để quản lý auth ---
interface AuthContextType {
  userToken: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  role: null,
  login: () => {},
  logout: () => {},
});

const AppTabsWrapper = () => (
  <StripeProvider publishableKey="pk_test_51Q56IALiAnjHSuM167o2rtbfUD6eJxGZ7mTfEmjGx9VLBLL0Dh3HSaGxq8DgHLyNtNHLPDz0hmW0hKbrbGwDuYIA00vb6Dj5tk">
    <View style={{ flex: 1, backgroundColor: "#E8F9FF" }}>
      <AppTabs />
    </View>
  </StripeProvider>
);

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const authContext: AuthContextType = {
    userToken,
    role,
    login: async (token: string, role: string) => {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("role", role);
      setUserToken(token);
      setRole(role);
    },
    logout: async () => {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("role");
      setUserToken(null);
      setRole(null);
    },
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const storedRole = await AsyncStorage.getItem("role");
        setUserToken(token);
        setRole(storedRole);
      } catch (error) {
        console.error("Error fetching token:", error);
      } finally {
        setIsLoading(false);
      }
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
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <>
            <Stack.Screen name="SignIn" component={AuthStack} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : role === "buyer" ? (
          <Stack.Screen name="Main" component={AppTabsWrapper} />
        ) : role === "admin" ? (
          <Stack.Screen name="Admin" component={AppAdminTabs} />
        ) : (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
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
