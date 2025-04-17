import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
//import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B8F0ED",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0C5249",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  SuppClock: {
    position: "absolute",
    top: 210,
    alignSelf: "center",
  },
  SuppClockImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#0C5249",
    marginBottom: 20,
    textAlign: "center",
    width: "90%",
  },
  addButton: {
    backgroundColor: "teal",
    paddingVertical: 15,
    paddingHorizontal: 85,
    borderRadius: 30,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    position: "absolute",
    bottom: 110,
  },
  addButtonText: {
    color: "white",
    fontSize: 26,
  },
});
