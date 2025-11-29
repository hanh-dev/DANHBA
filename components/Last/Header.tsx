import { HomeStackParamList } from "@/app/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (text: string) => void;
}

type NavigationProps = NativeStackNavigationProp<HomeStackParamList, "Home">;

const Header: React.FC<HeaderProps> = ({
  keyword,
  setKeyword,
  handleSearch,
}) => {
  const [userName, setUserName] = React.useState<string | null>(null);
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("userName");
        setUserName(name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, []);
  return (
    <View style={styles.container}>
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
          <Ionicons name="cart-outline" size={20} color="#ffffff" />
          <Ionicons name="notifications-outline" size={19} color="#ffffff" />
        </View>
      </View>
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
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Ionicons name="options-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>
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
    justifyContent: "center",
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
  image: {
    width: 32,
    height: 32,
    borderRadius: 50,
    resizeMode: "cover",
    marginTop: 0.5,
  },
  textAddress: {
    color: "#ffffff",
  },
  rightHeader: {
    flexDirection: "row",
    gap: 4,
  },
  boxSearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
    paddingHorizontal: 10,
  },
  searchWrapp: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#658C58",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    paddingRight: 40,
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    color: "#ffffff",
  },
});
