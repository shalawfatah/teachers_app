import { Dimensions, StyleSheet } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const teacherHeroStyles = StyleSheet.create({
  heroSection: {
    height: SCREEN_HEIGHT - 50,
    width: "100%",
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
    borderColor: "#fff",
    shadowColor: "#000",
  },
  teacherName: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "NRT-Bold",
    textAlign: "center",
  },
  teacherBio: {
    color: "rgba(255,255,255,0.95)",
    fontFamily: "NRT-Bold",
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
});
