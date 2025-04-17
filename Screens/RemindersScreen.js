import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import axios from "axios";

const SUPPLEMENT_DB = {
  "vitamin d": {
    title: "Vitamin D",
    benefits: "Supports bone health, immune function, and mood regulation.",
    foods: [
      "Fatty fish (salmon, mackerel)",
      "Fortified dairy products",
      "Egg yolks",
      "Mushrooms",
    ],
    advice:
      "Take with meals containing fat for better absorption. Recommended daily: 600-800 IU.",
    website: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
  },
  magnesium: {
    title: "Magnesium",
    benefits:
      "Important for muscle and nerve function, blood sugar control, and bone health.",
    foods: ["Spinach", "Pumpkin seeds", "Almonds", "Black beans", "Avocados"],
    advice:
      "Glycinate is good for sleep, citrate for constipation. Recommended: 310-420mg daily.",
    website: "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/",
  },
  "vitamin c": {
    title: "Vitamin C",
    benefits:
      "Supports immune system, collagen production, and antioxidant protection.",
    foods: [
      "Citrus fruits",
      "Bell peppers",
      "Strawberries",
      "Broccoli",
      "Kiwi",
    ],
    advice: "Water-soluble – excess is excreted. Recommended: 75–90mg daily.",
    website: "https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/",
  },
  "omega-3": {
    title: "Omega-3",
    benefits:
      "Supports heart health, brain function, and reduces inflammation.",
    foods: [
      "Fatty fish (salmon, sardines)",
      "Flaxseeds",
      "Chia seeds",
      "Walnuts",
    ],
    advice:
      "Look for supplements with EPA and DHA. Recommended: 250–2000mg daily.",
    website:
      "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/",
  },
};

export default function SupplementGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSupplements = async () => {
    if (!searchTerm.trim()) return;
    const query = searchTerm.toLowerCase();
    setLoading(true);

    try {
      let wikiResults = [];
      let nihResults = [];

      // Wikipedia Search
      try {
        const wikiResponse = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}+supplement&origin=*`
        );
        wikiResults =
          wikiResponse.data?.query?.search?.slice(0, 2).map((item) => ({
            source: "Wikipedia",
            title: item.title,
            description: item.snippet.replace(/<[^>]+>/g, "") + "...",
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(
              item.title
            )}`,
          })) || [];
      } catch (err) {
        console.log("Wikipedia error:", err);
      }

      // NIH DSLD Search
      try {
        const nihResponse = await axios.get(
          `https://dsld.od.nih.gov/dsld/api/search?name=${query}`
        );
        nihResults =
          nihResponse.data?.products?.slice(0, 2).map((item) => ({
            source: "NIH DSLD",
            title: item.name,
            description: `Ingredients: ${
              item.activeIngredients?.join(", ") || "N/A"
            }`,
            url: `https://dsld.od.nih.gov/dsld/servlet/DisplayProduct?id=${item.id}`,
          })) || [];
      } catch (err) {
        console.log("NIH error:", err);
      }

      const combined = [...wikiResults, ...nihResults];

      const fallback = SUPPLEMENT_DB[query];
      if (combined.length === 0 && fallback) {
        combined.push({
          source: "Internal Database",
          ...fallback,
          description: fallback.benefits,
          foods: fallback.foods,
          advice: fallback.advice,
          url: fallback.website,
        });
      } else if (fallback) {
        combined.push({
          source: "Internal Database",
          ...fallback,
          description: fallback.benefits,
          foods: fallback.foods,
          advice: fallback.advice,
          url: fallback.website,
        });
      }

      setResults(combined);
    } catch (err) {
      console.log("Search error:", err);
      setResults([
        {
          source: "Error",
          title: "Oops!",
          description: "Something went wrong. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search supplements</Text>

      <TextInput
        style={styles.input}
        placeholder="Search supplement (e.g. Vitamin D)"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={searchSupplements}
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={searchSupplements}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.searchButtonText}>Search</Text>
        )}
      </TouchableOpacity>

      <ScrollView style={styles.resultsContainer}>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : results.length > 0 ? (
          results.map((item, index) => (
            <View key={index} style={styles.resultCard}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultSource}>Source: {item.source}</Text>
              <Text style={styles.resultText}>{item.description}</Text>

              {item.advice && (
                <Text style={styles.adviceText}>Advice: {item.advice}</Text>
              )}
              {item.foods && (
                <Text style={styles.sourcesText}>
                  Natural Sources: {item.foods.join(", ")}
                </Text>
              )}

              {item.url && (
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.linkText}>More Info →</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>
            Try searching for: Vitamin D, Magnesium, Omega-3, Probiotics
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f9fc",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "teal",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "teal",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  loader: {
    marginVertical: 20,
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  resultSource: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 10,
    fontStyle: "italic",
  },
  resultText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#34495e",
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 14,
    color: "#27ae60",
    marginBottom: 10,
    fontStyle: "italic",
  },
  sourcesText: {
    fontSize: 14,
    color: "purple",
    marginBottom: 10,
  },
  linkText: {
    color: "teal",
    fontWeight: "500",
  },
  placeholderText: {
    textAlign: "center",
    color: "#7f8c8d",
    marginTop: 20,
  },
});
