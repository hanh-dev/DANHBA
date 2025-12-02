import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getUserById, User } from "../buoi12/database";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const navigation: any = useNavigation();
  const [userInfo, setUserInfo] = React.useState<User>({
    id: 0,
    name: "",
    email: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;
      const info = await getUserById(Number(userId));
      if (info) {
        setUserInfo(info);
      }
    };
    fetchUserInfo();
  }, []);

  const menuItems = [
    {
      icon: "person-outline",
      label: "Edit Profile",
      onPress: () => navigation.navigate("EditProfile", { userInfo }),
    },
    { icon: "shield-outline", label: "Security Settings" },
    { icon: "location-outline", label: "Messaging Addresses" },
    { icon: "key-outline", label: "Change Password" },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("role");

    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require("../../assets/grocery/hanh.jpg")}
            style={styles.profileImage}
          />
        </View>
        {/* Info Section */}
        <View style={styles.infoContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon as any} size={20} color="#1A9B89" />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
        {/* Logout Button */}
        {!edit && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4CAF50",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  profileSection: {
    alignItems: "center",
    marginTop: -30,
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 16,
    backgroundColor: "#E0E0E0",
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A5319",
    marginBottom: 4,
  },
  infoContainer: {
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F9FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#1A9B89",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
