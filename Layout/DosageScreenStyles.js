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
    marginBottom: 30,
    marginTop: 100,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  heading1: {
    fontSize: 20,
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: "teal",
  },
  optionText: {
    fontSize: 20,
    color: "#333",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 90,
  },
  addButton: {
    backgroundColor: "teal",
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  addButtonText: {
    color: "white",
    fontSize: 26,
  },
});

export default styles;
