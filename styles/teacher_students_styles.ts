import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    direction: "rtl",
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
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    elevation: 0,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  studentCard: {
    marginBottom: 12,
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
    backgroundColor: "#6200ee",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  studentEmail: {
    color: "#666",
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
