import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-toast-message";

const initialUsers = [
  { id: 1, name: "Jasmin G. Rangel", role: "UX/UI Designer", avatar: "👩🏻" },
  { id: 2, name: "Jonathan G. Dye", role: "App Developer", avatar: "👨🏻" },
  { id: 3, name: "Ryan M. Reinhardt", role: "UI Designer", avatar: "👩🏻‍🦱" },
  { id: 4, name: "Madge T. Cream", role: "Project Manager", avatar: "👩🏻" },
  { id: 5, name: "Chris C. Newberry", role: "UX/UI Designer", avatar: "👨🏻‍🦱" },
  { id: 6, name: "Charles L. Werner", role: "Junior Developer", avatar: "👩🏻‍🎤" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const navigation: any = useNavigation();

  const deleteUser = (userId: number) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },

      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setUsers((prev) => prev.filter((user) => user.id !== userId));

          Toast.show({
            type: "success",
            text1: "Deleted",
            text2: "User removed successfully! 🎉",
          });
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: (typeof initialUsers)[0] }) => (
    <View style={styles.itemContainer}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.avatar}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.roleText}>{item.role}</Text>
      </View>
      <View>
        <Ionicons name="create-outline" size={24} color="#4CAF50" />
      </View>
    </View>
  );

  const renderHiddenItem = ({ item }: { item: (typeof initialUsers)[0] }) => (
    <View style={styles.rowBack}>
      <Ionicons
        name="trash"
        size={24}
        color="white"
        onPress={() => deleteUser(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerText}>User Management</Text>
      </View>
      <SwipeListView
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
        disableRightSwipe
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default UserManagement;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    paddingTop: 10,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  roleText: {
    fontSize: 12,
    color: "#888",
  },
  rowBack: {
    alignItems: "flex-end",
    backgroundColor: "#FF3B30",
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    paddingRight: 12,
    marginBottom: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
