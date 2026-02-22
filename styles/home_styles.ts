import { StyleSheet } from "react-native";
import { teacherHeroStyles } from "./teacher_hero_styles";

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
  // User Header (Greeting)
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
  // Content Sections
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
  carouselPlaceholder: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
  },

  // Spread imported hero styles
  ...teacherHeroStyles,
});
