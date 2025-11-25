  import React, { useRef, useState } from "react";
  import {
    Alert,
    Button,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";

  const BangTinh = () => {
    const [numNhat, setNumNhat] = useState<number>(0);
    const [numHai, setNumHai] = useState<number>(0);
    const [operator, setOperator] = useState<string>("");
    const [result, setResult] = useState<number>(0);
    const numHaiRef = useRef<TextInput>(null);

    const handleChange = (value: string, type: "numNhat" | "numHai") => {
      const number = parseFloat(value);
      if (isNaN(number)) {
        if (type === "numNhat") {
          setNumNhat(0);
        } else {
          setNumHai(0);
        }
        return;
      }
      if (type === "numNhat") {
        setNumNhat(number);
      } else {
        setNumHai(number);
      }
    };

    const handleCaculate = () => {
      if (numNhat === undefined || numHai === undefined || operator === "") {
        return;
      }

      switch (operator) {
        case "+":
          setResult(numNhat + numHai);
          break;
        case "-":
          setResult(numNhat - numHai);
          break;
        case "*":
          setResult(numNhat * numHai);
          break;
        case "/":
          if (numHai === 0) {
            numHaiRef.current?.focus();
            setResult(0);
            Alert.alert("Loi", "Khong the chia cho 0");
            return;
          }
          setResult(parseFloat((numNhat / numHai).toFixed(2)));
          break;
      }
    };
    return (
      <View>
        <Text style={styles.text}>May Tinh Voi Radio Buttons</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nhap so thu nhat"
            value={numNhat?.toString()}
            onChangeText={(value) => handleChange(value, "numNhat")}
          />
          <TextInput
            style={styles.input}
            ref={numHaiRef}
            placeholder="Nhap so thu hai"
            value={numHai?.toString()}
            onChangeText={(value) => handleChange(value, "numHai")}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Chon phep tinh</Text>
          {/* Radio Buttons */}
          <View style={styles.radioGroup}>
            {["+", "-", "*", "/"].map((op) => (
              <Pressable
                style={styles.radioItem}
                key={op}
                onPress={() => setOperator(op)}
              >
                <View style={styles.circle}>
                  {operator === op && <View style={styles.checked} />}
                </View>
                <Text style={styles.text}>{op}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Button title="Calculate" onPress={() => handleCaculate()} />
        <Text style={styles.text}>Ket qua: {result}</Text>
      </View>
    );
  };

  export default BangTinh;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      gap: 10,
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: "#3C467B",
      borderRadius: 5,
    },
    text: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: "#6E8CFB",
    },
    button: {
      backgroundColor: "#6E8CFB",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    radioGroup: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
      marginBottom: 10,
    },

    radioItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    circle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#007bff",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 5,
    },
    checked: {
      width: 10,
      height: 10,
      borderRadius: 50,
      backgroundColor: "#007bff",
    },
  });
