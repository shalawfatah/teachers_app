import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  videoContainer: {
    width: width,
    height: width * (9 / 16),
    backgroundColor: "#000",
  },
  nativePlayer: { flex: 1 },
  infoSection: { padding: 20 },
  videoTitle: { fontWeight: "800" },
  courseTitle: { color: "#666" },
});
