import { StyleSheet } from "react-native";
import { heroStyles } from "./hero_styles";

export const styles = StyleSheet.create({
  // Base Container & Loading
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // User Header (Top Left)
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userText: {
    gap: 2,
  },
  welcomeText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
  },
  userName: {
    color: "#fff",
    fontWeight: "600",
  },
  // Body Content
  content: {
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1a1a1a",
  },
  sectionSubtitle: {
    color: "#666",
    marginBottom: 16,
  },
  // Placeholders & FAB
  carouselPlaceholder: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  // Spread imported hero styles
  ...heroStyles,
});
