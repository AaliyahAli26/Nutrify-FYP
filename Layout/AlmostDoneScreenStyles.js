import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#B8F0ED",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 50,
    marginBottom: 80,
  },
  backText: {
    fontSize: 16,
    color: "teal",
    fontWeight: "500",
  },
  suppIconImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 20,
    color: "black",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "600",
  },
  inputWrapper: {
    marginBottom: 25,
    width: "100%",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    marginBottom: 8,
    alignItems: "center",
  },
  inputBoxContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  numberInput: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    width: "100%",
    padding: 10,
  },
  saveButton: {
    backgroundColor: "teal",
    padding: 15,
    borderRadius: 26,
    alignItems: "center",
    marginTop: 80,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default styles;
