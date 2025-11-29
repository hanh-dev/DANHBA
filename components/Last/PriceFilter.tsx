import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onApply: (range: [number, number]) => void;
}

const PriceFilter = ({ minPrice, maxPrice, onApply }: PriceFilterProps) => {
  const [minPriceState, setMinPriceState] = useState(minPrice);
  const [maxPriceState, setMaxPriceState] = useState(maxPrice);

  useEffect(() => {
    setMinPriceState(minPrice);
    setMaxPriceState(maxPrice);
  }, [minPrice, maxPrice]);
  return (
    <View style={styles.container}>
      <Text style={styles.h1Text}>
        {minPriceState} - {maxPriceState}
      </Text>
      <Text style={styles.label}>Min Price</Text>
      <Slider
        minimumValue={0}
        maximumValue={50}
        value={minPriceState}
        onValueChange={setMinPriceState}
        step={1}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#ddd"
      />
      <Text style={styles.label}>Max Price</Text>
      <Slider
        minimumValue={0}
        maximumValue={50}
        value={maxPriceState}
        onValueChange={setMaxPriceState}
        step={1}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#ddd"
      />
      <TouchableOpacity
        style={styles.addToCartBtn}
        onPress={() => onApply([minPriceState, maxPriceState])}
      >
        <Ionicons name="filter" size={22} color="#fff" />
        <Text style={styles.addToCartText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PriceFilter;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },
  h1Text: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#658C58",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 15,
  },

  imageWrapper: {
    width: 250,
    height: 250,
    backgroundColor: "#FBE6E6",
    borderRadius: 250,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  productImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },

  productName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4CAF50",
  },

  productOrigin: {
    color: "#4CAF50",
    marginBottom: 5,
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 3,
  },

  quantityBox: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    gap: 15,
  },

  qtyBtn: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  priceText: {
    fontSize: 28,
    fontWeight: "700",
    color: "red",
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "600",
    color: "#658C58",
    fontStyle: "italic",
  },

  descriptionText: {
    color: "#757575",
    lineHeight: 20,
    marginBottom: 20,
  },

  addToCartBtn: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    gap: 10,
    marginTop: "auto",
  },

  addToCartText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
