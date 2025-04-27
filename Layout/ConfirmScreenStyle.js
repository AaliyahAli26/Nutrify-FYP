import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#B8F0ED",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 150,
    marginTop: 50,
  },
  backText: {
    color: "teal",
    fontSize: 16,
  },
  suppIconImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subheading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  optionButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 26,
    marginBottom: 15,
    alignItems: "center",
    borderColor: "teal",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  optionButtonText: {
    color: "teal",
    fontWeight: "bold",
    fontSize: "18",
  },
  refillInfoContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: "teal",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginTop: "auto",
    marginBottom: 90,
  },
  saveButtonText: {
    color: "white",
    fontSize: 24,
  },
});

export default styles;
