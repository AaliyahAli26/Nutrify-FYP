import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddReminderScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Your First Reminder </Text>
    </View>
  );
};

export default AddReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 32,
    fontWeight: "normal",
    color: "#333",
  },
});
