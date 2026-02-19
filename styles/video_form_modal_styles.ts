import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    gap: 12,
  },
  header: { marginBottom: 8, fontWeight: "bold" },
  dropdown: { marginTop: 8 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
});
