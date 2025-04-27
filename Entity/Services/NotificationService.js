import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Basic notification handler configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// export const initNotifications = async () => {
//   await Notifications.setNotificationCategoryAsync("supplementReminder", [
//     {
//       identifier: "TAKEN_ACTION",
//       buttonTitle: "Taken 💊",
//       options: { opensAppToForeground: false },
//     },
//     {
//       identifier: "SNOOZE_ACTION",
//       buttonTitle: "Snooze ⏰ (10 min)",
//       options: { opensAppToForeground: false },
//     },
//   ]);
// };

export const schedulePushNotification = async (
  supplementName,
  scheduledTime
) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🤍 Time to take your supplement!",
      body: `Don't forget your ${supplementName}`,
      sound: "default",
      data: { supplementName },
    },
    trigger: scheduledTime,
  });
};
