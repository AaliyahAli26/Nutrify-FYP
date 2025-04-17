import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const MoodTrackerScreen = () => {
  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😨", label: "Anxious" },
    { emoji: "😴", label: "Tired" },
    { emoji: "🤕", label: "Dizzy" },
    { emoji: "😐", label: "Neutral" },
  ];

  const symptoms = [
    "Anxious",
    "Stressed",
    "Fatigued",
    "Dizzy",
    "Headache",
    "Happy",
    "Energetic",
    "Focused",
    "Calm",
    "Bloated",
    "PMS",
    "Pregnancy",
    "Irritable",
    "Insomnia",
    "Brain Fog",
  ];

  const supplements = [
    // For Anxiety/Stress
    {
      id: "1",
      name: "Magnesium Glycinate",
      description:
        "Highly bioavailable form of magnesium that promotes relaxation",
      benefits: [
        "Reduces anxiety",
        "Improves sleep quality",
        "Muscle relaxation",
      ],
      recommendedFor: ["Anxious", "Stressed", "Insomnia", "Irritable"],
      dosage: "200-400mg before bed",
      type: "Mineral",
      foodSources: [
        "Spinach",
        "Pumpkin seeds",
        "Almonds",
        "Black beans",
        "Avocados",
        "Dark chocolate",
      ],
    },
    {
      id: "2",
      name: "L-Theanine",
      description: "Amino acid found in green tea that promotes calm focus",
      benefits: ["Reduces stress", "Improves focus", "Non-drowsy relaxation"],
      recommendedFor: ["Anxious", "Stressed", "Focused"],
      dosage: "100-400mg daily",
      type: "Amino Acid",
      foodSources: [
        "Green tea",
        "Black tea",
        "Matcha",
        "Certain mushrooms (Bay bolete)",
      ],
    },
    {
      id: "3",
      name: "Ashwagandha",
      description: "Adaptogenic herb that helps the body manage stress",
      benefits: ["Lowers cortisol", "Reduces anxiety", "Improves energy"],
      recommendedFor: ["Anxious", "Stressed", "Fatigued"],
      dosage: "300-600mg daily",
      type: "Herb",
      foodSources: [
        "Ashwagandha root (typically consumed as powder or supplement)",
        "Some herbal teas contain ashwagandha",
      ],
    },

    // For Depression/Mood
    {
      id: "4",
      name: "Vitamin D3 + K2",
      description: "Essential vitamins for mood regulation and bone health",
      benefits: ["Improves mood", "Supports immunity", "Bone health"],
      recommendedFor: ["Sad", "Depressed", "Fatigued"],
      dosage: "1000-5000 IU D3 with 100-200mcg K2",
      type: "Vitamin",
      foodSources: [
        "Fatty fish (salmon, mackerel)",
        "Egg yolks",
        "Fortified dairy products",
        "Mushrooms exposed to sunlight",
        "K2: Natto, fermented foods, cheese",
      ],
    },
    {
      id: "5",
      name: "Omega-3 (EPA/DHA)",
      description: "Essential fatty acids critical for brain health",
      benefits: [
        "Reduces inflammation",
        "Supports brain function",
        "Mood regulation",
      ],
      recommendedFor: ["Sad", "Depressed", "Brain Fog"],
      dosage: "1000-2000mg EPA/DHA daily",
      type: "Fatty Acid",
      foodSources: [
        "Fatty fish (salmon, sardines)",
        "Flaxseeds",
        "Chia seeds",
        "Walnuts",
        "Algal oil (vegan source)",
      ],
    },
    {
      id: "6",
      name: "Saffron Extract",
      description: "Potent herb with mood-boosting properties",
      benefits: [
        "Natural antidepressant",
        "Reduces PMS symptoms",
        "May improve libido",
      ],
      recommendedFor: ["Sad", "Depressed", "PMS"],
      dosage: "30mg daily",
      type: "Herb",
      foodSources: [
        "Saffron spice (expensive)",
        "Some herbal teas",
        "Traditional Persian dishes",
      ],
    },

    // For Energy/Fatigue
    {
      id: "7",
      name: "Rhodiola Rosea",
      description: "Adaptogen that helps combat fatigue and improve endurance",
      benefits: [
        "Reduces fatigue",
        "Improves mental performance",
        "Stress adaptation",
      ],
      recommendedFor: ["Fatigued", "Tired", "Brain Fog"],
      dosage: "200-400mg daily",
      type: "Herb",
      foodSources: [
        "Rhodiola root (typically consumed as supplement or tea)",
        "Some adaptogenic herbal blends",
      ],
    },
    {
      id: "8",
      name: "Coenzyme Q10",
      description: "Antioxidant that supports cellular energy production",
      benefits: [
        "Boosts energy",
        "Supports heart health",
        "Antioxidant protection",
      ],
      recommendedFor: ["Fatigued", "Tired"],
      dosage: "100-300mg daily",
      type: "Antioxidant",
      foodSources: [
        "Organ meats (heart, liver)",
        "Fatty fish",
        "Soybeans",
        "Nuts and seeds",
        "Vegetable oils",
      ],
    },
    {
      id: "9",
      name: "B-Complex",
      description: "Essential vitamins for energy metabolism",
      benefits: [
        "Energy production",
        "Nervous system support",
        "Stress management",
      ],
      recommendedFor: ["Fatigued", "Tired", "Stressed"],
      dosage: "1 capsule daily with food",
      type: "Vitamin",
      foodSources: [
        "Whole grains",
        "Eggs",
        "Meat",
        "Leafy greens",
        "Legumes",
        "Nutritional yeast",
      ],
    },

    // For Focus/Cognition
    {
      id: "10",
      name: "Bacopa Monnieri",
      description: "Traditional herb for memory and cognitive function",
      benefits: ["Improves memory", "Reduces anxiety", "Neuroprotective"],
      recommendedFor: ["Focused", "Brain Fog"],
      dosage: "300mg daily",
      type: "Herb",
      foodSources: [
        "Bacopa herb (typically consumed as supplement or tea)",
        "Some Ayurvedic preparations",
      ],
    },
    {
      id: "11",
      name: "Lion's Mane Mushroom",
      description: "Fungal supplement that supports nerve growth factor",
      benefits: [
        "Cognitive enhancement",
        "Nerve regeneration",
        "May reduce anxiety",
      ],
      recommendedFor: ["Focused", "Brain Fog"],
      dosage: "500-1000mg daily",
      type: "Mushroom",
      foodSources: [
        "Lion's Mane mushroom (can be cooked like other mushrooms)",
        "Powdered supplements",
        "Some mushroom coffees",
      ],
    },

    // For PMS/Pregnancy
    {
      id: "12",
      name: "Evening Primrose Oil",
      description: "Source of GLA, important for hormonal balance",
      benefits: [
        "Reduces PMS symptoms",
        "Supports skin health",
        "May reduce breast pain",
      ],
      recommendedFor: ["PMS", "Bloated"],
      dosage: "1000-2000mg daily",
      type: "Oil",
      foodSources: [
        "Evening primrose seeds (rarely eaten directly)",
        "Typically taken as oil supplement",
      ],
    },
    {
      id: "13",
      name: "Prenatal Multi",
      description: "Comprehensive vitamin/mineral formula for pregnancy",
      benefits: ["Fetal development", "Maternal health", "Energy support"],
      recommendedFor: ["Pregnancy", "Fatigued"],
      dosage: "As directed",
      type: "Multivitamin",
      foodSources: [
        "Leafy greens",
        "Lean meats",
        "Eggs",
        "Dairy",
        "Whole grains",
        "Legumes",
      ],
    },

    // For Headache/Dizziness
    {
      id: "14",
      name: "Feverfew",
      description: "Traditional herb for migraine prevention",
      benefits: ["May reduce migraine frequency", "Anti-inflammatory"],
      recommendedFor: ["Headache", "Dizzy"],
      dosage: "100-300mg daily",
      type: "Herb",
      foodSources: [
        "Feverfew leaves (can be used in teas)",
        "Some herbal supplements",
      ],
    },
    {
      id: "15",
      name: "Ginger Root",
      description: "Natural remedy for nausea and dizziness",
      benefits: [
        "Reduces nausea",
        "Anti-inflammatory",
        "May help with dizziness",
      ],
      recommendedFor: ["Dizzy", "Bloated"],
      dosage: "500-1000mg as needed",
      type: "Herb",
      foodSources: [
        "Fresh ginger root",
        "Ginger tea",
        "Powdered ginger",
        "In many Asian dishes",
      ],
    },

    // For General Well-being
    {
      id: "16",
      name: "Probiotics",
      description: "Beneficial bacteria for gut health",
      benefits: ["Digestive support", "Immune function", "May improve mood"],
      recommendedFor: ["Bloated", "Happy", "Calm"],
      dosage: "10-50 billion CFUs daily",
      type: "Probiotic",
      foodSources: [
        "Yogurt",
        "Kefir",
        "Sauerkraut",
        "Kimchi",
        "Kombucha",
        "Miso",
        "Tempeh",
      ],
    },
    {
      id: "17",
      name: "Zinc",
      description: "Essential mineral for immune function and mood",
      benefits: [
        "Immune support",
        "Hormone regulation",
        "May reduce irritability",
      ],
      recommendedFor: ["Irritable", "PMS"],
      dosage: "15-30mg daily",
      type: "Mineral",
      foodSources: [
        "Oysters",
        "Beef",
        "Pumpkin seeds",
        "Lentils",
        "Chickpeas",
        "Cashews",
      ],
    },
  ];

  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [description, setDescription] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);

  const getRecommendations = (symptoms) => {
    if (!symptoms || symptoms.length === 0) return [];

    return supplements.filter((supplement) =>
      supplement.recommendedFor.some((rec) =>
        symptoms.some((symptom) => rec.toLowerCase() === symptom.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setRecommendations(getRecommendations(selectedSymptoms));
  }, [selectedSymptoms]);

  const handleSubmit = () => {
    const newEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      description,
      symptoms: selectedSymptoms,
      timestamp: new Date().toISOString(),
    };

    setHistory([newEntry, ...history]);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  moodButton: {
    width: "30%",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  selectedMood: {
    backgroundColor: "#F3FFFB",
    borderWidth: 1,
    borderColor: "#87D4BD",
  },
  emoji: {
    fontSize: 30,
  },
  moodLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    marginBottom: 15,
    fontSize: 16,
  },
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  symptomButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedSymptom: {
    backgroundColor: "#F3FFFB",
    borderWidth: 1,
    borderColor: "#87D4BD",
  },
  submitButton: {
    backgroundColor: "teal",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "teal",
  },
  supplementName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  supplementType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontStyle: "italic",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  benefits: {
    fontSize: 14,
    marginBottom: 5,
  },
  dosage: {
    fontSize: 14,
    marginBottom: 5,
  },
  recommendedFor: {
    fontSize: 14,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
    color: "#333",
  },
  foodSourcesContainer: {
    marginTop: 8,
  },
  foodSourcesList: {
    marginTop: 4,
  },
  foodItem: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  noRecommendations: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    padding: 10,
  },
  historyEntry: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  historyMood: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  historySymptoms: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  historyDescription: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  noHistory: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    padding: 10,
  },
});

export default MoodTrackerScreen;
