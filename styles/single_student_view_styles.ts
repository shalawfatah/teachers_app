import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  hero: {
    alignItems: "center",
    padding: 30,
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
  button: { borderRadius: 8, backgroundColor: "orange" },
});
