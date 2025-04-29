import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { RefillContext } from "../Entity/Services/RefillContext";
import { useSupplements } from "../Entity/Services/SupplementContext";
import styles from "../Layout/ConfirmScreenStyle";

const ConfirmScreen = ({ route, navigation }) => {
  const {
    supplementName,
    time,
    refillData: initialRefillData,
  } = route.params || {};
  const [refillData, setRefillData] = useState(initialRefillData || null);
  const { addRefillData } = useContext(RefillContext);
  const { addSupplement } = useSupplements();

  const handleAddRefill = () => {
    navigation.navigate("AlmostDoneScreen", {
      supplementName,
      time,
      onSaveRefillData: (data) => setRefillData(data),
    });
  };

  const handleSave = async () => {
    try {
      const supplementData = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: supplementName,
        dosage: "1",
        time,
        // instructions,
        taken: false,
        takenAt: null,
        ...(refillData && { refillData }),
      };

      console.log("Creating supplement:", supplementData);

      await addSupplement(supplementData);
      navigation.navigate("SuccessScreen", {
        supplementName,
        time,
      });
    } catch (error) {
      console.error("Failed to save supplement:", error);
      Alert.alert("Error", "Failed to save supplement");
    }
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
        style={styles.suppIconImage}
      />

      <Text style={styles.heading}>{supplementName}</Text>
      <Text style={styles.subheading}>Almost done. Would you like to:</Text>

      <TouchableOpacity style={styles.optionButton} onPress={handleAddRefill}>
        <Text style={styles.optionButtonText}>
          {refillData ? "Edit Refill Reminders" : "Get Refill Reminders?"}
        </Text>
      </TouchableOpacity>

      {refillData && (
        <View style={styles.refillInfoContainer}>
          <Text>Refill Reminders:</Text>
          <Text>Current: {refillData.currentQuantity}</Text>
          <Text>Alert when: {refillData.alertQuantity}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmScreen;
