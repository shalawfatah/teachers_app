import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", direction: "rtl"},
  heroImage: { height: 320 },
  gradient: { flex: 1, justifyContent: "space-between", padding: 16 },
  backButton: {
    marginTop: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
  },
  heroContent: { marginBottom: 20 },
  badgeRow: { flexDirection: "row", marginBottom: 8 },
  categoryChip: { backgroundColor: "#6200ee" },
  chipText: { color: "white", fontWeight: "bold", fontSize: 10 },
  title: { color: "white", fontWeight: "bold", letterSpacing: -0.5, fontFamily: "NRT-Bold" },
  metaRow: { flexDirection: "row", alignItems: "center", marginLeft: -8 },
  metaText: { color: "white", fontSize: 14, fontWeight: "500", direction: "rtl"},
  contentBody: {
    direction: "rtl",
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    backgroundColor: "#fff",
  },
  descriptionText: {
    color: "#666",
    lineHeight: 22,
    marginBottom: 32,
  },
  curriculumHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonCount: {
    color: "#6200ee",
    fontWeight: "600",
  },
  sectionTitle: { fontWeight: "800", color: "#1a1a1a", fontFamily: "NRT-Bold", },
  lessonCard: {
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    elevation: 0,
    borderRadius: 16,
  },
  lessonTitle: { fontWeight: "600" },
  lessonNumber: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginLeft: 8,
  },
  lessonNumberText: { color: "#1a1a1a", fontWeight: "bold" },
  footer: {
    padding: 20,
    paddingBottom: 34, // Padding for safe area/home indicator
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: "#6200ee",
    fontFamily: "NRT-Bold",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "none",
    fontFamily: "NRT-Bold",
  },
});
