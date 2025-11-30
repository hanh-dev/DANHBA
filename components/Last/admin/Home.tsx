import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AdminHome = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const navigation: any = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await AsyncStorage.getItem("userName");
      setUserName(name);
    };
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("role");

    navigation.navigate("SignIn");
  };

  return (
    <View>
      {/* Header */}
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <View style={styles.imageWrapper}>
              <Image
                source={require("../../../assets/grocery/hanh.jpg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.textAddress}>Hi! {userName}, Ho Chi Minh</Text>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={25} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Admin Home Screen */}
      <View style={styles.adminContainer}>
        {/* Users */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("UserManagement")}
        >
          <MaterialCommunityIcons
            name="account-group-outline"
            size={30}
            color="#FF6B6B"
          />
          <Text style={styles.cardTitle}>Users</Text>
          <Text style={[styles.cardSub, { color: "#FF6B6B" }]}>12</Text>
        </TouchableOpacity>

        {/* Categories */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("CategoryManagement")}
        >
          <MaterialCommunityIcons
            name="shape-outline"
            size={30}
            color="#4D96FF"
          />
          <Text style={styles.cardTitle}>Categories</Text>
          <Text style={[styles.cardSub, { color: "#4D96FF" }]}>14</Text>
        </TouchableOpacity>

        {/* Products */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ProductManagement")}
        >
          <MaterialCommunityIcons
            name="cube-outline"
            size={30}
            color="#6BCB77"
          />
          <Text style={styles.cardTitle}>Products</Text>
          <Text style={[styles.cardSub, { color: "#6BCB77" }]}>16</Text>
        </TouchableOpacity>

        {/* Orders */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("OrderManagement")}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={30}
            color="#FFD93D"
          />
          <Text style={styles.cardTitle}>Orders</Text>
          <Text style={[styles.cardSub, { color: "#FFD93D" }]}>20</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    paddingTop: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  leftHeader: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  imageWrapper: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  image: { width: 32, height: 32, borderRadius: 50 },

  textAddress: { color: "#ffffff", fontSize: 14 },

  rightHeader: { flexDirection: "row", gap: 4 },

  adminContainer: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    paddingVertical: 22,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,

    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 8,
  },

  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  cardSub: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "600",
  },
});
