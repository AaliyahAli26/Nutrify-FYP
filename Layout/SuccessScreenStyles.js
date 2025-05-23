import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8F0ED",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  SuppIconImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 70,
    marginTop: 140,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  heading1: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 90,
  },
  addButton1: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignSelf: "center", // Center the button
    minWidth: "80%", // Minimum width
  },
  addButton: {
    backgroundColor: "teal",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignSelf: "center", // Center the button
    minWidth: "80%", // Minimum width
    marginTop: 15, // Space between buttons
  },
  addButton1Text: {
    color: "teal",
    fontSize: 22,
    textAlign: "center", // Center text
  },
  addButtonText: {
    color: "white",
    fontSize: 22,
    textAlign: "center", // Center text
  },
});

export default styles;
