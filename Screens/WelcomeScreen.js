import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/Background.jpg")} // Add your local image path here
      style={styles.background} // Apply background styles
    >
      <View style={styles.container}>
        <Text style={styles.title1}>Welcome To</Text>
        <Text style={styles.title2}>Nutrify</Text>
        <Text style={styles.subtitle}>
          Your personal supplement-reminding companion
        </Text>
        <Text style={styles.subtitle2}>
          Your health, your way, stay on track with every
        </Text>
        <Text style={styles.subtitle3}>supplement, everyday....</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title1: {
    fontSize: 35,
    fontWeight: "semi-bold",
    marginTop: 90,
    color: "#16504C",
  },
  title2: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#16504C",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "normal",
    marginBottom: 450,
    color: "#16504C",
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 1,
    color: "white",
    fontStyle: "italic",
  },
  subtitle3: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 8,
    color: "white",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 26,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 4,
  },
  signupButton: {
    marginBottom: 50,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 95,
    borderRadius: 26,
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "teal",
    fontSize: 22,
  },
});
