import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { padding: 20, backgroundColor: "white", gap: 10 },
  title: { fontWeight: "bold", color: "#1a1a1a" },
  searchBox: { padding: 16, paddingBottom: 8 },
  searchbar: { backgroundColor: "#fff", elevation: 2, borderRadius: 10},
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: "#6200ee",
  },
});
