import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  header: {
    padding: 20,
    backgroundColor: "transparent",
    gap: 10,
  },
  title: { fontWeight: "bold", color: "#fff" },
  searchBox: { padding: 16, paddingBottom: 8, marginHorizontal: 12 },
  searchbar: {
    backgroundColor: "transparent",
    elevation: 2,
    margin: 12,
    borderRadius: 48,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
    backgroundColor: "orange",
  },
});
