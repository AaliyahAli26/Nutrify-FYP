import AsyncStorage from "@react-native-async-storage/async-storage";
import { scheduleLowStockNotification } from "./NotificationService";
import { getAuth } from "firebase/auth";

const getUserRefillDataKey = () => {
  const Firebase_auth = getAuth();
  const userId = Firebase_auth.currentUser?.uid;
  return userId ? `${userId}/refillData` : null;
};

export const handleTakenAction = async (supplementName) => {
  try {
    const key = getUserRefillDataKey();
    if (!key) throw new Error("User not authenticated");

    const data = await AsyncStorage.getItem(key);
    let refillData = JSON.parse(data) || [];

    const updated = refillData.map((item) => {
      if (item.supplementName === supplementName && item.currentQuantity > 0) {
        const newQty = item.currentQuantity - 1;

        if (newQty === item.alertQuantity) {
          scheduleLowStockNotification(item.supplementName, newQty);
        }

        return { ...item, currentQuantity: newQty };
      }
      return item;
    });

    await AsyncStorage.setItem(key, JSON.stringify(updated));

    const countKey = `${userId}/takenCount`;
    const currentCount = await AsyncStorage.getItem(countKey);
    const parsedCount = parseInt(currentCount) || 0;
    await AsyncStorage.setItem(countKey, (parsedCount + 1).toString());
  } catch (err) {
    console.error("Error handling taken action:", err);
  }
};
