import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TestEx = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>test-ex</Text>
    </View>
  );
};

export default TestEx;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
