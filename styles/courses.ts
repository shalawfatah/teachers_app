import { StyleSheet } from "react-native";

export const courses_styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
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
    color: "#FFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#FFF",
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
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    elevation: 0,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    borderColor: "#FFF",
    borderWidth: 1,
  },
  listContent: {
    padding: 16,
  },
});
