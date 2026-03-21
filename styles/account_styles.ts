import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingTop: isTablet ? 80 : 60,
    paddingBottom: 24,
    width: "100%",
  },
  scrollContent: {
    alignItems: isTablet ? "center" : "stretch",
    flexGrow: 1,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  statsCard: {
    margin: 16,
    marginBottom: 8,
    width: isTablet ? 600 : "auto",
    alignSelf: "center",
    borderRadius: 8,
    elevation: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: isTablet ? 20 : 0,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e0e0e0",
  },
  statNumber: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  statLabel: {
    color: "#666",
    marginTop: 4,
  },
  settingsContainer: {
    marginTop: 8,
    fontFamily: "NRT-Bold",
  },
  signOutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  signOutButton: {
    borderColor: "#FFF",
    fontFamily: "NRT-Bold",
  },
});
