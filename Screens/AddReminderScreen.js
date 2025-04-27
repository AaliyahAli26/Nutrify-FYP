import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../Layout/AddReminderScreenStyles";

const AddReminderScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Your First Reminder</Text>
      <Text style={styles.subtitle}>
        Easily add your supplements to Nutrify to create reminders to help you
        stay on track
      </Text>
      <View style={styles.SuppClock}>
        <Image
          source={require("../assets/SuppClock.png")}
          style={styles.SuppClockImage}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("SelectSupplementsScreen")}
      >
        <Text style={styles.addButtonText}>Add supplement</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReminderScreen;
