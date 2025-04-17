import React, { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SupplementContext = createContext();

export const SupplementProvider = ({ children }) => {
  const [supplements, setSupplements] = useState([]);

  const loadSupplements = async () => {
    try {
      const saved = await AsyncStorage.getItem("supplements");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSupplements(parsed);
      }
    } catch (e) {
      console.error("Failed to load supplements", e);
    }
  };

  const addSupplement = async (newSupplement) => {
    const updated = [...supplements, newSupplement];
    setSupplements(updated);
    await AsyncStorage.setItem("supplements", JSON.stringify(updated));
  };

  return (
    <SupplementContext.Provider
      value={{ supplements, setSupplements, addSupplement, loadSupplements }}
    >
      {children}
    </SupplementContext.Provider>
  );
};

export const useSupplements = () => useContext(SupplementContext);
