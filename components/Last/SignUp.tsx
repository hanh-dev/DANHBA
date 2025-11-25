import { AuthStackParamList } from "@/app/navigation/RootNavigator";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { signUp } from "../buoi12/database";
type NavigationProps = NativeStackNavigationProp<AuthStackParamList, "SignIn">;
const SignUp = () => {
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSignUp = async () => {
    if (name.trim() === "") {
      nameRef.current?.focus();
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Name is required ❌",
      });
      return;
    }
    if (email.trim() === "") {
      emailRef.current?.focus();
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email is required ❌",
      });
      return;
    }
    if (!isValidEmail(email)) {
      emailRef.current?.focus();
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address ❌",
      });
      return;
    }
    if (password.trim() === "") {
      passwordRef.current?.focus();
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password is required ❌",
      });
      return;
    }
    if (password !== confirmPassword) {
      passwordRef.current?.focus();
      setPassword("");
      setConfirmPassword("");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password does not match ❌",
      });
      return;
    }
    const result = await signUp({
      name: name,
      email: email,
      password: password,
    });
    if (result.status) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Sign up successful! 🎉",
      });
      navigation.navigate("SignIn");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: `${result.message} ❌`,
      });
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.welcomeTitle}>Register Now</Text>
          <Text style={styles.welcomeSubtitle}>
            Sign up with your email and password to continue
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#A0A0A0"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              ref={nameRef}
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
              ref={emailRef}
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
              ref={passwordRef}
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

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={20}
              color="#A0A0A0"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <MaterialCommunityIcons
                name={
                  confirmPasswordVisible ? "eye-off-outline" : "eye-outline"
                }
                size={20}
                color="#A0A0A0"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxRow}>
            <View style={styles.checkboxLeft}>
              <TouchableOpacity style={styles.checkbox} />
              <Text style={styles.checkboxText}>Save password</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialContainer}>
          <Text style={styles.dividerText}>Or continue with</Text>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={24} color="#000" />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.signUpLink}
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign In.
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },

  // --- Header Styles ---
  header: {
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginTop: 30,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#A0A0A0",
    lineHeight: 20,
  },

  // --- Form Styles ---
  formContainer: {
    marginBottom: 10,
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
  },
  eyeIcon: {
    padding: 5,
  },

  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "600",
  },

  // Sign In Button
  signInButton: {
    backgroundColor: "#0F284B",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // --- Social Login Styles ---
  socialContainer: {
    alignItems: "center",
  },
  dividerText: {
    color: "#A0A0A0",
    fontSize: 14,
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: "100%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 10,
  },

  // --- Footer Styles ---
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  signUpLink: {
    color: "#000",
    fontWeight: "bold",
  },
});
