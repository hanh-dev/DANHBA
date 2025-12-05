import {
  deleteUserServer,
  getAllUsers,
  updateUser,
  User,
} from "@/components/buoi12/database";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
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

const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Buyer", value: "Buyer" },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  const navigation: any = useNavigation();

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");

  const handleEdit = (user: any) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditRole(user.role);
  };

  const handleSaveUpdate = async () => {
    if (!editName.trim() || !editRole.trim()) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Name and Role cannot be empty.",
      });
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === editId ? { ...user, name: editName, role: editRole } : user
      )
    );

    await updateUser({ id: editId!, name: editName, role: editRole });

    Toast.show({
      type: "success",
      text1: "Updated",
      text2: "User updated successfully! 🎉",
    });

    setEditId(null);
    setEditName("");
    setEditRole("");
  };
  const deleteUser = (userId: number) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },

      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setUsers((prev) => prev.filter((user) => user.id !== userId));

          Toast.show({
            type: "success",
            text1: "Deleted",
            text2: "User removed successfully! 🎉",
          });
          await deleteUserServer(userId);
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromDB = await getAllUsers();
      if (usersFromDB && usersFromDB.length > 0) {
        setUsers(usersFromDB);
        return;
      }
    };
    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: (typeof initialUsers)[0] }) => (
    <View style={styles.itemContainer}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>👨🏻</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {item.name}
        </Text>
        <Text style={styles.roleText}>{item.role.charAt(0).toUpperCase() + item.role.slice(1)}</Text>
      </View>

      <TouchableOpacity onPress={() => handleEdit(item)}>
        <Ionicons name="create-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
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
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerText}>User Management</Text>
      </View>

      {/* UPDATE FORM */}
      {editId !== null && (
        <View style={styles.updateFormContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.updateTitle}>Update User</Text>
            <Ionicons
              name="close"
              size={24}
              color="red"
              onPress={() => setEditId(null)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={editName}
            onChangeText={setEditName}
          />

          <Dropdown
            style={styles.dropdown}
            data={roleOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Role"
            value={editRole}
            onChange={(item) => setEditRole(item.value)}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveUpdate}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LIST */}
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

  updateFormContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    marginHorizontal: 15
  },

  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  updateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4CAF50",
    textAlign: "center",
  },

  input: {
    // backgroundColor: "#F1F1F1",
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
  },

  dropdown: {
    height: 40,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginVertical: 6,
  },

  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
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
});
