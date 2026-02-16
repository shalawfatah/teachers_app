import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    direction: "rtl",
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontFamily: "NRT-Bold",
    fontWeight: "bold",
    marginBottom: 4,
  },
  role: {
    color: "#666",
    textTransform: "capitalize",
  },
  statsCard: {
    margin: 16,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
    backgroundColor: "#fff",
    marginTop: 8,
    fontFamily: "NRT-Bold",
  },
  signOutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  signOutButton: {
    borderColor: "#d32f2f",
    fontFamily: "NRT-Bold",
  },
});
