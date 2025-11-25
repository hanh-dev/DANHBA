import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import RootNavigator from "../navigation/RootNavigator";

export default function HomeScreen() {
  return (
    <>
      <RootNavigator />
      <Toast />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
