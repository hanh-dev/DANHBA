import {
  Category,
  Product,
  addProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  updateProduct,
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
import { Dropdown } from "react-native-element-dropdown";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-toast-message";
import { PRODUCT_IMAGES } from "../ProductCard";

const renderItem = ({
  item,
  categories,
  onEdit,
}: {
  item: Product;
  categories: Category[];
  onEdit: (id: number) => void;
}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.avatarPlaceholder}>
        <Image
          source={
            item.img.startsWith("file://")
              ? { uri: item.img }
              : PRODUCT_IMAGES[item.img]
          }
          style={styles.productImage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.categoryText}>
          {categories.find((c) => c.id === item.categoryId)?.name}
        </Text>
      </View>

      <TouchableOpacity onPress={() => onEdit(item.id)}>
        <Ionicons name="create-outline" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const ProductManagement = () => {
  const navigation: any = useNavigation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const localImage: { [key: string]: any } = PRODUCT_IMAGES;

  const fetchData = async () => {
    try {
      const rawCategories = await getAllCategories();
      const rawProducts = await getAllProducts();
      setCategories(rawCategories);
      setProducts(rawProducts);
    } catch (error) {
      console.error("Error fetching product list: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (product?: Product) => {
    if (product) {
      setEditId(product.id);
      setName(product.name);
      setPrice(product.price.toString());
      setCategoryId(product.categoryId);
      setImageUri(product.img);
    } else {
      setEditId(null);
      setName("");
      setPrice("");
      setCategoryId(categories[0]?.id || 1);
      setImageUri(null);
    }
    setModalVisible(true);
  };

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !imageUri) {
      Alert.alert("⚠️ Please fill all fields!");
      return;
    }

    const product: Product = {
      id: editId ?? products.length + 1,
      name,
      price: Number(price),
      categoryId,
      img: imageUri,
    };

    try {
      if (editId) {
        await updateProduct(product);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Product updated successfully! 🎉",
        });
      } else {
        await addProduct(product);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Product added successfully! 🎉",
        });
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {
      console.error(error);
      Alert.alert("Error saving product!");
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Are you sure?", "Do you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteProduct(id);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Product deleted successfully! 🎉",
          });
          fetchData();
        },
      },
    ]);
  };

  const renderHiddenItem = ({ item }: { item: Product }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Management</Text>
        <TouchableOpacity onPress={() => openForm()}>
          <Ionicons name="add-circle-outline" size={26} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* PRODUCT LIST */}
      <SwipeListView
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data) =>
          renderItem({
            item: data.item,
            categories,
            onEdit: (id: number) => openForm(products.find((p) => p.id === id)),
          })
        }
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
        disableRightSwipe
        contentContainerStyle={styles.listContainer}
      />

      {/* MODAL FORM */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.modalTitle}>
                {editId ? "Update Product" : "Add Product"}
              </Text>
              <Ionicons
                name="close"
                size={24}
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <TextInput
              placeholder="Product Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={styles.input}
            />
            <Dropdown
              style={styles.dropdown}
              data={categories}
              labelField={"name"}
              valueField="id"
              placeholder="Choose product category"
              value={categoryId}
              onChange={(item) => {
                setCategoryId(item.id);
              }}
            />

            <TouchableOpacity
              style={styles.imageButton}
              onPress={handleSelectImage}
            >
              <Text style={styles.imageButtonText}>Choose Image</Text>
            </TouchableOpacity>

            {imageUri && (
              <Image
                source={
                  imageUri.startsWith("file://")
                    ? { uri: imageUri }
                    : localImage[imageUri]
                }
                style={styles.previewImage}
              />
            )}

            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
              <Text style={styles.addButtonText}>
                {editId ? "Update Product" : "Add Product"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ProductManagement;

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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
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
  productImage: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
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
  categoryText: {
    fontSize: 12,
    color: "#658C58",
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
  listContainer: {
    paddingHorizontal: 20,
  },

  /* MODAL */
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
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  categoryButton: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#4CAF50",
  },
  categoryTextActive: {
    color: "#fff",
  },
  dropdown: {
    height: 45,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginVertical: 6,
  },
  imageButton: {
    backgroundColor: "#8CE4FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  imageButtonText: {
    color: "black",
    fontWeight: "600",
  },
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
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#FF5656",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
