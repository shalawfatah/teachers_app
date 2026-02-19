import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    maxHeight: "80%",
  },
  modalTitle: { marginBottom: 15, fontWeight: "bold" },
  sectionTitle: { marginBottom: 10, marginTop: 10, fontWeight: "600" },
  scrollBody: { marginBottom: 20 },
  text: { color: "#666", lineHeight: 20 },
  actionButton: { marginTop: 20 },
  closeButton: { marginTop: 10 },
  centerAlign: { alignItems: "center", paddingVertical: 20 },
});
