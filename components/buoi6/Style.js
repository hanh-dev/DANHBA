import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#F5F1DC",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  wrappCard: {
    width: "30%",
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#73C8D2",
  },
  wrappImage: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 5,
    padding: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    fontSize: 14,
    color: "#0046FF",
    textAlign: "center",
    fontWeight: "bold",
  },
  price: {
    color: "#bd5f0dff",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#73C8D2",
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 2,
    alignItems: "center",
  },
});
