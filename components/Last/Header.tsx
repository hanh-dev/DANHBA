import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CartItem } from "../buoi12/database";
import PriceFilter from "./PriceFilter";

interface HeaderProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (text: string, priceRange?: [number, number]) => void;
  onPress: () => void;
  cartItems: CartItem[];
}

const Header: React.FC<HeaderProps> = ({
  keyword,
  setKeyword,
  handleSearch,
  onPress,
  cartItems,
}) => {
  const [userName, setUserName] = useState<string | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [status, setStatus] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50);

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await AsyncStorage.getItem("userName");
      setUserName(name);
    };
    fetchUserName();
  }, []);

  const openFilter = () => {
    setStatus(!status);
    bottomSheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/grocery/hanh.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.textAddress}>Hi! {userName}, Ho Chi Minh</Text>
        </View>
        <View style={styles.rightHeader}>
          <Ionicons
            name="bag-outline"
            size={24}
            color="#ffffff"
            onPress={onPress}
          />
          <View style={styles.wrapp}>
            <Ionicons name="notifications-outline" size={22} color="#ffffff" />
            <View style={styles.badgeNumber}>
              <Text style={{ color: "white", fontSize: 12 }}>
                {cartItems.length}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.boxSearch}>
        <View style={styles.searchWrapp}>
          <TextInput
            value={keyword}
            onChangeText={(text) => {
              setKeyword(text);
              handleSearch(text);
            }}
            style={styles.input}
            placeholder="Search here anything you want..."
          />
          <Ionicons style={styles.searchIcon} name="search-outline" size={20} />
        </View>

        <TouchableOpacity onPress={openFilter}>
          <Ionicons name="options-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* BottomSheet Filter */}
      {status && (
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApply={(range) => {
            setMinPrice(range[0]);
            setMaxPrice(range[1]);
            handleSearch(keyword, range);
            setStatus(false);
          }}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4CAF50",
    paddingTop: 40,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leftHeader: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  imageWrapper: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 32, height: 32, borderRadius: 50 },
  textAddress: { color: "#ffffff" },
  rightHeader: { flexDirection: "row", gap: 4 },
  wrapp: {
    position: "relative",
  },
  badgeNumber: {
    position: "absolute",
    width: 18,
    height: 18,
    backgroundColor: "red",
    borderRadius: 50,
    top: 0,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  boxSearch: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchWrapp: { flex: 1, position: "relative" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingRight: 40,
  },
  searchIcon: { position: "absolute", right: 10, color: "#ffffff" },
  applyButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
