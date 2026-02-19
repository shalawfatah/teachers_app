import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 100 },
  card: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  cover: { height: 160 },
  description: { color: "#666", marginBottom: 12 },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  chip: { backgroundColor: "#f0f0f0", height: 32 },
  chipText: { fontSize: 12 },
  emptyContainer: { padding: 40, alignItems: "center" },
});
