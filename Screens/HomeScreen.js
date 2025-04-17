import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useSupplements } from "./Services/SupplementContext";

const { width } = Dimensions.get("window");
const ACTION_WIDTH = width * 0.3;

const HomeScreen = ({ navigation, route }) => {
  const [currentTime] = useState(new Date());
  const { supplements, setSupplements } = useSupplements();

  useEffect(() => {
    const loadSupplements = async () => {
      try {
        const saved = await AsyncStorage.getItem("supplements");
        if (saved) {
          const parsed = JSON.parse(saved);
          const withSwipes = parsed.map((supp) => ({
            ...supp,
            taken: supp.taken || false,
            swipeValue: new Animated.Value(0),
          }));
          setSupplements(withSwipes);
        }
      } catch (e) {
        console.error("Failed to load supplements", e);
      }
    };

    loadSupplements();
    const unsubscribe = navigation.addListener("focus", loadSupplements);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (route.params?.newSupplement) {
      const newSupp = {
        ...route.params.newSupplement,
        id: Date.now().toString(),
        swipeValue: new Animated.Value(0),
        taken: false,
      };
      const updated = [...supplements, newSupp];
      setSupplements(updated);
      AsyncStorage.setItem("supplements", JSON.stringify(updated));
    }
  }, [route.params?.newSupplement]);

  const handleStatusChange = (id, status) => {
    const updated = supplements.map((supp) => {
      if (supp.id === id) {
        Animated.spring(supp.swipeValue, {
          toValue: 0,
          useNativeDriver: false,
        }).start();

        const updatedSupp = { ...supp, taken: status === "taken" };
        AsyncStorage.getItem("supplements").then((saved) => {
          const parsed = saved ? JSON.parse(saved) : [];
          const updatedStore = parsed.map((s) =>
            s.id === id ? updatedSupp : s
          );
          AsyncStorage.setItem("supplements", JSON.stringify(updatedStore));
        });

        return updatedSupp;
      }
      return supp;
    });
    setSupplements(updated);
  };

  const createPanResponder = (supplement) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        if (gesture.dx < 0) {
          supplement.swipeValue.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        const toValue = gesture.dx < -ACTION_WIDTH / 2 ? -ACTION_WIDTH : 0;
        Animated.spring(supplement.swipeValue, {
          toValue,
          useNativeDriver: false,
        }).start();
      },
    });

  const getCurrentWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - day + (day === 0 ? -6 : 1));

    return [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const weekDates = getCurrentWeekDates();
  const today = new Date();
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={require("../assets/avatar.png")}
              style={styles.profileAvatar}
            />
            <Text style={styles.guestText}>Aaliyah</Text>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          {weekDates.map((date, i) => {
            const isToday = date.toDateString() === today.toDateString();
            return (
              <View key={i} style={styles.dayContainer}>
                <Text style={styles.dayText}>
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </Text>
                <View
                  style={[
                    styles.dateContainer,
                    isToday && styles.currentDateContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateNumber,
                      isToday && styles.currentDateText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.todayContainer}>
          <Text style={styles.todayText}>Today, {formattedDate}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Monitor your supplement intake</Text>
        <Text style={styles.sectionSubtitle}>
          View your daily schedule, mark your supplements when taken
        </Text>

        <View style={styles.supplementsContainer}>
          {supplements.map((supp) => {
            if (!supp.swipeValue) return null;
            const panResponder = createPanResponder(supp);
            return (
              <View key={supp.id} style={styles.supplementRow}>
                {" "}
                {/* Added key here */}
                <Animated.View
                  style={[
                    styles.actionsContainer,
                    {
                      transform: [
                        {
                          translateX: supp.swipeValue.interpolate({
                            inputRange: [-ACTION_WIDTH, 0],
                            outputRange: [0, ACTION_WIDTH],
                            extrapolate: "clamp",
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.actionButton, styles.takenButton]}
                    onPress={() => handleStatusChange(supp.id, "taken")}
                  >
                    <Text style={styles.actionText}>Taken</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.notTakenButton]}
                    onPress={() => handleStatusChange(supp.id, "not-taken")}
                  >
                    <Text style={styles.actionText}>Not Taken</Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.supplementCard,
                    supp.taken && styles.takenSupplement,
                    {
                      transform: [{ translateX: supp.swipeValue }],
                    },
                  ]}
                  {...panResponder.panHandlers}
                >
                  <View style={styles.supplementInfo}>
                    <Text
                      style={[
                        styles.supplementName,
                        supp.taken && styles.takenText,
                      ]}
                    >
                      {supp.name}
                    </Text>
                    <Text
                      style={[
                        styles.reminderTime,
                        supp.taken && styles.takenText,
                      ]}
                    >
                      {supp.time}
                    </Text>
                  </View>
                  {supp.taken && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#4CAF50"
                    />
                  )}
                </Animated.View>
              </View>
            );
          })}
        </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F9F7",
  },
  scrollContainer: {
    padding: 0,
  },
  headerContainer: {
    backgroundColor: "#E6F9F7",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#7354BF",
  },
  guestText: {
    fontSize: 18,
    color: "teal",
    fontWeight: "600",
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  dayContainer: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
    fontWeight: "500",
  },
  dateContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  currentDateContainer: {
    backgroundColor: "#7354BF",
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  currentDateText: {
    color: "#FFFFFF",
  },
  todayContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  todayText: {
    fontSize: 16,
    color: "teal",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 6,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 15,
    color: "#7354BF",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#7354BF",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  supplementsContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  supplementRow: {
    marginBottom: 15,
    overflow: "hidden",
  },
  actionsContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  takenButton: {
    backgroundColor: "#4CAF50",
  },
  notTakenButton: {
    backgroundColor: "teal",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
  supplementCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  takenSupplement: {
    backgroundColor: "#E8F5E9",
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
  },
  supplementInfo: {
    flex: 1,
  },
  supplementName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  reminderTime: {
    fontSize: 16,
    color: "#555",
  },
  takenText: {
    color: "#777",
    textDecorationLine: "line-through",
  },
  addButton: {
    backgroundColor: "teal",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 320,
    marginHorizontal: 15,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
