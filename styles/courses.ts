import { StyleSheet } from "react-native";

export const courses_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#666",
  },
  searchContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  courseCard: {
    marginBottom: 16,
    elevation: 2,
  },
  thumbnail: {
    height: 180,
  },
  cardContent: {
    paddingTop: 12,
  },
  courseTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseDescription: {
    color: "#666",
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    alignSelf: "flex-start",
  },
});
