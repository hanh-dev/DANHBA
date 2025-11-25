import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const AlertNameState = () => {
  const [data, setData] = useState({
    name: "Hanh",
    age: 20,
  });

  const handleChange = (field: "name" | "age", value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: field === "age" ? parseInt(value, 10) || 0 : value,
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={data.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={data.age.toString()}
        onChangeText={(text) => handleChange("age", text)}
      />
    </View>
  );
};

export default AlertNameState;

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
