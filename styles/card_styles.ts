import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  courseCard: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 16,
    direction: "rtl",
  },
  backgroundImage: {
    width: "100%",
    height: 240,
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 0,
  },
  absoluteBadge: {
    alignSelf: "flex-start",
    right: 8,
  },
  blurOverlay: {
    borderRadius: 12,
    marginTop: "auto",
  },
  contentOverlay: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  courseTitle: {
    fontFamily: "NRT-Bold",
    fontSize: 18,
    width: "100%",
    marginBottom: 6,
    color: "#ffffff",
  },
  courseDescription: {
    fontFamily: "Goran",
    width: "100%",
    color: "#f5f5f5",
    lineHeight: 20,
  },
  chip: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    height: 30,
    justifyContent: "center",
  },
  chipText: {
    fontFamily: "Goran",
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
  // Fallback styles
  fallbackContainer: {
    minHeight: 140,
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  cardContent: {
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "flex-end",
  },
  chipDark: {
    backgroundColor: "#6200ee",
    height: 30,
    justifyContent: "center",
  },
  chipTextDark: {
    fontFamily: "Goran",
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  courseTitleDark: {
    fontFamily: "NRT-Bold",
    width: "100%",
    marginBottom: 4,
    color: "#000",
    textAlign: "right",
  },
  courseDescriptionDark: {
    fontFamily: "Goran",
    width: "100%",
    color: "#666",
    textAlign: "right",
  },
});
