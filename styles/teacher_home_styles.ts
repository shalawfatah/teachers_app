import { Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  heroSection: {
    height: SCREEN_HEIGHT,
    width: "100%",
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 40,
  },
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
  teacherInfo: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  teacherAvatar: {
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  teacherName: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  teacherBio: {
    color: "rgba(255,255,255,0.95)",
    textAlign: "center",
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginHorizontal: 20,
    borderRadius: 16,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  statNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  statLabel: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    fontSize: 14,
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
});
