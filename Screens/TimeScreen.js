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
import { schedulePushNotification } from "../Entity/Services/NotificationService";
import styles from "../Layout/TimeScreenStyles";

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
