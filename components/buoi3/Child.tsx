import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Child = ({ data, setData }) => {
  return (
    <View>
      <Text>Child</Text>
      <Text>Name: {data.name}</Text>
      <Text>Age: {data.age}</Text>
      <TextInput
        placeholder="Enter Name"
        onChangeText={(text) => setData({ ...data, name: text })}
      />
      <TextInput
        placeholder="Enter Age"
        keyboardType="numeric"
        onChangeText={(text) => setData({ ...data, age: parseInt(text) })}
      />
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({});
