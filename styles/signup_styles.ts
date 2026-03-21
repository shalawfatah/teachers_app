import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    padding: 24, // Matches the login glass padding
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.12)", // Semi-transparent glass
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    // Shadows for depth
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "NRT-Bold",
    fontSize: 28,
    color: "#ffffff",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)", // Clear/Glass background
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdownButton: {
    borderRadius: 12, // Increased radius to match the card/inputs
    borderColor: "rgba(255, 255, 255, 0.4)", // White border instead of gray
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  dropdownButtonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    height: 50,
  },
  gradeLabel: {
    marginTop: 8,
    marginBottom: 8,
    color: "#ffffff",
    fontFamily: "NRT-Bold",
  },
  segmented: {
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "#ffffff", // Solid white background
    borderRadius: 12,
    paddingVertical: 4,
  },
});
