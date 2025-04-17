import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

const SelectSupplementsScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/fyp9.png")}
        style={styles.SuppIconImage}
      />

      <Text style={styles.heading}>Supplement Name</Text>
      <Text style={styles.heading1}>
        What supplement would you like to add?
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your supplement name"
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("DosageScreen", { supplementName: query })
          }
        >
          <Text style={styles.addButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectSupplementsScreen;

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
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  heading1: {
    fontSize: 20,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 50,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 90,
  },
  addButton: {
    backgroundColor: "teal",
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  addButtonText: {
    color: "white",
    fontSize: 26,
  },
});
