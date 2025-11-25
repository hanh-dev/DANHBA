import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
type Props = {
  name: string;
  price: number;
  image: ImageSourcePropType;
};

const Card = (props: Props) => {
  const { name, price, image } = props;
  return (
    <View style={styles.card}>
      <View style={styles.wrappImage}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.price}>{price.toString()}</Text>
    </View>
  );
};

const ProductList = () => {
  const products = [
    {
      id:   "1",
      name: "Product 1",
      price: 9.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "2",
      name: "Product 2",
      price: 19.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "3",
      name: "Product 3",
      price: 29.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "4",
      name: "Product 1",
      price: 9.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "5",
      name: "Product 2",
      price: 19.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "6",
      name: "Product 3",
      price: 29.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "7",
      name: "Product 1",
      price: 9.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "8",
      name: "Product 2",
      price: 19.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
    {
      id:   "9",
      name: "Product 3",
      price: 29.99,
      image: require("../../assets/images/products/cancau1.png"),
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card {...item} />}
        columnWrapperStyle={  { justifyContent: "space-between", margin: 5 }}
      />
      <FlatList
        data={products}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Card {...item} />}
      />
    </View>
  );
};

export default ProductList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "30%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  wrappImage: {
    position: "relative",
    width: 100,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 5,
    padding: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 14,
    color: "#0046FF",
    textAlign: "center",
    fontWeight: "bold",
  },
  price: {
    color: "#bd5f0dff",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#73C8D2",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 2,
    alignItems: "center",
  },
});
