import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  statsScroll: {
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    minWidth: 120,
  },
  statNumber: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  statLabel: {
    color: "#666",
    marginTop: 4,
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
  videoCard: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    position: "relative",
  },
  thumbnail: {
    height: 180,
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardContent: {
    paddingTop: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  videoTitle: {
    fontWeight: "bold",
    flex: 1,
    marginBottom: 4,
  },
  videoDescription: {
    color: "#666",
    marginBottom: 12,
  },
  videoFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chip: {
    alignSelf: "flex-start",
  },
  uploadDate: {
    color: "#999",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab2: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
  },
});
