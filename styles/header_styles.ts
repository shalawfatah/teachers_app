import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  textSection: {
    marginBottom: 20,
  },
  actionRow: {
    alignItems: "center",
    gap: 12,
  },
  searchGlass: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  searchInner: {
    backgroundColor: "transparent",
    height: 50,
  },
  searchInput: {
    color: "#ffffff",
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 16,
    paddingHorizontal: 12,
  },
});
