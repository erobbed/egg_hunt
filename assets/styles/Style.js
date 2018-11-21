import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(35, 47, 61)",
    padding: 8
  },
  header: {
    fontSize: 40,
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
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    color: "rgb(139, 144, 148)"
  }
});
