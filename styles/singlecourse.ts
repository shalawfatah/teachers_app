import { StyleSheet } from "react-native";
import { videoStyles } from "./course_videos";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerTop: {
    paddingTop: 50,
    paddingHorizontal: 8,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  headerContent: {
    padding: 20,
    paddingBottom: 30,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  chipText: {
    color: "#fff",
    fontSize: 12,
  },
  courseTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
  },
  courseDescription: {
    color: "rgba(255,255,255,0.95)",
    lineHeight: 22,
    marginBottom: 20,
  },
  courseStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 16,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    color: "#fff",
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  ...videoStyles,
});
