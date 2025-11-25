import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
// import { FcBusinesswoman } from "react-icons/fc";
import React, { useState } from "react";

const BMIV2 = () => {
  const [gender, setGender] = useState("");
  return (
    <View>
      <Text style={styles.text}>Body Mass Index (BMI) Calculator</Text>
      <View style={styles.genderWrapp}>
        <View style={styles.textNUmbWrapp}>
          <Text style={styles.textNUmb}>1</Text>
        </View>
        <Text style={styles.textv2}>What is your gender?</Text>
        <View style={styles.container}>
          <Pressable
            style={[
              styles.genderCard,
              gender === "female" ? styles.selectedGender : "",
            ]}
            onPress={() => setGender("female")}
          >
            <Text style={styles.image}>🙋‍♀️</Text>
            <Text>Female</Text>
          </Pressable>
          <Pressable
            style={[
              styles.genderCard,
              gender === "male" ? styles.selectedGender : "",
            ]}
            onPress={() => setGender("male")}
          >
            <Text style={styles.image}>🙋‍♂️</Text>
            <Text>Male</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.genderWrapp}>
        <View style={styles.textNUmbWrapp}>
          <Text style={styles.textNUmb}>2</Text>
        </View>
        <Text style={styles.textv2}>How tall are you?</Text>
        <View style={styles.heightButton}>
          <Pressable style={styles.pressableButton}>
            <TextInput placeholder="Enter your height"></TextInput>
          </Pressable>
          <Text style={styles.pressableText}>cm</Text>
        </View>
      </View>
    </View>
  );
};

export default BMIV2;

const styles = StyleSheet.create({
  genderWrapp: {
    borderWidth: 2,
    borderColor: "#ED3F27",
    borderRadius: 10,
    padding: 18,
    position: "relative",
    marginTop: 16,
    backgroundColor: "#FDF4E3",
    paddingBottom: 30,
  },
  genderCard: {
    backgroundColor: "#FFF",
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    gap: 5,
    borderRadius: 10,
  },
  textNUmbWrapp: {
    position: "absolute",
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: "#ED3F27",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 5,
    backgroundColor: "#FEB21A",
    top: -16,
    marginLeft: "50%",
  },
  textNUmb: {
    fontWeight: "bold",
    color: "#134686",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#134686",
    textAlign: "center",
  },
  textv2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#134686",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    fontSize: 50,
  },
  selectedGender: {
    borderWidth: 1,
    borderColor: "#6E8CFB",
    borderRadius: 10,
  },
  heightButton: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderRadius: 10,
    // borderColor: '#134686'
  },
  pressableText: {
    // width: 60,
    height: 42,
    // right: 0,
    width: "20%",
    borderWidth: 1,
    borderColor: "#134686",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  pressableButton: {
    borderWidth: 1,
    width: "80%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
