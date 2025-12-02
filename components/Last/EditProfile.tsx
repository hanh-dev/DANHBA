import { ProfileStackParamList } from "@/app/navigation/types";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { updateUserInfo } from "../buoi12/database";
type EditProfileRouteProp = RouteProp<ProfileStackParamList, "EditProfile">;

const EditProfile = () => {
  const route = useRoute<EditProfileRouteProp>();
  const { userInfo } = route.params || {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation: any = useNavigation();

  const handleSaveChanges = async () => {
    console.log("Saving profile changes...");
    try {
      const user = {
        id: userInfo.id,
        name: name,
        email: email,
        password: password,
        role: "buyer",
      };
      const result = await updateUserInfo(user);
      if (result) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile updated successful! 🎉",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword(userInfo.password);
  }, []);

  return (
    <ScrollView>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/grocery/hanh.jpg")}
          style={styles.profileImage}
        />
        {/* <Text style={styles.userName}>{userInfo.name}</Text> */}
      </View>
      <View style={styles.screenContainer}>
        <View style={styles.inputWrapper}>
          <FontAwesome
            name="user-o"
            size={18}
            color="#A0A0A0"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
        </View>

        <View style={styles.inputWrapper}>
          <FontAwesome
            name="envelope-o"
            size={18}
            color="#A0A0A0"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color="#A0A0A0"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#4CAF50",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  profileSection: {
    alignItems: "center",
    marginTop: -30,
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 16,
    backgroundColor: "#E0E0E0",
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A5319",
    marginBottom: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 40,
    textAlign: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 5,
  },

  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  deleteAccountLink: {
    alignSelf: "center",
    marginTop: 10,
  },
  deleteAccountText: {
    color: "#FF6347",
    fontSize: 14,
    fontWeight: "600",
  },
});
