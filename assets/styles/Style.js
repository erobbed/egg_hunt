import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(35, 47, 61)"
  },
  header: {
    fontSize: 45,
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
    position: "absolute",
    top: 15,
    width: 175,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 0,
    textAlign: "left",
    color: "black",
    fontFamily: "AmericanTypewriter"
  },
  subcontent: {
    top: 150,
    position: "absolute",
    marginLeft: 20,
    fontFamily: "AmericanTypewriter-Bold"
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
