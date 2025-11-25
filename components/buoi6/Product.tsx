import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { products } from "../../constants/products";
import Style from "./Style";

const Product = () => {
  return (
    <ScrollView>
      <View style={{ backgroundColor: "#73C8D2", padding: 10 }}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#F5F1DC" }}
        >
          Header
        </Text>
      </View>
      <View style={Style.container}>
        {products.map((item, index) => (
          <View key={index} style={Style.wrappCard}>
            <View style={Style.wrappImage}>
              <Image source={item.image} style={Style.image} />
            </View>
            <Text style={Style.text}>{item.name}</Text>
            <Text style={Style.price}>{item.price} VND</Text>
            <TouchableOpacity
              style={Style.button}
              onPress={() => alert("Clicked!")}
            >
              <Text style={Style.text}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={{ backgroundColor: "#FF9013", padding: 10 }}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#F5F1DC" }}
        >
          Footer
        </Text>
      </View>
    </ScrollView>
  );
};

export default Product;
