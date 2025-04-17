/*import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const schedulePushNotification = async (
  supplementName,
  scheduledTime
) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") throw new Error("Permission denied");

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🤍Time to glow up, one supplement at a time!",
      body: `Take your 💊"${supplementName}". Let's glow:)`,
      sound: true,
      data: { supplementName },
    },
    trigger: scheduledTime,
  });

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  console.log("ACTUALLY SCHEDULED:", scheduled);
};*/
import * as Notifications from "expo-notifications";

// Define the actions for the notifications (Snooze and Taken)
Notifications.setNotificationCategoryAsync("supplementReminder", [
  {
    identifier: "TAKEN_ACTION",
    buttonTitle: "Taken 💪",
    options: { opensAppToForeground: false },
  },
  {
    identifier: "SNOOZE_ACTION",
    buttonTitle: "Snooze ⏰",
    options: { opensAppToForeground: false },
  },
]);

// Function to schedule a push notification
export const schedulePushNotification = async (
  supplementName,
  scheduledTime
) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") throw new Error("Permission denied");

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🤍Time to glow up, one supplement at a time!",
      body: `Take your 💊"${supplementName}". Let's glow :)`,
      sound: true,
      data: { supplementName },
      categoryIdentifier: "supplementReminder", // Set the category to include action buttons
    },
    trigger: scheduledTime,
  });

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  console.log("ACTUALLY SCHEDULED:", scheduled);
};
