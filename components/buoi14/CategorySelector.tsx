import { HomeStackParamList } from "@/app/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Category, getAllCategories } from "../buoi12/database";

type NavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  "ProductsByCategory"
>;

type Props = {
  id?: number;
};

const CategorySelector = (props: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getAllCategories();
      setCategories(data || []);
    };
    fetchCategory();
    console.log("Test id: ", props.id);
    setActiveId(props.id ? props.id : 1);
  }, []);

  const handleSelectId = (id: number) => {
    setActiveId(id);
    navigation.navigate("ProductsByCategory", { categoryId: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 5 }}
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    category.id === activeId
                      ? "#FF8040"
                      : index % 2 === 0
                      ? "#001BB7"
                      : "#0046FF",
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                },
              ]}
              onPress={() => handleSelectId(category.id)}
            >
              <Text style={styles.chipText}>{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: 120,
    backgroundColor: "#F5F1DC",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#001BB7",
    marginBottom: 12,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
