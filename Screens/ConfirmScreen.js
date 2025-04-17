import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const ConfirmScreen = ({ route, navigation }) => {
  const { supplementName, reminderTime, time } = route.params || {};
  const [refillData, setRefillData] = useState(null);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/fyp11.png")}
        style={styles.suppIconImage}
      />

      <Text style={styles.heading}>
        {supplementName || "(Supplement name)"}
      </Text>
      <Text style={styles.subheading}>Almost done. Would you like to:</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() =>
          navigation.navigate("AlmostDoneScreen", {
            supplementName,
            time,
            onSaveRefillData: (data) => setRefillData(data),
          })
        }
      >
        <Text style={styles.optionButtonText}>
          {refillData ? "Add Refill Reminders" : "Get Refill Reminders?"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionButtonText}>Add instructions</Text>
      </TouchableOpacity>

      {refillData && (
        <View style={styles.refillInfoContainer}>
          <Text>Refill Reminders:</Text>
          <Text>Current: {refillData.currentQuantity}</Text>
          <Text>Alert when: {refillData.alertQuantity}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          navigation.navigate("SuccessScreen", {
            supplementName,
            refillData,
            time: reminderTime,
          });
        }}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8F0ED",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  suppIconImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  optionButtonText: {
    color: "#333",
    fontSize: 16,
  },
  saveButton: {
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
  saveButtonText: {
    color: "white",
    fontSize: 26,
  },
});
