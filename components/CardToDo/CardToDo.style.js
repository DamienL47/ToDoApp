import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "row",
    height: 115,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadow0ffset: {
      width: 0,
      height: 2,
    },
    shadow0pacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    fontSize: 25,
  },
  check: {
    width: 30,
    resizeMode: "contain",
  },
});
