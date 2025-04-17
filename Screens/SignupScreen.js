import React, { useState } from "react";
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
import { Firebase_auth, Firebase_db } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [confirm, setConfirm] = useState("");
  const [secureeText, setSecureeText] = useState(true);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirm.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        Firebase_auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(Firebase_db, "users", user.uid), {
        username: username,
        email: email,
        uid: user.uid,
      });

      Alert.alert("Sign Up Successful", `Welcome to Nutrify ${username}!`);

      navigation.navigate("LoginScreen", { user: user });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subtitle}>Create your account</Text>
        <View style={{ width: "100%" }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View style={{ width: "100%" }}>
            <View style={styles.emailContainer}>
              <TextInput
                style={styles.email}
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
        </View>
        <View style={styles.confirmContainer}>
          <TextInput
            style={styles.confirmInput}
            placeholder="Confirm Password"
            secureTextEntry={secureeText}
            value={confirm}
            onChangeText={setConfirm}
          />
          <TouchableOpacity onPress={() => setSecureeText(!secureeText)}>
            <Ionicons
              name={secureeText ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#555"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  container: {
    padding: 20,
    backgroundColor: "rgba(210, 241, 234, 0.8)",
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
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
    marginBottom: 50,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
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
  emailContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 12,
    justifyContent: "center",
  },
  email: {
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
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeIcon: {
    paddingHorizontal: 4,
  },
  confirmContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 60,
  },
  confirmInput: {
    flex: 1,
    paddingVertical: 12,
  },
  signupButton: {
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
  signupText: {
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
  loginLink: {
    color: "teal",
    fontWeight: "bold",
  },
});
