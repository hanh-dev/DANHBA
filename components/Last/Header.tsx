import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Ionicons name="location-outline" size={20} color="#658C58" />
        <Text style={styles.textAddress}>Ho Van Hanh, Ho Chi Minh</Text>
      </View>
      <View style={styles.rightHeader}>
        <Ionicons name="cart-outline" size={20} color="#658C58" />
        <Ionicons name="notifications-outline" size={19} color="#658C58" />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftHeader: {
    flexDirection: "row",
    gap: 4,
  },
  textAddress: {
    color: "#658C58",
  },
  rightHeader: {
    flexDirection: "row",
    gap: 4,
  },
});
