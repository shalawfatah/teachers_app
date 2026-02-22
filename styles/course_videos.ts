import { StyleSheet } from "react-native";

export const videoStyles = StyleSheet.create({
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
