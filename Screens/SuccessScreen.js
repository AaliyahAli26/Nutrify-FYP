import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useSupplements } from "../Screens/Services/SupplementContext";

const SuccessScreen = ({ navigation, route }) => {
  const { supplementName, time } = route.params || {};
  const { addSupplement } = useSupplements();

  useEffect(() => {
    if (supplementName && time) {
      addSupplement({
        name: supplementName,
        time,
        // refillData,
      });
    }
  }, []);

  const handleDone = () => {
    navigation.navigate("Main", {
      newSupplement: {
        name: supplementName,
        time,
        id: Date.now().toString(),
      },
    });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/supplements.png")}
        style={styles.SuppIconImage}
      />

      <Text style={styles.heading}>You have successfully added</Text>
      <Text style={styles.heading1}>
        {supplementName || "(Supplement name)"}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton1}
          onPress={() => navigation.navigate("SelectSupplementScreen")}
        >
          <Text style={styles.addButton1Text}>Add another supplement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleDone}>
          <Text style={styles.addButtonText}>I'm Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8F0ED",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  SuppIconImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 70,
    marginTop: 140,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  heading1: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 90,
  },
  addButton1: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignSelf: "center", // Center the button
    minWidth: "80%", // Minimum width
  },
  addButton: {
    backgroundColor: "teal",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignSelf: "center", // Center the button
    minWidth: "80%", // Minimum width
    marginTop: 15, // Space between buttons
  },
  addButton1Text: {
    color: "teal",
    fontSize: 22,
    textAlign: "center", // Center text
  },
  addButtonText: {
    color: "white",
    fontSize: 22,
    textAlign: "center", // Center text
  },
});
