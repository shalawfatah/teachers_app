import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 100, backgroundColor: "transparent"},
  listItem: {
    backgroundColor: "transparent",
    borderColor: style_vars.MUTED_WHITE_BORDER,
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 1,
  },
  row: { justifyContent: "center", alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
