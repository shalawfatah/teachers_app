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
  },
  button: { borderRadius: 8, backgroundColor: "#FF8C00", marginVertical: 12 },
  secondary_button: {
    borderRadius: 8,
    color: "#000",
    backgroundColor: "#FFF",
    marginTop: 12,
  },
});
