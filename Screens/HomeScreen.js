import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import { useSupplements } from "../Entity/Services/SupplementContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, doc } from "firebase/firestore";
import { Firebase_auth, Firebase_db } from "../FirebaseConfig";
import styles from "../Layout/HomeScreenStyles";

const HomeScreen = ({ navigation, route }) => {
  const [currentTime] = useState(new Date());
  const {
    supplements,
    setSupplements,
    loadSupplements,
    setUserId: setContextUserId,
  } = useSupplements();

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const generateId = useCallback(() => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }, []);

  useEffect(() => {
    const loadSupplementsFromStorage = async () => {
      try {
        const data = await AsyncStorage.getItem(`supplements_${userId}`);
        if (data) {
          setSupplements(JSON.parse(data));
        }
      } catch (e) {
        console.error("Failed to load supplements", e);
      }
    };

    if (userId) {
      loadSupplementsFromStorage();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = Firebase_auth.currentUser;

        if (user) {
          console.log("Logged in as:", user.uid);
          setUserId(user.uid);
          setContextUserId(user.uid);
          await loadSupplements(user.uid);

          const userDocRef = doc(Firebase_db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username);
          }
        } else {
          console.log("No user is logged in");
          setUserId(null);
          setSupplements([]);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (userId) {
        loadSupplements(userId);
      }
    });
    return unsubscribe;
  }, [navigation, loadSupplements, userId]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleStatusChange = async (id, status) => {
    try {
      console.log(
        "Before update:",
        JSON.stringify(supplements.find((s) => s.id === id))
      );

      const today = new Date().toDateString();

      const updatedSupplements = supplements.map((supp) => {
        if (supp.id !== id) return supp;

        // Create updated supplement
        const updated = {
          ...supp,
          taken: status === "taken",
          takenAt: status === "taken" ? getCurrentTime() : null,
        };

        // Only process if taken and has refillData
        if (status === "taken" && supp.refillData) {
          const newQty = supp.refillData.currentQuantity - 1;
          updated.refillData = {
            ...supp.refillData,
            currentQuantity: newQty,
          };

          console.log(
            `Reduced ${supp.name} from ${supp.refillData.currentQuantity} to ${newQty}`
          );

          // Check for alert condition
          if (newQty <= supp.refillData.alertQuantity) {
            // Changed to <= for safety
            Alert.alert(
              `🛒 Low Stock: ${supp.name}`,
              `Only ${newQty} left! Time to reorder.`,
              [{ text: "OK" }]
            );
          }
        }

        // Add history entry for this supplement
        const historyEntry = {
          date: today,
          status: status,
          time: status === "taken" ? getCurrentTime() : null,
        };

        // Update history if available or create a new one
        updated.history = [...(supp.history || []), historyEntry];

        return updated;
      });

      // Save to storage
      await AsyncStorage.setItem(
        `supplements_${userId}`,
        JSON.stringify(updatedSupplements)
      );

      // Update state
      setSupplements(updatedSupplements);

      console.log(
        "After update:",
        JSON.stringify(updatedSupplements.find((s) => s.id === id))
      );
    } catch (e) {
      console.error("Error updating supplement:", e);
      Alert.alert("Error", "Failed to update supplement status");
    }
  };

  const handleSnooze = async (id) => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please enable notifications to snooze reminders"
        );
        return;
      }

      const supplement = supplements.find((supp) => supp.id === id);
      if (!supplement) return;

      const snoozeTime = new Date(Date.now() + 10 * 60 * 1000);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `💊 Reminder: ${supplement.name}`,
          body: `Time to take your ${supplement.dosage} supplement(s)!`,
          sound: true,
          data: { supplementId: id },
        },
        trigger: snoozeTime,
      });

      Alert.alert("😴 Snoozed", "We'll remind you again in 10 minutes!");
    } catch (error) {
      console.error("Failed to snooze notification", error);
    }
  };

  const handleSkip = (id) => {
    Alert.alert(
      "💊Skip Dose?",
      "🤨Are you sure you want to skip this dose? 😤Rebellious, aren't we? ⏭️Skipping like it's a Netflix recap...",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Snooze 10 min", onPress: () => handleSnooze(id) },
        {
          text: "Skip Anyway",
          onPress: () => handleStatusChange(id, "skipped"),
        },
      ]
    );
  };

  const handleClearAll = async () => {
    Alert.alert(
      "Clear All Supplements?",
      "Are you sure you want to clear today's supplements?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              setSupplements([]);
              await AsyncStorage.setItem(
                `supplements_${userId}`,
                JSON.stringify([])
              );
            } catch (e) {
              console.error("Failed to clear supplements", e);
            }
          },
        },
      ]
    );
  };

  const getCurrentWeekDates = useCallback(() => {
    const today = new Date();
    const day = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - day + (day === 0 ? -6 : 1));
    return [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, []);

  const weekDates = getCurrentWeekDates();
  const today = new Date();
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const validSupplements = supplements.filter(
    (supp) => supp.id && supp.name && supp.dosage
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={require("../assets/avatar.png")}
              style={styles.profileAvatar}
            />
            <Text style={styles.guestText}>{username}</Text>
          </View>
        </View>

        {/* Enhanced Calendar Section */}
        <View style={styles.calendarContainer}>
          <View style={styles.weekDaysContainer}>
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <Text key={`weekday-${index}`} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.datesContainer}>
            {weekDates.map((date) => {
              const dateStr = date.toDateString();
              const isToday = dateStr === new Date().toDateString();
              const isSelected = dateStr === selectedDate;

              const dayStats = validSupplements.reduce((stats, supp) => {
                supp.history?.forEach((entry) => {
                  if (entry.date === dateStr) {
                    stats[entry.status] = (stats[entry.status] || 0) + 1;
                  }
                });
                return stats;
              }, {});

              return (
                <TouchableOpacity
                  key={`date-${date.getTime()}`}
                  style={[
                    styles.dateContainer,
                    isToday && styles.todayDateContainer,
                    isSelected && styles.selectedDateContainer,
                  ]}
                  onPress={() => setSelectedDate(dateStr)}
                >
                  <Text
                    style={[
                      styles.dateText,
                      isToday && styles.todayDateText,
                      isSelected && styles.selectedDateText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>

                  {dayStats.taken > 0 && <View style={styles.takenIndicator} />}
                  {dayStats.skipped > 0 && (
                    <View style={styles.skippedIndicator} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Date History Section */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>
            {selectedDate === new Date().toDateString()
              ? "Today's Activity"
              : `Activity on ${new Date(selectedDate).toLocaleDateString()}`}
          </Text>

          {validSupplements
            .filter((supp) =>
              supp.history?.some((entry) => entry.date === selectedDate)
            )
            .map((supp) => {
              const dayEntries = supp.history.filter(
                (entry) => entry.date === selectedDate
              );

              return (
                <View key={`history-${supp.id}`} style={styles.historyItem}>
                  <Text style={styles.historySupplement}>{supp.name}</Text>
                  {dayEntries.map((entry, i) => (
                    <Text
                      key={`entry-${i}`}
                      style={[
                        styles.historyEntry,
                        entry.status === "taken"
                          ? styles.historyTaken
                          : styles.historySkipped,
                      ]}
                    >
                      {entry.status === "taken"
                        ? `✓ Taken at ${entry.time}`
                        : "✗ Skipped"}
                    </Text>
                  ))}
                </View>
              );
            })}

          {validSupplements.filter((supp) =>
            supp.history?.some((entry) => entry.date === selectedDate)
          ).length === 0 && (
            <Text style={styles.noActivityText}>
              No supplement activity this day
            </Text>
          )}
        </View>

        {/* Today's Date and Clear All */}
        <View style={styles.todayContainer}>
          <Text style={styles.todayText}>Today, {formattedDate}</Text>
          <TouchableOpacity
            onPress={handleClearAll}
            style={styles.clearAllButton}
          >
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Current Supplements List */}
        <View style={styles.supplementsContainer}>
          {validSupplements.map((supp) => (
            <View key={`supp-${supp.id}`} style={styles.supplementCard}>
              <View style={styles.supplementInfo}>
                <Text style={styles.supplementName}>{supp.name}</Text>
                <Text style={styles.supplementDosage}>
                  Take {supp.dosage} supplement(s)
                </Text>
                {supp.taken && (
                  <Text style={styles.takenTime}>
                    Taken at {supp.takenAt}, today
                  </Text>
                )}
                {supp.skipped && (
                  <Text style={styles.skippedText}>- Skipped today</Text>
                )}
              </View>

              {!supp.taken && !supp.skipped ? (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => handleSkip(supp.id)}
                  >
                    <Text style={styles.buttonText}>Skip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.takeButton}
                    onPress={() => handleStatusChange(supp.id, "taken")}
                  >
                    <Text style={styles.buttonText}>Take</Text>
                  </TouchableOpacity>
                </View>
              ) : supp.taken ? (
                <Ionicons name="checkmark-circle" size={24} color="teal" />
              ) : (
                <Ionicons name="close-circle" size={24} color="#F44336" />
              )}
            </View>
          ))}
        </View>

        {/* Add Supplement Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("SelectSupplementsScreen")}
        >
          <Text style={styles.addButtonText}>+ Add Supplement</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
