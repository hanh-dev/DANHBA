import React, { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const BMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [buttonActive, setButtonActive] = useState("male");
  const [heightError, setHeightError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [BMI, setBMI] = useState(0);
  const [result, setResult] = useState("");
  
  const handleHeightChange = (height: string) => {
    if (isNaN(Number(height)) && height !== "") {
      setHeight("");
      setResult("");
      setHeightError(true);
      return;
    }
    setHeight(height);
    setHeightError(false);
  };

  const handleWeightChange = (weight: string) => {
    if (isNaN(Number(weight)) && weight !== "") {
      setWeight("");
      setResult("");
      setWeightError(true);
      return;
    }
    setWeight(weight);
    setWeightError(false);
  };
  const handleReset = () => {
    setHeight("");
    setWeight("");
    setResult("");
  };
  const handleCalculateBMI = (height: string, weight: string) => {
    const heightNumber = parseFloat(height);
    const weightNumber = parseFloat(weight);

    const heightInMeters = heightNumber / 100;
    const BMI = weightNumber / (heightInMeters * heightInMeters);
    setBMI(BMI);
    if (BMI < 18.5) {
      setResult("You are underweight. You should eat more");
    } else if (BMI <= 24.9) {
      setResult("You are normal");
    } else if (BMI <= 29.9) {
      setResult("You are overweight. You should have a healthy lifestyle");
    } else {
      setResult("You are obese. You should find me to reduce your weight");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Online BMI Calculator tool</Text>
      <View style={styles.container2}>
        <Pressable
          style={[
            styles.containerText2,
            buttonActive === "male" && styles.activeButton,
          ]}
          onPress={() => setButtonActive("male")}
        >
          <Text style={styles.text2}>Male</Text>
        </Pressable>
        <Pressable
          style={[
            styles.containerText2,
            buttonActive === "female" && styles.activeButton,
          ]}
          onPress={() => setButtonActive("female")}
        >
          <Text style={styles.text2}>Female</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your height (cm)"
        value={height}
        onChangeText={(text) => handleHeightChange(text)}
      />
      {heightError ? <Text style={styles.error}>Invalid Height</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter your weight (kg)"
        value={weight}
        onChangeText={(text) => handleWeightChange(text)}
      />
      {weightError ? <Text style={styles.error}>Invalid Weight</Text> : null}
      <Button title="Reset" onPress={handleReset}></Button>
      <Button
        title="Calculate BMI"
        onPress={() => handleCalculateBMI(height, weight)}
      />
      <Text
        style={[
          BMI < 18.5 || BMI >= 30
            ? styles.error
            : BMI <= 24.9
            ? styles.normal
            : styles.overweight
        ]}
      >
        {result}
      </Text>
    </View>
  );
};

export default BMI;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#FF8040",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#E9E9E9",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6E8CFB",
    textAlign: "center",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#6E8CFB",
    padding: 4,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
  },
  containerText2: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    padding: 5,
    borderRadius: 20,
  },
  text2: {
    color: "#FF8040",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6E8CFB",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#001BB7",
    color: "#FFF",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
  normal: {
    color: "green",
    textAlign: "center",
    fontSize: 18,
  },
  overweight: {
    color: "#FF8040",
    textAlign: "center",
    fontSize: 18,
  },
});
