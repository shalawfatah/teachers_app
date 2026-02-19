import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 40 },
  loader: { flex: 1, justifyContent: "center" },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  videoItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
  },
  headerImage: { width: "100%", height: 220 },
  content: { padding: 20 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "bold", flex: 1 },
  metaRow: { flexDirection: "row", gap: 8, marginVertical: 12 },
  chip: { backgroundColor: "#f0f0f0" },
  sectionLabel: { marginTop: 16, fontWeight: "bold", color: "#666" },
  teacherName: { marginTop: 4, color: "#1c1c1c" },
  description: { marginTop: 8, lineHeight: 22, color: "#444" },
  divider: { marginVertical: 20 },
  lessonsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
  },
  emptyLessons: {
    marginTop: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 0,
  },
  centerIcon: { alignSelf: "center" },
  centerText: { textAlign: "center", color: "#888", marginBottom: 12 },
  addBtn: { width: 160, alignSelf: "center" },
  backBtn: { marginTop: 20 },
});
