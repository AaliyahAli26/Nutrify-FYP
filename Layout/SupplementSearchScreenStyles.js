import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6F9F7",
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
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 26,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "teal",
    borderRadius: 26,
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

export default styles;
