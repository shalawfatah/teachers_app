import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 100 },
  card: {
    marginBottom: 20,
    backgroundColor: "transparent",
    borderRadius: 12,
    borderColor:style_vars.MUTED_WHITE_BORDER,
    borderWidth: 1,
  },
  cover: { height: 160, borderBottomRightRadius: 0, borderBottomLeftRadius: 0},
  description: { color: "#FFF", marginBottom: 12, fontSize: 16},
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
