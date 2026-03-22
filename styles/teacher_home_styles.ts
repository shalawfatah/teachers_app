import { StyleSheet } from "react-native";
import { heroStyles } from "./hero_styles";

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
  header: {
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
  },
  userName: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  ...heroStyles,
});
