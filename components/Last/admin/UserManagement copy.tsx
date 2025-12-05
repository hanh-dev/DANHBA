import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-swipeable";

const initialUsers = [
  { id: 1, name: "Jasmin G. Rangel", role: "UX/UI Designer", avatar: "👩🏻" },
  { id: 2, name: "Jonathan G. Dye", role: "App Developer", avatar: "👨🏻" },
  { id: 3, name: "Ryan M. Reinhardt", role: "UI Designer", avatar: "👩🏻‍🦱" },
  {
    id: 4,
    name: "Madge T. Cream",
    role: "Project Manager",
    avatar: "👩🏻",
    selected: true,
  },
  { id: 5, name: "Chris C. Newberry", role: "UX/UI Designer", avatar: "👨🏻‍🦱" },
  { id: 6, name: "Charles L. Werner", role: "Junior Developer", avatar: "👩🏻‍🎤" },
];

const UserItem = ({
  name,
  role,
  avatar,
  selected,
}: {
  name: string;
  role: string;
  avatar: string;
  selected?: boolean;
}) => (
  <View style={styles.itemContainer}>
    <View style={styles.avatarPlaceholder}>
      <Text style={styles.avatarText}>{avatar}</Text>
    </View>

    <View style={styles.textContainer}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.roleText}>{role}</Text>
    </View>

    {selected && (
      <Feather
        name="check"
        size={18}
        color="#8B5CF6"
        style={styles.checkIcon}
      />
    )}
  </View>
);
const rightButtons = (onDelete: () => void) => [
  // eslint-disable-next-line react/jsx-key
  <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete()}>
    <Feather name="trash-2" size={24} color="white" />
  </TouchableOpacity>,
];

const SwipeableUserItem = ({
  user,
  children,
  onDeleteUser,
}: {
  user: (typeof initialUsers)[0];
  children: React.ReactNode;
  onDeleteUser: (id: number) => void;
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa người dùng",
      `Bạn có chắc chắn muốn xóa ${user.name} không?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => onDeleteUser(user.id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <Swipeable
      rightButtons={rightButtons(handleDelete)}
      rightButtonWidth={80}
      onRightActionActivate={() => {}}
      rightButtonContainerStyle={styles.swipeContainer}
      containerStyle={{ marginBottom: 10 }}
    >
      {children}
    </Swipeable>
  );
};
const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleDeleteUser = (idToDelete: number) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== idToDelete)
    );
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {users.length > 0 ? (
          users.map((user) => (
            <SwipeableUserItem
              key={user.id}
              user={user}
              onDeleteUser={handleDeleteUser}
            >
              <UserItem
                name={user.name}
                role={user.role}
                avatar={user.avatar}
                selected={user.selected}
              />
            </SwipeableUserItem>
          ))
        ) : (
          <Text style={styles.emptyText}>
            Không còn người dùng nào trong danh sách.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default UserManagement;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    paddingTop: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
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
  checkIcon: {
    marginLeft: "auto",
  },

  swipeContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    flex: 1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
});
