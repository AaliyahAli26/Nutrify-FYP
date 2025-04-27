import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F9F7",
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
    marginTop: 10,
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
    backgroundColor: "#E6E6FA",
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
    backgroundColor: "#E6E6FA",
  },
  selectedSymptom: {
    backgroundColor: "#F3FFFB",
    borderWidth: 1,
    borderColor: "#87D4BD",
  },
  submitButton: {
    backgroundColor: "teal",
    padding: 15,
    borderRadius: 26,
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

export default styles;
