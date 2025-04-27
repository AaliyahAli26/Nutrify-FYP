import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";

export const RefillContext = createContext();

export const RefillProvider = ({ children }) => {
  const [refillDataList, setRefillDataList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const Firebase_auth = getAuth();
    const unsubscribe = Firebase_auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setRefillDataList([]); // Clear data on logout
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;

      try {
        const key = `${userId}/refillData`;
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          setRefillDataList(parsed);
        } else {
          setRefillDataList([]);
        }
      } catch (e) {
        console.error("Failed to load refill data", e);
      }
    };

    loadData();
  }, [userId]);

  useEffect(() => {
    const saveData = async () => {
      if (!userId) return;

      try {
        const key = `${userId}/refillData`;
        await AsyncStorage.setItem(key, JSON.stringify(refillDataList));
      } catch (e) {
        console.error("Failed to save refill data", e);
      }
    };

    saveData();
  }, [refillDataList, userId]);

  const addRefillData = (newData) => {
    setRefillDataList((prevData) => {
      const existingIndex = prevData.findIndex(
        (item) => item.supplementName === newData.supplementName
      );

      if (existingIndex >= 0) {
        const updated = [...prevData];
        updated[existingIndex] = newData;
        return updated;
      } else {
        return [...prevData, newData];
      }
    });
  };

  const updateQuantity = (supplementName, newQuantity) => {
    setRefillDataList((prevData) =>
      prevData.map((item) =>
        item.supplementName === supplementName
          ? { ...item, currentQuantity: newQuantity }
          : item
      )
    );
  };

  return (
    <RefillContext.Provider
      value={{ refillDataList, addRefillData, updateQuantity }}
    >
      {children}
    </RefillContext.Provider>
  );
};
