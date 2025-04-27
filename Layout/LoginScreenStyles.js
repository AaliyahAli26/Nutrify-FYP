import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  container: {
    width: "90%", // Ensures inputs stay aligned within a fixed space
    maxWidth: 400,
    padding: 20,
    backgroundColor: "rgba(210, 241, 234, 0.8)",
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center", // Keeps everything aligned properly
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#16504C",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#16504C",
    marginBottom: 60,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row", // Ensures consistency with password input
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 12,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: "white",
    paddingVertical: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
    marginTop: 15,
    height: 45,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeIcon: {
    paddingHorizontal: 4,
  },
  loginButton: {
    backgroundColor: "teal",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 26,
    marginVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  Forgot: {
    marginBottom: 60,
    color: "#000",
    paddingLeft: 220,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  footerText: {
    color: "#000",
  },
  signupLink: {
    color: "teal",
    fontWeight: "bold",
    marginLeft: 2,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default styles;
