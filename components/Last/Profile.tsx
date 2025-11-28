import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstWrapp}>
        {" "}
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#1A5319" />
        </TouchableOpacity>
        <Text>Profile</Text>
      </View>
      <View style={styles.seccondWrapp}>
            <Text>Test</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  firstWrapp: {
    backgroundColor: "#19253D",
    height: 120,
    width: 'auto',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50
  },
  seccondWrapp: {
    flex: 1,
    backgroundColor: "blue",
  }
});
