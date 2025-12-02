import { HomeStackParamList } from "@/app/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type NavigationProps = NativeStackNavigationProp<HomeStackParamList, "Filter">;
const Filter = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#4CAF50"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>Filter</Text>
      {/* Button */}
      <TouchableOpacity style={styles.addToCartBtn}>
        <Text style={styles.addToCartText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    backgroundColor: "#ffffff",
  },
  addToCartBtn: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 30,
    gap: 10,
    marginTop: "auto",
  },

  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
