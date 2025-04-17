import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Platform } from "react-native";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import StartingScreen from "./Screens/StartingScreen";
import AddReminderScreen from "./Screens/AddReminderScreen";
import SelectSupplementsScreen from "./Screens/SelectSupplementsScreen";
import DosageScreen from "./Screens/DosageScreen";
import TimeScreen from "./Screens/TimeScreen";
import ConfirmScreen from "./Screens/ConfirmScreen";
import AlmostDoneScreen from "./Screens/AlmostDoneScreen";
import SuccessScreen from "./Screens/SuccessScreen";
import HomeScreen from "./Screens/HomeScreen";
import Tab from "./UI/Tab";
import { SupplementProvider } from "./Screens/Services/SupplementContext"; // adjust path

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  useEffect(() => {
    const prepareNotifications = async () => {
      try {
        await Notifications.cancelAllScheduledNotificationsAsync();

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.warn("Notification permissions not granted");
        }

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "Default",
            importance: Notifications.AndroidImportance.HIGH,
            sound: true,
          });
        }
      } catch (error) {
        console.error("Notification setup error:", error);
      }
    };

    prepareNotifications();
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        const action = response.actionIdentifier;
        const supplementName =
          response.notification.request.content.data.supplementName;

        if (action === "TAKEN_ACTION") {
          console.log(`${supplementName} marked as taken! ✅`);
          // You can add more actions here to handle when the supplement is marked as taken
        } else if (action === "SNOOZE_ACTION") {
          console.log(`Snoozed ${supplementName} by 2 minutes.`);
          const snoozeTime = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes later
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "⏰ Just a gentle nudge...",
              body: `Don't forget your 💊"${supplementName}"!`,
              sound: true,
              data: { supplementName },
              categoryIdentifier: "supplementReminder",
            },
            trigger: snoozeTime,
          });
        }
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SupplementProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="WelcomeScreen"
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="StartingScreen" component={StartingScreen} />
          <Stack.Screen
            name="AddReminderScreen"
            component={AddReminderScreen}
          />
          <Stack.Screen
            name="SelectSupplementsScreen"
            component={SelectSupplementsScreen}
          />
          <Stack.Screen name="DosageScreen" component={DosageScreen} />
          <Stack.Screen name="TimeScreen" component={TimeScreen} />
          <Stack.Screen name="AlmostDoneScreen" component={AlmostDoneScreen} />
          <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="Main" component={Tab} />
        </Stack.Navigator>
      </NavigationContainer>
    </SupplementProvider>
  );
};

export default App;
