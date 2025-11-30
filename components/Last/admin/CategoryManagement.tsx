import {
  Category,
  Product,
  addCategory,
  addProduct,
  getAllCategories,
  getAllProducts,
  updateCategory,
} from "@/components/buoi12/database";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-toast-message";
import { PRODUCT_IMAGES } from "../ProductCategory";

const CategoryManagement = () => {
  const navigation: any = useNavigation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImageUri, setCategoryImageUri] = useState<string | null>(null);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImageUri, setProductImageUri] = useState<string | null>(null);

  const localImage: { [key: string]: any } = PRODUCT_IMAGES;

  const fetchData = async () => {
    try {
      const rawCategories = await getAllCategories();
      setCategories(rawCategories);
      const products = await getAllProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCategoryForm = (category?: Category) => {
    if (category) {
      setEditCategoryId(category.id);
      setCategoryName(category.name);
      setCategoryImageUri(category.img);
    } else {
      setEditCategoryId(null);
      setCategoryName("");
      setCategoryImageUri(null);
    }
    setCategoryModalVisible(true);
  };

  const handleCategorySelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setCategoryImageUri(result.assets[0].uri);
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryName || !categoryImageUri) {
      Alert.alert("⚠️ Please fill all fields!");
      return;
    }

    const category: Category = {
      id: editCategoryId ?? categories.length + 1,
      name: categoryName,
      img: categoryImageUri,
    };

    try {
      if (editCategoryId) {
        await updateCategory(category);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Category updated successfully! 🎉",
        });
      } else {
        await addCategory(category);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Category added successfully! 🎉",
        });
      }
      setCategoryModalVisible(false);
      fetchData();
    } catch (error) {
      console.error(error);
      Alert.alert("Error saving category!");
    }
  };

  const handleAddProduct = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setProductName("");
    setProductPrice("");
    setProductImageUri(null);
    setProductModalVisible(true);
  };

  const handleProductSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setProductImageUri(result.assets[0].uri);
    }
  };

  const handleSaveProduct = async () => {
    if (
      !productName ||
      !productPrice ||
      !productImageUri ||
      !selectedCategoryId
    ) {
      Alert.alert("⚠️ Please fill all fields!");
      return;
    }

    const product: Product = {
      id: products.length + 1,
      name: productName,
      price: Number(productPrice),
      categoryId: selectedCategoryId,
      img: productImageUri,
    };

    try {
      await addProduct(product);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product added successfully! 🎉",
      });
      setProductModalVisible(false);
      fetchData();
    } catch (error) {
      console.error(error);
      Alert.alert("Error saving product!");
    }
  };

  const renderItem = (item: Category) => (
    <View style={styles.itemContainer}>
      <View style={styles.avatarPlaceholder}>
        <Image
          source={
            item.img.startsWith("file://")
              ? { uri: item.img }
              : localImage[item.img]
          }
          style={styles.productImage}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductByCategory", {id: item.id})}>
          <Text style={styles.nameText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => handleAddProduct(item.id)}>
          <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openCategoryForm(item)}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Category Management</Text>
        <TouchableOpacity onPress={() => openCategoryForm()}>
          <Ionicons name="add-circle-outline" size={26} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* CATEGORY LIST */}
      <SwipeListView
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data) => renderItem(data.item)}
        rightOpenValue={-60}
        disableRightSwipe
        contentContainerStyle={styles.listContainer}
      />

      {/* MODAL CATEGORY */}
      <Modal visible={categoryModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.modalTitle}>
                {editCategoryId ? "Update Category" : "Add Category"}
              </Text>
              <Ionicons
                name="close"
                size={24}
                color="red"
                onPress={() => setCategoryModalVisible(false)}
              />
            </View>

            <TextInput
              placeholder="Category Name"
              value={categoryName}
              onChangeText={setCategoryName}
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.imageButton}
              onPress={handleCategorySelectImage}
            >
              <Text style={styles.imageButtonText}>Choose Image</Text>
            </TouchableOpacity>

            {categoryImageUri && (
              <Image
                source={
                  categoryImageUri.startsWith("file://")
                    ? { uri: categoryImageUri }
                    : localImage[categoryImageUri]
                }
                style={styles.previewImage}
              />
            )}

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSaveCategory}
            >
              <Text style={styles.addButtonText}>
                {editCategoryId ? "Update Category" : "Add Category"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* MODAL PRODUCT */}
      <Modal visible={productModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.modalTitle}>Add Product</Text>
              <Ionicons
                name="close"
                size={24}
                color="red"
                onPress={() => setProductModalVisible(false)}
              />
            </View>

            <TextInput
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              value={productPrice}
              onChangeText={setProductPrice}
              keyboardType="numeric"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.imageButton}
              onPress={handleProductSelectImage}
            >
              <Text style={styles.imageButtonText}>Choose Image</Text>
            </TouchableOpacity>

            {productImageUri && (
              <Image
                source={{ uri: productImageUri }}
                style={styles.previewImage}
              />
            )}

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSaveProduct}
            >
              <Text style={styles.addButtonText}>Add Product</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryManagement;

// ----- STYLES -----
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
    justifyContent: "space-between",
  },
  headerText: { fontSize: 18, fontWeight: "bold", color: "#4CAF50" },
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
  productImage: { width: "80%", height: "80%", borderRadius: 50 },
  textContainer: { flex: 1 },
  nameText: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 2 },
  rowBack: {
    alignItems: "flex-end",
    backgroundColor: "#FF3B30",
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    paddingRight: 12,
    marginBottom: 10,
  },
  listContainer: { paddingHorizontal: 20 },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(194, 185, 185, 0.5)",
    justifyContent: "flex-start",
    paddingTop: 20,
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 12,
    padding: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  imageButton: {
    backgroundColor: "#8CE4FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  imageButtonText: { color: "black", fontWeight: "600" },
  previewImage: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
});
