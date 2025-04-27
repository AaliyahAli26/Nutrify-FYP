import { Firebase_db } from "./FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const saveMoodEntry = async (userId, entry) => {
  try {
    const docRef = await addDoc(collection(Firebase_db, "moodEntries"), {
      userId,
      mood: entry.mood,
      description: entry.description,
      symptoms: entry.symptoms,
      timestamp: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getMoodHistory = async (userId) => {
  try {
    const q = query(
      collection(db, "moodEntries"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};
