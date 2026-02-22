import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  centered: { flex: 1, justifyContent: "center" },
  header: { marginBottom: 20, fontWeight: "bold" },
  input: { marginBottom: 16 },
  label: { marginTop: 8, marginBottom: 8, fontWeight: "600" },
  dropdown: { marginBottom: 16, borderRadius: 4 },
  segmented: { marginBottom: 12 },
  buttonRow: { flexDirection: "row", gap: 12, marginTop: 24 },
  flexButton: { flex: 1 },
});
