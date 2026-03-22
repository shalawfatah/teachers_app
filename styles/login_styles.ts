import { style_vars } from "@/utils/style_vars";
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
    padding: 24,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: style_vars.MUTED_WHITE_BORDER,
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
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Very light "glass" input
    fontSize: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // White button pops on glass
  },
  errorText: {
    marginBottom: 8,
    color: "#ff8a8a",
    fontWeight: "bold",
  },
});
