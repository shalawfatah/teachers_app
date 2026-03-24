import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  hero: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "transparent",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  name: { fontWeight: "bold", color: "#FFF", marginTop: 15, marginBottom: 8 },
  card: { margin: 16, borderRadius: 12, backgroundColor: "transparent" },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  detailText: { marginLeft: 16 },
  divider: { marginVertical: 4 },
  actions: { padding: 16, gap: 12 },
  btn_container: {
    backgroundColor: "transparent",
    paddingHorizontal: 32,
    width: "100%",
  },
  button: {
    backgroundColor: style_vars.PRIMARY_WHITE_BUTTON,
    marginVertical: 12,
    borderRadius: 15,
    fontFamily: style_vars.PRIMARY_FONT,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  secondary_button: {
    borderRadius: 8,
    color: "#000",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: style_vars.MUTED_WHITE_BORDER,
    width: "100%",
    marginTop: 12,
  },
});
