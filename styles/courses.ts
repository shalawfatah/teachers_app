import { StyleSheet } from "react-native";

export const courses_styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    direction: "rtl",
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: "bold",
    fontFamily: "NRT-Bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#666",
  },
  filterButtonContainer: {
    position: "relative",
    marginLeft: 12,
  },
  filterButton: {
    margin: 0,
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#6200ee",
  },
  searchContainer: {
    direction: "rtl",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    direction: "rtl",
    elevation: 0,
    paddingHorizontal: 12,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  // ... rest of your existing styles
});
