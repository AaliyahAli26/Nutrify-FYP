import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";
import { RefillContext } from "../Entity/Services/RefillContext";
import { useSupplements } from "../Entity/Services/SupplementContext";
import { getAuth } from "firebase/auth";
import styles from "../Layout/AlmostDoneScreenStyles";

const AlmostDoneScreen = ({ route, navigation }) => {
  const { supplementName, time, onSaveRefillData } = route.params || {};
  const [currentQuantity, setCurrentQuantity] = useState("");
  const [alertQuantity, setAlertQuantity] = useState("");
  const { addRefillData } = useContext(RefillContext);
  const Firebase_auth = getAuth();

  const validateInputs = () => {
    if (!currentQuantity || !alertQuantity) {
      Alert.alert("Missing Information", "Please fill in all fields");
      return false;
    }

    const numCurrent = parseInt(currentQuantity);
    const numAlert = parseInt(alertQuantity);

    if (isNaN(numCurrent) || isNaN(numAlert)) {
      Alert.alert("Invalid Input", "Please enter valid numbers");
      return false;
    }

    if (numCurrent <= 0 || numAlert <= 0) {
      Alert.alert("Invalid Quantity", "Quantities must be greater than 0");
      return false;
    }

    if (numAlert >= numCurrent) {
      Alert.alert(
        "Invalid Alert Quantity",
        "Alert quantity should be less than current quantity"
      );
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    if (!validateInputs()) return;

    const numCurrent = parseInt(currentQuantity);
    const numAlert = parseInt(alertQuantity);

    const refillData = {
      supplementName,
      currentQuantity: numCurrent,
      alertQuantity: numAlert,
      time,
    };

    addRefillData(refillData);

    if (onSaveRefillData) {
      onSaveRefillData(refillData);
      navigation.goBack();
    } else {
      navigation.navigate("SuccessScreen", {
        supplementName,
        time,
        refillData,
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/fyp11.png")}
        style={styles.suppIconImage}
        resizeMode="contain"
      />

      <Text style={styles.heading}>{supplementName}</Text>
      <Text style={styles.subheading}>Add refill information:</Text>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Current quantity remaining</Text>
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            placeholder="30"
            value={currentQuantity}
            onChangeText={setCurrentQuantity}
            autoFocus={true}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>Alert when quantity reaches</Text>
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            placeholder="10"
            value={alertQuantity}
            onChangeText={setAlertQuantity}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        activeOpacity={0.8}
      >
        <Text style={styles.saveButtonText}>Save Reminders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AlmostDoneScreen;
