import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const PreferencesScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/Background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title1}>Preferences</Text>
        <Text style={styles.subtitle}>Add Your Preferences</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NextScreen")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PreferencesScreen;

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
    fontWeight: "bold",
    color: "#16504C",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 26,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 4,
  },
  buttonText: {
    fontWeight: "bold",
    color: "teal",
    fontSize: 22,
  },
});
