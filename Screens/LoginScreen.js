import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Firebase_auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState("");
  const auth = Firebase_auth;

  useEffect(() => {
    const authInstance = getAuth();
    signOut(authInstance)
      .then(() => console.log("User logged out on startup"))
      .catch((error) => console.error("Error signing out: ", error));
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter correct email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await AsyncStorage.removeItem("user");

      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Login Successful", `Welcome back, ${user.email}!`),
        navigation.replace("AddReminderScreen", { user });
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
        <View style={{ width: "100%" }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={secureText}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons
                name={secureText ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#555"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.Forgot}>Forgot Password?</Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  container: {
    width: "90%", // Ensures inputs stay aligned within a fixed space
    maxWidth: 400,
    padding: 20,
    backgroundColor: "rgba(210, 241, 234, 0.8)",
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center", // Keeps everything aligned properly
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#16504C",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#16504C",
    marginBottom: 60,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row", // Ensures consistency with password input
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 12,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: "white",
    paddingVertical: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    marginTop: 15,
    height: 45,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeIcon: {
    paddingHorizontal: 4,
  },
  loginButton: {
    backgroundColor: "teal",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 26,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  Forgot: {
    marginBottom: 60,
    color: "#000",
    paddingLeft: 220,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  footerText: {
    color: "#000",
  },
  signupLink: {
    color: "teal",
    fontWeight: "bold",
    marginLeft: 2,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
