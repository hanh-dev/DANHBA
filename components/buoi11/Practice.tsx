import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addProduct,
  getAllProducts,
  Product,
  updateProduct,
} from "./database/database";

const Practice = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const localImage: { [key: string]: any } = {
    cancau1: require("../../assets/images/products/cancau1.png"),
  };

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!name || !price || !img || !categoryId) {
      Alert.alert("Please fill in all fields");
      return;
    }

    const newProduct: Product = {
      id: products.length + 1,
      name,
      price: Number(price),
      img,
      categoryId: Number(categoryId),
    };

    try {
      await addProduct(newProduct);
      Alert.alert("Product added!");
      setName("");
      setPrice("");
      setImg("");
      setCategoryId("");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Failed to add product");
    }
  };
  const handleDelete = async (productId: number) => {
    try {
      const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);
      Alert.alert("Product deleted!");
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Failed to delete product");
    }
  };

  const handleUpdate = async (product: Product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setImg(product.img);
    setCategoryId(product.categoryId.toString());
  };

  const handleSaveUpdate = async () => {
    if (editId === null) return;

    const updatedProduct: Product = {
      id: editId,
      name,
      price: Number(price),
      img,
      categoryId: Number(categoryId),
    };

    try {
      await updateProduct(updatedProduct);
      Alert.alert("Product updated!");
      setName("");
      setPrice("");
      setImg("");
      setCategoryId("");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      Alert.alert("Failed to update product");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Image URI"
          value={img}
          onChangeText={setImg}
        />
        <TextInput
          style={styles.input}
          placeholder="Category ID"
          value={categoryId}
          onChangeText={setCategoryId}
          keyboardType="numeric"
        />
        {editId ? (
          <TouchableOpacity onPress={handleSaveUpdate} style={styles.input}>
            <Text>Update</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSave} style={styles.input}>
            <Text>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={localImage[product.img]}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity onPress={() => handleDelete(product.id)}>
              <Text>🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUpdate(product)}>
              <Text>🖊️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Practice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  form: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
