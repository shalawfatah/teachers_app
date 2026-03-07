import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 768;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  surface: {
    borderRadius: 16,
    padding: 24,
    backgroundColor: "#fff",
    width: isTablet ? 450 : "100%",
    maxWidth: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 12,
    color: "#d32f2f",
    fontSize: isTablet ? 24 : 20, 
  },
  message: {
    textAlign: "center",
    color: "#555",
    lineHeight: 22,
    marginBottom: 24,
    fontSize: isTablet ? 18 : 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    height: isTablet ? 55 : 45,
  },
  cancelButton: {
    flex: 1,
  },
  deleteButton: {
    flex: 1,
  },
});
