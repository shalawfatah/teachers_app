import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", marginTop: 24 },
  content: { padding: 16 },
  formCard: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  sectionTitle: { marginBottom: 20, color: "#FFF", fontWeight: "bold" },
  input: { marginBottom: 16, backgroundColor: "transparent" },
  label: { marginTop: 8, marginBottom: 8, color: "#FFF" },
  segmented: { marginBottom: 8 },
  actionContainer: { gap: 8 },
  saveButton: { borderRadius: 8 },
});
