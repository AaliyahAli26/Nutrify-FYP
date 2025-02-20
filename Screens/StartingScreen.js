import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";

const StartingScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/Background.jpg")}
      style={styles.background}
    >
      <View style={styles.logo}>
        <Image
          source={require("../assets/loho.png")}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subheading}>Aaliyah</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Lets Go!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default StartingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    position: "absolute", // Fix position at the top
    top: 150, // Adjust the distance from the top
    alignItems: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    width: "80%",
    height: "100%",
  },
  heading: {
    marginTop: 50,
    fontSize: 70,
    fontWeight: "bold",
    color: "#16504C",
  },
  subheading: {
    fontSize: 50,
    fontWeight: "600",
    color: "#4F309B",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 40,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 4,
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "teal",
    fontSize: 26,
  },
});
