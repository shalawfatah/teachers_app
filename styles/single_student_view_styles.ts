import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  hero: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  name: { fontWeight: "bold", marginTop: 15, marginBottom: 8 },
  card: { margin: 16, borderRadius: 12, backgroundColor: "white" },
  detailRow: {
    flexDirection: "row",
    direction: "rtl",
    alignItems: "center",
    paddingVertical: 12,
  },
  detailText: { marginLeft: 16 },
  divider: { marginVertical: 4 },
  actions: { padding: 16, gap: 12 },
  button: { borderRadius: 8 },
});
