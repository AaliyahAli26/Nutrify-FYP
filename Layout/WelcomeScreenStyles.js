import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title1: {
    fontSize: 35,
    fontWeight: "semi-bold",
    marginTop: 90,
    color: "#16504C",
  },
  title2: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#16504C",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "normal",
    marginBottom: 450,
    color: "#16504C",
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 1,
    color: "white",
    fontStyle: "italic",
  },
  subtitle3: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 8,
    color: "white",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 26,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 4,
  },
  signupButton: {
    marginBottom: 50,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 95,
    borderRadius: 26,
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "teal",
    fontSize: 22,
  },
});

export default styles;
