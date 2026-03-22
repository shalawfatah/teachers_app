import {style_vars} from "@/utils/style_vars";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  courseCard: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    marginHorizontal: 12,
  },
  blurOverlay: {
    marginTop: "auto",
  },
  contentOverlay: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  courseTitle: {
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 18,
    width: "100%",
    marginBottom: 6,
    color: "#ffffff",
    textAlign: "right",
  },
  courseDescription: {
    fontFamily: "Goran",
    fontSize: 14,
    width: "100%",
    color: "#f5f5f5",
    lineHeight: 20,
    textAlign: "right",
  },
  chip: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    height: 32,
    justifyContent: "center",
    borderRadius: 8,
  },
  chipText: {
    fontFamily: "Goran",
    fontSize: 12,
    color: "#000",
    fontWeight: "700",
  },

  fallbackContainer: {
    minHeight: 160,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
    justifyContent: "center",
  },
  cardContent: {
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: "flex-end",
  },
  chipDark: {
    backgroundColor: "#ffffff",
    height: 30,
    justifyContent: "center",
  },
  chipTextDark: {
    fontFamily: "Goran",
    fontSize: 12,
    color: "#000",
    fontWeight: "600",
  },
  courseTitleDark: {
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 20,
    width: "100%",
    marginBottom: 8,
    color: "#ffffff",
    textAlign: "right",
  },
  courseDescriptionDark: {
    fontFamily: "Goran",
    fontSize: 14,
    width: "100%",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "right",
    lineHeight: 22,
  },
});
