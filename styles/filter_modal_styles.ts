import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    direction: "rtl",
    margin: 20,
    borderRadius: 12,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    maxHeight: 450,
  },
  accordion: {
    backgroundColor: "#fff",
  },
  accordionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  accordionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  selectedCount: {
    color: "#6200ee",
    fontWeight: "500",
  },
  listItem: {
    paddingLeft: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
