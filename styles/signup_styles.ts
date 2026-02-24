import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 16 },
  card: { padding: 16 },
  title: { textAlign: "center", marginBottom: 24, fontFamily: "NRT-Bold"},
  input: { marginBottom: 12 },
  dropdownContainer: { marginBottom: 12 },
  dropdownButton: { borderRadius: 4, borderColor: "#79747E" },
  dropdownButtonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    height: 50,
  },
  gradeLabel: { marginTop: 8, marginBottom: 8, textAlign: "right" },
  segmented: { marginBottom: 8 },
  button: { marginTop: 16, marginBottom: 8 },
});
