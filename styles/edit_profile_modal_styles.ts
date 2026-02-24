import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    maxHeight: "85%",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    direction: "rtl",
    padding: 24,
  },
  title: {
    paddingHorizontal: 20,
    fontWeight: "bold",
    backgroundColor: "white",
  },
  scrollView: {
    maxHeight: 500,
  },
  input: {
    direction: "rtl",
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    marginTop: 8,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 16,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  coverContainer: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    width: "100%",
    height: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  button: {
    marginLeft: 10,
  },
});
