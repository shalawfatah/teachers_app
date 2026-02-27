import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#6200ee",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  role: {
    color: "#666",
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
    direction: "rtl",
    marginTop: 8,
  },
  signOutContainer: {
    padding: 16,
  },
  signOutButton: {
    borderColor: "#d32f2f",
  },
  deleteAccountContainer: {
    padding: 16,
  },
  deleteAccountButton: {
    borderColor: "red",
    backgroundColor: "red",
    color: "white",
  },
});
