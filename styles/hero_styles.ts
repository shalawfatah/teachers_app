import { Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const heroStyles = StyleSheet.create({
  heroSection: {
    width: "100%",
    height: SCREEN_HEIGHT,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 40,
  },
  teacherInfo: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  teacherAvatar: {
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  teacherName: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "NRT-Bold",
  },
  teacherBio: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 24,
    marginBottom: 100,
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
    fontSize: 16,
    fontFamily: "NRT-Bold",
  },
});
