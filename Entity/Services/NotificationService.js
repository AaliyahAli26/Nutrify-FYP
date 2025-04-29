import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
