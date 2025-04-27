import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  deficiencyContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  deficiencyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#555",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemDosage: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FFF8E1",
    borderRadius: 5,
  },
  notesText: {
    marginLeft: 5,
    color: "#FF9800",
    fontStyle: "italic",
  },
});

export default styles;
