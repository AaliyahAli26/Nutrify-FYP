import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { schedulePushNotification } from "./Services/NotificationService";

const TimeScreen = ({ route, navigation }) => {
  const { supplementName } = route.params || {};
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleSetReminder = async () => {
    try {
      const now = new Date();
      const scheduledTime = new Date(now);
      scheduledTime.setHours(time.getHours());
      scheduledTime.setMinutes(time.getMinutes());
      scheduledTime.setSeconds(0);

      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      console.log("Scheduling for:", scheduledTime.toISOString());

      await schedulePushNotification(supplementName, scheduledTime);

      navigation.navigate("ConfirmScreen", {
        supplementName,
        reminderTime: scheduledTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/clock.png")} style={styles.icon} />
      <Text style={styles.heading}>Time</Text>
      <Text style={styles.subHeading}>What time do you need to take it?</Text>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.editIcon}>🖋️</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleSetReminder}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8F0ED",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 30,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    width: "60%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 22,
    color: "#333",
  },
  editIcon: {
    fontSize: 20,
    color: "teal",
  },
  nextButton: {
    backgroundColor: "teal",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  nextButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
