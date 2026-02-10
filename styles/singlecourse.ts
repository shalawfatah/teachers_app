import { StyleSheet } from "react-native";

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
  videosSection: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: "#666",
  },
  divider: {
    marginBottom: 16,
  },
  videosList: {
    gap: 12,
  },
  videoCard: {
    elevation: 1,
  },
  videoContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  videoNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontWeight: "bold",
    color: "#666",
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  videoInfo: {
    flex: 1,
    gap: 4,
  },
  videoTitle: {
    fontWeight: "600",
  },
  videoDescription: {
    color: "#666",
  },
  videoMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  durationChip: {
    height: 24,
  },
});
