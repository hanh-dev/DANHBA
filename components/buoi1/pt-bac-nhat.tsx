import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";

const PTBN = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");

  const solveEquation = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
      Alert.alert("Lỗi", "Vui lòng nhập số hợp lệ cho a và b!");
      return;
    }

    if (numA === 0) {
      if (numB === 0) {
        setResult("Phương trình có vô số nghiệm.");
      } else {
        setResult("Phương trình vô nghiệm.");
      }
    } else {
      const x = -numB / numA;
      setResult(`Phương trình có nghiệm x = ${x}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giải phương trình bậc nhất: ax + b = 0</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập a"
        keyboardType="numeric"
        value={a}
        onChangeText={setA}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập b"
        keyboardType="numeric"
        value={b}
        onChangeText={setB}
      />

      <Button title="Giải phương trình" onPress={solveEquation} />

      {result !== "" && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

export default PTBN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: "blue",
  },
});
