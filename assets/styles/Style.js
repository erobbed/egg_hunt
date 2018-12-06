import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(35, 47, 61)"
  },
  header: {
    fontSize: 40,
    marginTop: 100,
    marginBottom: 0,
    fontFamily: "amazon",
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff"
  },
  subheader: {
    fontSize: 15,
    fontFamily: "amazon",
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 5
  },
  content: {
    textAlign: "left",
    // marginTop: 0,
    marginRight: "auto",
    // marginBottom: 0,
    marginLeft: "auto",
    color: "black"
  },
  clue: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    width: 300,
    height: 200,
    top: -60,
    backgroundColor: "lightgray",
    borderRadius: 45,
    borderColor: "rgb(255,142,5)",
    borderWidth: 3,
    justifyContent: "center"
  },
  case: {
    position: "absolute",
    bottom: 20,
    right: 20
  },
  button: {
    backgroundColor: "rgb(255,142,5)",
    width: 30,
    height: 30,
    borderRadius: 50
  }
});
