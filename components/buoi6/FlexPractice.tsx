import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FlexPractice = () => {
  const colors = [
    "#134686",
    "#ED3F27",
    "#FEB21A",
    "#FDF4E3",
    "#DD0303",
    "#696FC7",
    "#FFACAC",
    "#3A6F43",
    "#F75270",
  ];
  return (
    <View style={styles.container}>
      {colors.map((item, index) => (
        <View
          key={index}
          style={[
            styles.box,
            {
              borderWidth: 1,
              borderColor: `${item}`,
              backgroundColor: `${item}`,
            },
          ]}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Section {index + 1}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default FlexPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    width: "33.33%",
    height: "33.33%",
  },
  card: {
    width: "33.33%",
    height: "33.33%",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});
