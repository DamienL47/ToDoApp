import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 115,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  title: {
    fontSize: 25,
  },
  check: {
    width: 25,
    height: 26,
  },
});
