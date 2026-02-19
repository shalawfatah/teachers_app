import { Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - 75,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    backgroundColor: "#000",
  },

  // WebView styles (for video)
  webview: {
    flex: 1,
  },
  centeredOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  // Gradient overlay
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
  },

  // Content area
  content: {
    position: "absolute",
    bottom: 80,
    left: 24,
    right: 24,
    alignItems: "flex-end",
    gap: 12,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "NRT-Bold",
    textAlign: "right",
  },
  descriptionWrapper: {
    position: "relative",
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: "85%",
  },
  descriptionText: {
    color: "#000",
    fontFamily: "Goran",
    textAlign: "right",
    fontSize: 16,
    lineHeight: 24,
    zIndex: 1,
  },

  // CTA button
  ctaContainer: {
    marginTop: 4,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Goran",
  },

  // Dot indicators
  indicators: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    zIndex: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  indicatorActive: {
    width: 24,
    backgroundColor: "#fff",
  },
});
