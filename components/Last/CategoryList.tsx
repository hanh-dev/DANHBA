import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface CategoryUI {
  id: number;
  name: string;
  icon: any;
  backgroundColor: string;
}

interface CategoryListProps {
  categories: CategoryUI[];
}

const CategoryItem: React.FC<{ item: CategoryUI }> = ({ item }) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() => console.log("Go to:", item.name)}
  >
    <View
      style={[styles.iconWrapper, { backgroundColor: item.backgroundColor }]}
    >
      {item.icon ? (
        <Image source={item.icon} style={styles.icon} />
      ) : (
        <Text>Icon</Text>
      )}
    </View>
    <Text style={styles.itemName} numberOfLines={1}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.listContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#658C58" />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CategoryItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#658C58",
  },
  itemContainer: {
    alignItems: "center",
    width: 80,
    marginRight: 15,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#658C58",
    shadowOffset: { width: 50, height: 80 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  itemName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    color: "#658C58",
  },
});
