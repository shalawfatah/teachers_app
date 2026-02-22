import { StyleSheet } from "react-native";

export const videoCardStyles = StyleSheet.create({
  videoCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    position: "relative",
  },
  thumbnail: {
    height: 180,
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardContent: {
    paddingTop: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  videoTitle: {
    fontWeight: "bold",
    flex: 1,
    marginBottom: 4,
  },
  videoDescription: {
    color: "#666",
    marginBottom: 12,
  },
  videoFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chip: {
    alignSelf: "flex-start",
  },
  uploadDate: {
    color: "#999",
  },
});
