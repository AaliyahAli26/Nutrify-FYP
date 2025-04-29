import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6F9F7",
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "teal",
  },
  searchInput: {
    height: 40,
    borderColor: "teal",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "white",
  },
  refillRemindersButton: {
    backgroundColor: "teal",
    padding: 12,
    borderRadius: 26,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  refillRemindersText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 26,
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  logoutText: {
    color: "teal",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalScroll: {
    maxHeight: "70%",
  },
  refillReminderItem: {
    marginBottom: 15,
  },
  refillName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  alertText: {
    color: "red",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "teal",
    padding: 10,
    borderRadius: 26,
    marginTop: 20,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
