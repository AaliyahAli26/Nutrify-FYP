import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F9F7",
  },
  headerContainer: {
    backgroundColor: "#E6F9F7",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#7354BF",
  },
  guestText: {
    fontSize: 20,
    color: "#7354BF",
    fontWeight: "600",
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
    width: 40,
    textAlign: "center",
  },
  datesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginVertical: 5,
  },
  todayDateContainer: {
    backgroundColor: "rgba(0, 128, 128, 0.1)",
  },
  selectedDateContainer: {
    backgroundColor: "teal",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  todayDateText: {
    color: "teal",
  },
  selectedDateText: {
    color: "white",
  },
  takenIndicator: {
    position: "absolute",
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "teal",
  },
  skippedIndicator: {
    position: "absolute",
    bottom: 2,
    left: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F44336",
  },
  historyContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "teal",
  },
  historyItem: {
    marginBottom: 10,
  },
  historySupplement: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  historyEntry: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 2,
  },
  historyTaken: {
    color: "teal",
  },
  historySkipped: {
    color: "#F44336",
  },
  noActivityText: {
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
  },
  todayContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  todayText: {
    fontSize: 18,
    color: "teal",
    fontWeight: "600",
  },
  clearAllButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    backgroundColor: "#E6E6FA",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  clearAllText: {
    color: "#7354BF",
    fontWeight: "600",
    fontSize: 12,
  },
  supplementsContainer: {
    paddingHorizontal: 15,
  },
  supplementCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  supplementInfo: {
    flex: 1,
  },
  supplementName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  supplementDosage: {
    fontSize: 14,
    color: "teal",
    marginBottom: 5,
  },
  takenTime: {
    fontSize: 12,
    color: "teal",
    fontStyle: "italic",
  },
  skippedText: {
    fontSize: 12,
    color: "#F44336",
    fontStyle: "italic",
  },
  actionButtons: {
    flexDirection: "row",
  },
  skipButton: {
    backgroundColor: "#A1E3D8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  takeButton: {
    backgroundColor: "#A1E3D8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: "teal",
    fontWeight: "bold",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "teal",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 15,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
