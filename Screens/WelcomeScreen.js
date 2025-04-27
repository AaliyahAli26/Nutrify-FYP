import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import styles from "../Layout/WelcomeScreenStyles";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/Background.jpg")}
      style={styles.background}
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
