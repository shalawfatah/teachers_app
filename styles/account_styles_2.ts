import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";

export const accountStyles = StyleSheet.create({
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  profileGlassCard: {
    padding: 25,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 20,
    overflow: "hidden",
  },
  avatarContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  avatarShadow: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  userName: {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    marginTop: 15,
    fontWeight: "bold",
  },
  userRole: {
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 2,
    fontSize: 12,
    marginTop: 4,
    fontFamily: style_vars.PRIMARY_FONT,
  },
  settingsWrapper: {
    marginTop: 10,
  },
  listGlassCard: {
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    paddingVertical: 10,
  },
  signOutContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  signOutLabel: {
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 16,
    fontWeight: "bold",
  },
});
