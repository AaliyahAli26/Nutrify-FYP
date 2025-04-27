import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../Layout/DosageScreenStyles";

const DosageScreen = ({ route, navigation }) => {
  const { supplementName } = route.params || {};
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "Daily",
    "Every Other Day",
    "Weekly",
    "Twice Daily",
    "As Needed",
  ];
  const handleNext = () => {
    navigation.navigate("TimeScreen", { supplementName });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/calender.png")}
        style={styles.SuppIconImage}
      />
      <Text style={styles.heading}>Dosage</Text>
      <Text style={styles.heading1}>How often do you take it?</Text>

      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedButton,
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === option && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleNext}
          disabled={!selectedOption}
        >
          <Text style={styles.addButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DosageScreen;
