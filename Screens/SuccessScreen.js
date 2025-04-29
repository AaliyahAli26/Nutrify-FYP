import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useSupplements } from "../Entity/Services/SupplementContext";
import styles from "../Layout/SuccessScreenStyles";

const SuccessScreen = ({ navigation, route }) => {
  const { supplementName, time } = route.params || {};
  const { addSupplement } = useSupplements();

  useEffect(() => {
    const addNewSupplement = async () => {
      try {
        if (supplementName && time) {
          await addSupplement({
            name: supplementName,
            time,
            dosage: "1",
            id: Date.now().toString(),
          });
        }
      } catch (error) {
        console.error("Failed to add supplement:", error);
      }
    };
    addNewSupplement();
  }, []);

  const handleDone = () => {
    navigation.popToTop();
    navigation.navigate("Main", {
      screen: "Home",
      params: {
        newSupplement: {
          name: supplementName,
          dosage: "1",
          time,
          id: Date.now().toString(),
        },
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
          onPress={() => navigation.navigate("SelectSupplementsScreen")}
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
