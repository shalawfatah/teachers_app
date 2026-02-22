import { Dimensions, StyleSheet } from "react-native";
import { overlayStyles } from "./video_overlay_styles";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // Layout Containers
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

  // Spread imported overlay and content styles
  ...overlayStyles,
});
