import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type User = {
  name: string;
  age: number;
  handleChange?: (key: "name" | "age", value: string | number) => void;
};

const Parent = () => {
  const [user, setUser] = useState<User>({
    name: "",
    age: 0,
  });

  const handleChange = (key: "name" | "age", value: string | number) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent</Text>
      <Text>Name: {user.name}</Text>
      <Text>Age: {user.age}</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        placeholder="Enter Age"
        style={styles.input}
        onChangeText={(text) => handleChange("age", Number(text))}
      />
      <ParentChild data={user} handleChange={handleChange} />
    </View>
  );
};

const ParentChild = (props: {
  data: User;
  handleChange: (key: "name" | "age", value: string | number) => void;
}) => {
  const { name, age } = props.data;
  return (
    <View>
      <Text style={styles.title}>Child</Text>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        onChangeText={(text) => props.handleChange("name", text)}
      />
      <TextInput
        placeholder="Enter Age"
        style={styles.input}
        onChangeText={(text) => props.handleChange("age", Number(text))}
      />
    </View>
  );
};

export default Parent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#db6161ff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
  },
});
