import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "transparent",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#FFF",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: "center",
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
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    elevation: 0,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    color: "#FFF",
    borderColor: "rgba(255,255,255,0.4)",
  },
  listContent: {
    padding: 16,
    backgroundColor: "transparent",
  },
  studentCard: {
    marginBottom: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    color: "#FFF",
    borderColor: "rgba(255,255,255,0.4)",
    elevation: 2,
  },
  studentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  studentInfo: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  avatar: {
    backgroundColor: "orange",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  studentEmail: {
    color: "#FFF",
    marginBottom: 8,
  },
  studentMeta: {
    flexDirection: "row",
    gap: 8,
  },
  courseChip: {
    alignSelf: "flex-start",
  },
  statusChip: {
    alignSelf: "flex-start",
  },
});
