import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

const AlmostDoneScreen = ({ route, navigation }) => {
  const { supplementName, onSaveRefillData, time } = route.params || {};
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [alertQuantity, setAlertQuantity] = useState("");
  //const { supplementName, onSaveRefillData } = route.params;
  const handleSave = () => {
    if (onSaveRefillData) {
      onSaveRefillData({
        currentQuantity,
        alertQuantity,
      });
    }
    navigation.navigate("SuccessScreen", {
      supplementName,
      time: route.params.time,
      refillData: {
        currentQuantity,
        alertQuantity,
      },
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/fyp11.png")}
        style={styles.SuppIconImage}
      />

      <Text style={styles.heading}>{supplementName}</Text>
      <Text style={styles.subheading}>Add refill information:</Text>

      <View style={styles.inputContainer}>
        <Text>How many supplements do you have left?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter quantity"
          value={currentQuantity}
          onChangeText={setCurrentQuantity}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Remind me when I have:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter quantity"
          value={alertQuantity}
          onChangeText={setAlertQuantity}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        // onPress={() => navigation.navigate("ConfirmScreen")}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlmostDoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8F0ED",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backText: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "black",
    marginTop: 40,
    marginLeft: 20,
  },
  SuppIconImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: "teal",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
  },
});
