import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8F0ED",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  goBackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 1, // ensures button is on top of other content
  },
  goBackText: {
    fontSize: 18,
    color: "teal",
  },
  SuppIconImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 70,
    marginTop: 140,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  heading1: {
    fontSize: 20,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 50,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
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
