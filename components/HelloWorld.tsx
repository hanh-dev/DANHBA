import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

function HelloWorld({ name, age }: { name: string; age: number }) {
  const handlePress = () => {
    Alert.alert("Button Pressed", `Hello, ${name}! You are ${age} years old.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 20,
  },
});

export default HelloWorld;
