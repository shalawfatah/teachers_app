import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    height: 320,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Glassy back button
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  heroContent: {
    marginBottom: 20,
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Glass chip
    borderRadius: 8,
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "NRT-Bold",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: -0.5,
    fontFamily: "NRT-Bold",
    fontSize: 28,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -8,
  },
  metaText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Goran",
  },
  contentBody: {
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: "100%",
  },
  descriptionText: {
    color: "rgba(255, 255, 255, 0.8)", // Light text for dark background
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: "Goran",
    fontSize: 15,
  },
  curriculumHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "800",
    color: "#FFFFFF",
    fontFamily: "NRT-Bold",
    fontSize: 20,
  },
  lessonCount: {
    color: "#FF8C00", // Highlight color from your gradient
    fontWeight: "600",
    fontFamily: "NRT-Bold",
  },
  lessonCard: {
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glassy lesson cards
    elevation: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  lessonTitle: {
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "NRT-Bold",
  },
  lessonNumber: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginLeft: 8,
  },
  lessonNumberText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    backgroundColor: "transparent",
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "none",
    fontFamily: "NRT-Bold",
    color: "#000",
  },
});
