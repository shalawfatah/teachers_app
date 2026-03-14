import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

// Scaling helper: Increases size by ~25-40% on tablets
const scale = (size: number) => (isTablet ? size * 1.3 : size);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    alignItems: isTablet ? "center" : "stretch",
    // This ensures the background color fills the screen even if content is short
    flexGrow: 1,
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: isTablet ? 80 : 60,
    paddingBottom: scale(24),
    width: "100%",
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "#6200ee",
    // Make avatar larger on iPad
    transform: [{ scale: isTablet ? 1.4 : 1 }],
  },
  name: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    fontSize: scale(22),
  },
  role: {
    color: "#666",
    marginTop: 10,
    fontSize: scale(12),
  },
  statsCard: {
    margin: 16,
    marginBottom: 8,
    width: isTablet ? 600 : "92%",
    alignSelf: "center",
    borderRadius: isTablet ? 12 : 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: isTablet ? 20 : 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: isTablet ? 60 : 40,
    backgroundColor: "#e0e0e0",
  },
  statNumber: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  statLabel: {
    color: "#666",
    marginTop: 4,
    fontSize: scale(10),
  },
  settingsContainer: {
    backgroundColor: "#fff",
    marginTop: 8,
    width: isTablet ? 600 : "100%",
    alignSelf: "center",
    borderRadius: isTablet ? 12 : 0,
  },
  signOutContainer: {
    width: isTablet ? 600 : "100%",
    alignSelf: "center",
  },
  signOutButton: {
    borderColor: "#d32f2f",
    marginTop: 16,
    marginBottom: 8,
  },
  deleteAccountContainer: {
    width: isTablet ? 600 : "100%",
    alignSelf: "center",
  },
  deleteAccountButton: {
    borderColor: "red",
    backgroundColor: "red",
    color: "white",
  },
});
