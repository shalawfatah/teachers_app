import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  header: { marginBottom: 16, fontWeight: "bold" },
  input: { marginBottom: 12 },
  dropdownContainer: { marginBottom: 20 },
  dropdownBtn: { width: "100%" },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
});
