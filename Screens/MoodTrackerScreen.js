import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import styles from "../Layout/MoodTrackerStyle";
import {
  moods,
  symptoms,
  supplements,
} from "../Entity/Components/MoodTrackerData"; // Import constants

const MoodTrackerScreen = () => {
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [description, setDescription] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch current user's ID from Firebase Auth
    const Firebase_auth = getAuth();
    const user = Firebase_auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const getRecommendations = (symptoms) => {
    if (!symptoms || symptoms.length === 0) return [];

    return supplements.filter((supplement) =>
      supplement.recommendedFor.some((rec) =>
        symptoms.some((symptom) => rec.toLowerCase() === symptom.toLowerCase())
      )
    );
  };
  const loadHistory = async () => {
    if (userId) {
      try {
        const storedHistory = await AsyncStorage.getItem(
          `moodHistory_${userId}`
        );
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Failed to load mood history:", error);
      }
    }
  };

  // Function to save the mood history to AsyncStorage for the current user
  const saveHistory = async (newEntry) => {
    if (userId) {
      try {
        const updatedHistory = [newEntry, ...history];
        await AsyncStorage.setItem(
          `moodHistory_${userId}`,
          JSON.stringify(updatedHistory)
        );
        setHistory(updatedHistory);
      } catch (error) {
        console.error("Failed to save mood history:", error);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      loadHistory();
    }
  }, [userId]);

  useEffect(() => {
    setRecommendations(getRecommendations(selectedSymptoms));
  }, [selectedSymptoms]);

  const handleSubmit = async () => {
    const newEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      description,
      symptoms: selectedSymptoms,
      timestamp: new Date().toISOString(),
    };

    try {
      const updatedHistory = [newEntry, ...history];
      await AsyncStorage.setItem(
        `moodHistory_${userId}`,
        JSON.stringify(updatedHistory)
      );
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Failed to save mood history:", error);
    }

    setDescription("");
    setSelectedSymptoms([]);
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>How are you feeling today?</Text>

        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.label}
              style={[
                styles.moodButton,
                selectedMood.label === mood.label && styles.selectedMood,
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe how you're feeling..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.subtitle}>Select your symptoms:</Text>
        <View style={styles.symptomsContainer}>
          {symptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom}
              style={[
                styles.symptomButton,
                selectedSymptoms.includes(symptom) && styles.selectedSymptom,
              ]}
              onPress={() => toggleSymptom(symptom)}
            >
              <Text>{symptom}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Mood Entry</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Recommended Supplements</Text>
        {recommendations.length > 0 ? (
          recommendations.map((supplement) => (
            <View key={supplement.id} style={styles.card}>
              <Text style={styles.supplementName}>{supplement.name}</Text>
              <Text style={styles.supplementType}>{supplement.type}</Text>
              <Text style={styles.description}>{supplement.description}</Text>
              <Text style={styles.benefits}>
                <Text style={styles.bold}>Benefits: </Text>
                {supplement.benefits.join(", ")}
              </Text>
              <Text style={styles.dosage}>
                <Text style={styles.bold}>Dosage: </Text>
                {supplement.dosage}
              </Text>
              <Text style={styles.recommendedFor}>
                <Text style={styles.bold}>Good for: </Text>
                {supplement.recommendedFor.join(", ")}
              </Text>
              <View style={styles.foodSourcesContainer}>
                <Text style={styles.bold}>Food Sources: </Text>
                <View style={styles.foodSourcesList}>
                  {supplement.foodSources.map((food, index) => (
                    <Text key={index} style={styles.foodItem}>
                      {food}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noRecommendations}>
            {selectedSymptoms.length === 0
              ? "Select symptoms to see recommendations"
              : "No specific recommendations for these symptoms"}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Your Mood History</Text>
        {history.length === 0 ? (
          <Text style={styles.noHistory}>No entries yet</Text>
        ) : (
          history.map((entry) => (
            <View key={entry.id} style={styles.historyEntry}>
              <Text style={styles.historyMood}>
                {entry.mood.emoji} {entry.mood.label} -{" "}
                {new Date(entry.timestamp).toLocaleDateString()}
              </Text>
              {entry.symptoms.length > 0 && (
                <Text style={styles.historySymptoms}>
                  Symptoms: {entry.symptoms.join(", ")}
                </Text>
              )}
              {entry.description && (
                <Text style={styles.historyDescription}>
                  Notes: {entry.description}
                </Text>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default MoodTrackerScreen;
