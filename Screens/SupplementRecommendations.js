import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../Layout/SupplementReccommendationsScreenStyles";

const supplementData = {
  "Vitamin D": {
    supplements: [
      { name: "Vitamin D3", dosage: "2000-5000 IU daily", icon: "sunny" },
      { name: "Vitamin K2", dosage: "100-200 mcg with D3", icon: "leaf" },
    ],
    foods: [
      { name: "Fatty fish (salmon)", icon: "fish" },
      { name: "Egg yolks", icon: "egg" },
      { name: "Fortified dairy", icon: "nutrition" },
      { name: "15-30 mins sunlight", icon: "sunny" },
    ],
    notes: "Retest levels after 3 months of supplementation",
  },
  Iron: {
    supplements: [
      { name: "Iron Bisglycinate", dosage: "25-50mg daily", icon: "pulse" },
      { name: "Vitamin C", dosage: "500mg with iron", icon: "nutrition" },
    ],
    foods: [
      { name: "Red meat", icon: "restaurant" },
      { name: "Spinach (cooked)", icon: "leaf" },
      { name: "Lentils + lemon", icon: "nutrition" },
      { name: "Pumpkin seeds", icon: "seedling" },
    ],
    notes: "Take between meals for better absorption",
  },
  "Vitamin B12": {
    supplements: [
      { name: "Methylcobalamin", dosage: "1000mcg sublingual", icon: "medkit" },
      { name: "B-Complex", dosage: "As directed", icon: "flask" },
    ],
    foods: [
      { name: "Beef liver", icon: "restaurant" },
      { name: "Clams", icon: "fish" },
      { name: "Nutritional yeast", icon: "leaf" },
      { name: "Fortified cereals", icon: "nutrition" },
    ],
    notes: "Sublingual form absorbs better",
  },
};

export default function SupplementRecommendations({ deficiencies }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Personalized Recommendations</Text>

      {deficiencies.map((deficiency) => {
        const data = supplementData[deficiency];
        if (!data) return null;

        return (
          <View key={deficiency} style={styles.deficiencyContainer}>
            <Text style={styles.deficiencyTitle}>{deficiency}</Text>

            <Text style={styles.sectionTitle}>Recommended Supplements:</Text>
            {data.supplements.map((item, index) => (
              <View key={`supp-${index}`} style={styles.itemContainer}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color="#4a8cff"
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDosage}>{item.dosage}</Text>
                </View>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Food Sources:</Text>
            {data.foods.map((food, index) => (
              <View key={`food-${index}`} style={styles.itemContainer}>
                <Ionicons
                  name={food.icon}
                  size={20}
                  color="#4CAF50"
                  style={styles.icon}
                />
                <Text style={styles.itemName}>{food.name}</Text>
              </View>
            ))}

            {data.notes && (
              <View style={styles.notesContainer}>
                <Ionicons name="information-circle" size={20} color="#FF9800" />
                <Text style={styles.notesText}>{data.notes}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
