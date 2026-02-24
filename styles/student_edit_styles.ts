import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", marginTop: 24 },
  content: { padding: 16 },
  formCard: {
    direction: "rtl",
    padding: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
  sectionTitle: { marginBottom: 20, color: "#6200ee", fontWeight: "bold" },
  input: { marginBottom: 16, backgroundColor: "white" },
  label: { marginTop: 8, marginBottom: 8, color: "#666" },
  segmented: { marginBottom: 8 },
  actionContainer: { gap: 8 },
  saveButton: { borderRadius: 8 },
});
