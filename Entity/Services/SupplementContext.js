// Services/SupplementContext.js
import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SupplementContext = createContext();

export const SupplementProvider = ({ children }) => {
  const [supplements, setSupplements] = useState([]);
  const [userId, setUserId] = useState(null);

  const loadSupplements = async (uid) => {
    try {
      if (!uid) return;

      const saved = await AsyncStorage.getItem(`supplements_${uid}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSupplements(parsed);
      } else {
        setSupplements([]);
      }
    } catch (e) {
      console.error("Failed to load supplements", e);
    }
  };

  // In your SupplementContext.js
  const addSupplement = async (newSupplement) => {
    try {
      const updatedSupplements = [...supplements, newSupplement];
      setSupplements(updatedSupplements);
      await AsyncStorage.setItem(
        `supplements_${userId}`,
        JSON.stringify(updatedSupplements)
      );
    } catch (e) {
      console.error("Failed to add supplement", e);
    }
  };

  const clearSupplements = async (uid) => {
    try {
      setSupplements([]);
      await AsyncStorage.setItem(`supplements_${uid}`, JSON.stringify([]));
    } catch (e) {
      console.error("Failed to clear supplements", e);
    }
  };

  return (
    <SupplementContext.Provider
      value={{
        supplements,
        setSupplements,
        addSupplement,
        loadSupplements,
        clearSupplements,
        userId,
        setUserId,
      }}
    >
      {children}
    </SupplementContext.Provider>
  );
};

export const useSupplements = () => {
  const context = useContext(SupplementContext);
  if (!context) {
    throw new Error("useSupplements must be used within a SupplementProvider");
  }
  return context;
};
