import { HomeStackParamList } from "@/app/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Category,
  Product,
  addProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  updateProduct,
} from "./database";

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, "Home">;

const FinalProduct = ({ navigation }: HomeScreenProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const localImage: { [key: string]: any } = {
    cancau1: require("../../assets/images/products/aosomi.jpg"),
    cancau2: require("../../assets/images/products/sneaker.jpg"),
    cancau3: require("../../assets/images/products/cancau3.png"),
    cancau4: require("../../assets/images/products/cancau4.png"),
    cancau5: require("../../assets/images/products/cancau5.png"),
    cancau6: require("../../assets/images/products/cancau6.png"),
    cancau7: require("../../assets/images/products/cancau7.png"),
  };

  const fetchData = async () => {
    try {
      const categories = await getAllCategories();
      const products = await getAllProducts();
      setCategories(categories);
      setProducts(products);
    } catch (error) {
      console.error("Error fetching product list: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleSaveImage = async () => {
    try {
      const product: Product = {
        id: editId ?? products.length + 1,
        name: name,
        price: Number(price),
        categoryId: categoryId,
        img: imageUri ?? "",
      };

      if (editId) {
        await updateProduct(product);
        Alert.alert("✅ Updated product successfully");
      } else {
        await addProduct(product);
        Alert.alert("✅ Added product successfully");
      }

      // Reset form
      setImageUri(null);
      setName("");
      setPrice("");
      setCategoryId(1);
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error("Error saving product: ", error);
    }
  };

  const openUpdateForm = (id: number) => {
    setEditId(id);
    const product = products.find((product) => product.id === id);
    const category = categories.find(
      (category) => category.id === product?.categoryId
    );
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setImageUri(product.img);
      setCategoryId(category ? category.id : 1);
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Are you sure",
      "Do you want to continue this action?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const updateProduct = products.filter((c) => c.id !== id);
            setProducts(updateProduct);
            await deleteProduct(id);
            Alert.alert("Deleted successfully!");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Ionicons name="location-outline" size={20} color="#658C58" />
          <Text>Ho Van Hanh, Ho Chi Minh</Text>
        </View>
        <View>
          <Ionicons name="cart-outline" size={20} color="#658C58" />
          <Ionicons name="notifications-outline" size={20} color="#658C58" />
        </View>
      </View>
      <Text style={styles.header}>Danh sách sản phẩm</Text>
      <View style={styles.cardContainer}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <View style={styles.card}>
                <Image
                  source={
                    item.img.startsWith("file://")
                      ? { uri: item.img }
                      : localImage[item.img]
                  }
                  style={styles.cardImage}
                />

                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardPrice}>{item.price} VND</Text>

                <View style={styles.iconWrapp}>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text>❌</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openUpdateForm(item.id)}>
                    <Text>🖊️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

export default FinalProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF5656",
    marginVertical: 10,
    textAlign: "center",
  },

  /** FORM STYLES **/
  form: {
    backgroundColor: "#FEEE91",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5656",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FFA239",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
  },
  dropdown: {
    height: 50,
    borderColor: "#FFA239",
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
    color: "#000",
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
    backgroundColor: "#FFA239",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  /** CARD LIST **/
  cardContainer: {
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    width: 150,
    borderWidth: 1,
    borderColor: "#8CE4FF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 130,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 14,
    color: "#FF5656",
    fontWeight: "bold",
    marginTop: 4,
  },
  iconWrapp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
