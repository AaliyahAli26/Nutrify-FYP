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
  },
  refillRemindersButton: {
    backgroundColor: "teal",
    padding: 12,
    borderRadius: 26,
    alignItems: "center",
    marginBottom: 20,
  },
  refillRemindersText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: "teal",
    padding: 12,
    borderRadius: 26,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Modal Styles
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
